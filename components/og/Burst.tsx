// The yellow three-line burst from the OddGood logo. Decorative only.
export default function Burst({
  className = "",
  color = "var(--og-yellow)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={`og-burst ${className}`}
    >
      <g stroke={color} strokeWidth="12" strokeLinecap="round" fill="none">
        <line x1="10" y1="62" x2="40" y2="72" />
        <line x1="30" y1="22" x2="52" y2="50" />
        <line x1="72" y1="8" x2="76" y2="40" />
      </g>
    </svg>
  );
}
