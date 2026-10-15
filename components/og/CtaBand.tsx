import { amp } from "./Amp";
import Button, { type ButtonVariant } from "./Button";
import Burst from "./Burst";

export type Cta = { href: string; label: string; variant?: string };

export function Ctas({ buttons, className = "" }: { buttons: Cta[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {buttons.map((b) => (
        <Button key={b.href} href={b.href} variant={(b.variant ?? "primary") as ButtonVariant}>
          {b.label}
        </Button>
      ))}
    </div>
  );
}

// Centered closing call-to-action used at the bottom of most pages
export default function CtaBand({
  id,
  title,
  body,
  buttons,
}: {
  id: string;
  title: string;
  body?: string;
  buttons: Cta[];
}) {
  return (
    <section aria-labelledby={id} className="border-t border-og-ink/10 bg-white/50">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28">
        <Burst className="mx-auto mb-4 h-12 w-12" />
        <h2 id={id} className="font-display mb-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
          {amp(title)}
        </h2>
        {body && <p className="mx-auto mb-10 max-w-2xl text-lg text-og-ink/80 sm:text-xl">{body}</p>}
        <Ctas buttons={buttons} className="justify-center" />
      </div>
    </section>
  );
}
