/* eslint-disable @next/next/no-img-element -- SVG logos don't need next/image optimization */

const files = {
  full: { color: "/brand/oddgood-logo.svg", white: "/brand/oddgood-logo-white.svg" },
  wordmark: { color: "/brand/oddgood-wordmark.svg", white: "/brand/oddgood-wordmark-white.svg" },
};

export default function Logo({
  kind = "full",
  white = false,
  className = "",
}: {
  kind?: "full" | "wordmark";
  white?: boolean;
  className?: string;
}) {
  return (
    <img
      src={files[kind][white ? "white" : "color"]}
      alt="OddGood Events"
      className={className}
    />
  );
}
