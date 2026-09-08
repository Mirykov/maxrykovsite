"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import PillButton from "@/components/PillButton";

const helpOptions = [
  "Strategy",
  "Fundraising / Campaigns",
  "Communications / Storytelling",
  "Community Engagement",
  "Event / Experience",
  "Not sure yet",
];

const timelineOptions = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

export default function StartPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/start-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <section className="bg-paper">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="font-display font-bold uppercase text-3xl sm:text-4xl text-anchor mb-6">
            Thanks for reaching out.
          </h1>
          <p className="text-lg text-ink/80 mb-2">
            We&rsquo;ve got your note and will take a look. If it sounds like
            we&rsquo;re a good fit, we&rsquo;ll be in touch to set up a
            conversation.
          </p>
          <p className="text-lg text-ink/80 mb-10">
            In the meantime, here&rsquo;s some of our work.
          </p>
          <PillButton href="/work" variant="outline-dark">
            See Our Work
          </PillButton>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <h1 className="font-display font-bold uppercase text-3xl sm:text-5xl text-anchor mb-6">
          Got something important to make happen?
        </h1>
        <div className="space-y-2 text-lg text-ink/80 mb-10">
          <p>Maybe you need a campaign.</p>
          <p>Maybe your annual event has become stale.</p>
          <p>Maybe you&rsquo;re trying to engage an audience that doesn&rsquo;t seem to care.</p>
          <p>Maybe you&rsquo;ve got a big idea but no idea how to pull it off.</p>
          <p className="font-display uppercase text-anchor pt-2">Tell us what&rsquo;s going on.</p>
          <p>
            You don&rsquo;t need a perfect brief. Start with the problem, the
            goal, and whatever you&rsquo;ve figured out so far.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-display uppercase text-sm tracking-wide mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-anchor"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-display uppercase text-sm tracking-wide mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-anchor"
              />
            </div>
          </div>

          <div>
            <label htmlFor="organization" className="block font-display uppercase text-sm tracking-wide mb-2">
              Organization
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-anchor"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-display uppercase text-sm tracking-wide mb-2">
              Tell us a little about what you&rsquo;re working on.
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-anchor"
            />
          </div>

          <div>
            <label htmlFor="helpType" className="block font-display uppercase text-sm tracking-wide mb-2">
              What kind of help are you looking for?
            </label>
            <select
              id="helpType"
              name="helpType"
              required
              className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-anchor"
            >
              <option value="" disabled>
                Select one
              </option>
              {helpOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="block font-display uppercase text-sm tracking-wide mb-2">
              When are you hoping to get started?
            </label>
            <select
              id="timeline"
              name="timeline"
              required
              className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-anchor"
            >
              <option value="" disabled>
                Select one
              </option>
              {timelineOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-700">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-anchor px-8 py-4 font-display font-semibold uppercase tracking-wide text-white hover:bg-anchor-dark transition-colors disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Start a Project"}
          </button>
        </form>

        <p className="mt-8 text-sm text-ink/50">
          Prefer email? Write to us directly at{" "}
          <Link href="mailto:hello@maxrykov.com" className="underline">
            hello@maxrykov.com
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
