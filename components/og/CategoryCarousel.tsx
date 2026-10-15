"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Burst from "./Burst";
import { amp } from "./Amp";

type Category = { name: string; organizations: string[] };

// Swipeable row of category cards with previous/next buttons. Nothing moves
// on its own, so no pause control is needed.
export default function CategoryCarousel({ categories, label }: { categories: Category[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateEnds() {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(updateEnds);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  }

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border-2 border-og-ink/20 bg-white text-og-ink transition-colors hover:border-og-ink disabled:cursor-default disabled:opacity-35 disabled:hover:border-og-ink/20";

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scrollByCard(-1)} disabled={atStart} aria-label="Previous categories" className={arrow}>
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => scrollByCard(1)} disabled={atEnd} aria-label="Next categories" className={arrow}>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={track}
        onScroll={updateEnds}
        tabIndex={0}
        aria-label={label}
        className="og-no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6"
      >
        {categories.map((cat) => (
          <li
            key={cat.name}
            className="w-[82%] shrink-0 snap-start rounded-3xl border-2 border-og-teal bg-white p-7 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <h3 className="eyebrow mb-5 flex items-center gap-2 text-og-teal-dark">
              <Burst className="h-5 w-5" />
              {cat.name}
            </h3>
            <ul className="space-y-3">
              {cat.organizations.map((org) => (
                <li key={org} className="font-display text-xl font-bold leading-snug">
                  {amp(org)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
