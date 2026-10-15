import { Fragment, type ReactNode } from "react";

// Fraunces' default "&" is a looped form that reads like "@" (Max flagged it).
// Its classic alternate isn't in Google Fonts' copy, so .amp renders "&" with a
// tiny self-hosted font holding only that glyph (app/fonts/fraunces-amp-*.otf,
// built from the full OFL Fraunces at weights 500/700/900). Use for display text.
export function amp(text: string): ReactNode {
  if (!text.includes("&")) return text;
  return text.split("&").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <span className="amp">&amp;</span>}
      {part}
    </Fragment>
  ));
}
