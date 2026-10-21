import { Fragment } from "react";
import { amp } from "./Amp";
import Burst from "./Burst";

// The yellow marker stroke behind a word (as on "laughing" in the Home headline)
export const markerClass =
  "bg-[linear-gradient(transparent_62%,var(--og-yellow)_62%,var(--og-yellow)_92%,transparent_92%)]";

// The logo's ray burst at a word's top-right, as on the Home headline. Sized in
// em so it scales with the text and never reaches the line above.
export const headlineBurstClass = "absolute -right-[0.42em] top-[0.02em] h-[0.4em] w-[0.4em] -scale-x-100";

// Renders text with one phrase given the yellow marker highlight. With
// { burst: true }, the rays sit after the phrase's last word (before any
// trailing punctuation).
export function highlight(text: string, phrase?: string | null, options: { burst?: boolean } = {}) {
  if (!phrase || !text.includes(phrase)) return amp(text);
  const [before, ...rest] = text.split(phrase);

  let inner: React.ReactNode = amp(phrase);
  if (options.burst) {
    const m = phrase.match(/^([\s\S]*?)(\S+?)([.,!?;:]*)$/);
    if (m) {
      const [, lead, lastWord, punct] = m;
      inner = (
        <>
          {amp(lead)}
          <span className="relative inline-block">
            {amp(lastWord)}
            <Burst className={headlineBurstClass} />
          </span>
          {punct}
        </>
      );
    }
  }

  return (
    <Fragment>
      {amp(before)}
      <span className={markerClass}>{inner}</span>
      {amp(rest.join(phrase))}
    </Fragment>
  );
}
