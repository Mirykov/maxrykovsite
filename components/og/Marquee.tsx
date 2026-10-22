import Burst from "./Burst";
import { amp } from "./Amp";

// Continuously scrolling row of names. The list renders twice so the loop is
// seamless; the copy is hidden from screen readers. It pauses on hover, and
// reduced-motion users get a static list. (Max removed the pause button on
// 2026-10-21.)
export default function Marquee({ items, label }: { items: string[]; label: string }) {
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
    <div className="og-marquee" role="region" aria-label={label}>
      <div className="og-marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
