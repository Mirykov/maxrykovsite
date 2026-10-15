"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import Burst from "./Burst";
import { amp } from "./Amp";

// Continuously scrolling row of names. The list renders twice so the loop is
// seamless; the copy is hidden from screen readers. Moving content needs a
// pause control (WCAG 2.2.2), and reduced-motion users get a static list.
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const [paused, setPaused] = useState(false);

  const row = (copy: boolean) => (
    <ul aria-hidden={copy || undefined} className={`flex shrink-0 items-center ${copy ? "og-marquee-dup" : ""}`}>
      {items.map((name) => (
        <li key={name} className="flex items-center">
          <span className="font-display whitespace-nowrap px-6 text-xl font-bold sm:text-2xl">{amp(name)}</span>
          <Burst className="h-5 w-5 shrink-0" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative">
      <div className={`og-marquee ${paused ? "is-paused" : ""}`} role="region" aria-label={label}>
        <div className="og-marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="og-marquee-toggle mx-auto mt-6 flex items-center gap-2 rounded-full border-2 border-og-ink/15 px-4 py-1.5 text-sm font-semibold text-og-ink/70 hover:border-og-ink/40"
      >
        {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        {paused ? "Play" : "Pause"} scrolling
      </button>
    </div>
  );
}
