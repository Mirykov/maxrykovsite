"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

export type Slide = { src: string; alt: string; position?: string };

const INTERVAL_MS = 4000;

// Crossfading photo loop for the Home hero (reads like a GIF, but sharp and
// light). Auto-advancing content needs a pause control (WCAG 2.2.2); visitors
// who prefer reduced motion just see the first photo.
export default function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", update);
    update();
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, reducedMotion, slides.length]);

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={i !== active || undefined}
          fill
          priority={i === 0}
          sizes="(min-width: 768px) 45vw, 100vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: slide.position }}
        />
      ))}
      {slides.length > 1 && !reducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play photo slideshow" : "Pause photo slideshow"}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-og-cream/90 text-og-ink shadow hover:bg-white"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
