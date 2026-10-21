import { Fragment } from "react";
import { amp } from "./Amp";

// The yellow marker stroke behind a word (as on "laughing" in the Home headline)
export const markerClass =
  "bg-[linear-gradient(transparent_62%,var(--og-yellow)_62%,var(--og-yellow)_92%,transparent_92%)]";

// Renders text with one phrase given the yellow marker highlight.
export function highlight(text: string, phrase?: string | null) {
  if (!phrase || !text.includes(phrase)) return amp(text);
  const [before, ...rest] = text.split(phrase);
  return (
    <Fragment>
      {amp(before)}
      <span className={markerClass}>{amp(phrase)}</span>
      {amp(rest.join(phrase))}
    </Fragment>
  );
}
