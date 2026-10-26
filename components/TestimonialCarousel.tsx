"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Quote = { id: string; quote: string; name: string; role: string };

// One testimonial at a time with previous/next buttons and dots. It never
// advances on its own, so people can read at their own pace. Every quote is
// rendered in the same grid cell, so the box is always as tall as the longest
// one and nothing jumps when switching.
export default function TestimonialCarousel({ quotes }: { quotes: Quote[] }) {
  const [active, setActive] = useState(0);
  const step = (delta: number) => setActive((a) => (a + delta + quotes.length) % quotes.length);

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border-2 border-og-ink/20 bg-white text-og-ink transition-colors hover:border-og-ink";

  return (
    <div className="rounded-3xl border-2 border-og-ink/10 bg-white p-7 sm:p-9" aria-roledescription="carousel">
      <div className="grid" aria-live="polite">
        {quotes.map((t, i) => (
          <figure
            key={t.id}
            aria-hidden={i !== active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${quotes.length}`}
            className={`col-start-1 row-start-1 flex flex-col transition-opacity duration-300 motion-reduce:transition-none ${
              i === active ? "opacity-100" : "pointer-events-none invisible opacity-0"
            }`}
          >
            <span aria-hidden="true" className="font-display mb-2 text-6xl leading-none text-og-yellow">
              &ldquo;
            </span>
            <blockquote className="text-lg leading-relaxed text-og-ink/85 sm:text-xl">
              <p>{t.quote}</p>
            </blockquote>
            <figcaption className="mt-6 border-t border-og-ink/10 pt-4">
              <span className="block font-bold">{t.name}</span>
              {t.role && <span className="text-og-ink/70">{t.role}</span>}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {quotes.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1} from ${t.name}`}
              aria-current={i === active || undefined}
              className={`h-3 rounded-full transition-all ${i === active ? "w-8 bg-og-red" : "w-3 bg-og-ink/20 hover:bg-og-ink/40"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} aria-label="Previous testimonial" className={arrow}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next testimonial" className={arrow}>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
