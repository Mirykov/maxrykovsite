import { NextRequest, NextResponse } from "next/server";
import { callTypes, HONEYPOT_FIELD, inquirySchema, type Inquiry } from "@/lib/inquiry";

// Basic per-IP rate limit. It lives in memory, so it resets whenever Vercel
// starts a fresh instance. That's enough to stop casual form spam.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const labels: Record<string, string> = {
  name: "Name",
  email: "Email",
  callType: "Call type",
  organization: "Organization",
  interest: "Interested in",
  timeframe: "Date or timeframe",
  location: "Location",
  audienceSize: "Approximate audience size",
  budget: "Budget",
  goals: "What they'd like people to experience or accomplish",
  eventDate: "Event date",
  eventType: "Event type",
  hostNotes: "What the host should know",
};

function subjectFor(data: Inquiry) {
  switch (data.formType) {
    case "book-call": {
      const t = callTypes[data.callType];
      return `Call request: ${data.name} (${t.label}, ${t.minutes} min)`;
    }
    case "plan":
      return `New event inquiry: ${data.name} (${data.interest})`;
    case "emcee":
      return `Emcee inquiry: ${data.name}${data.eventDate ? ` for ${data.eventDate}` : ""}`;
  }
}

function htmlFor(data: Inquiry) {
  const intro =
    data.formType === "book-call"
      ? "<p>This person filled out step 1 on /book and was shown your calendar. If they picked a time, Calendly will send its own confirmation. If not, this is your lead to follow up on.</p>"
      : "";
  const rows = Object.entries(data)
    .filter(([key, value]) => key !== "formType" && value)
    .map(([key, value]) => {
      const shown = key === "callType" ? callTypes[value as keyof typeof callTypes].label : String(value);
      return `<p><strong>${labels[key] ?? key}:</strong><br />${escapeHtml(shown).replace(/\n/g, "<br />")}</p>`;
    })
    .join("");
  return `<h2>${escapeHtml(subjectFor(data))}</h2>${intro}${rows}`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend it worked so the bot moves on
  if (body[HONEYPOT_FIELD]) {
    return NextResponse.json({ success: true });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL ?? "OddGood Events <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or INQUIRY_TO_EMAIL environment variable.");
    return NextResponse.json({ error: "Our form isn't connected yet." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: subjectFor(data),
      html: htmlFor(data),
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.json().catch(() => ({})));
    return NextResponse.json({ error: "We couldn't send that. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
