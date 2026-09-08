import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, organization, description, helpType, timeline } = await req.json();

  if (!name || !email || !description) {
    return NextResponse.json({ error: "Name, email, and project description are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_EMAIL environment variable.");
    return NextResponse.json(
      { error: "Form submissions aren't wired up yet. Please email hello@maxrykov.com directly." },
      { status: 500 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Start a Project <noreply@maxrykov.com>",
      to,
      reply_to: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <h2>New Start a Project submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || "—"}</p>
        <p><strong>What kind of help:</strong> ${helpType || "—"}</p>
        <p><strong>Timeline:</strong> ${timeline || "—"}</p>
        <p><strong>Description:</strong></p>
        <p>${String(description).replace(/\n/g, "<br />")}</p>
      `,
    }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    console.error("Resend error:", json);
    return NextResponse.json({ error: json.message || "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
