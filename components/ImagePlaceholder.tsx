// Stand-in for a photo or video Max will supply later. A solid brand-color
// block with a bracketed caption, e.g. "[PHOTO: Max on stage, wide]".
const tones = {
  teal: "bg-og-teal text-og-ink",
  red: "bg-og-red text-white",
  yellow: "bg-og-yellow text-og-ink",
  ink: "bg-og-ink text-og-yellow",
};

export default function ImagePlaceholder({
  label,
  className = "",
  tone = "teal",
}: {
  label: string;
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label.replace(/^\[|\]$/g, "")}`}
      className={`flex items-center justify-center p-6 text-center ${tones[tone]} ${className}`}
    >
      <span className="eyebrow max-w-[18rem] leading-relaxed">{label}</span>
    </div>
  );
}
