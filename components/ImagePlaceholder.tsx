import { ImageIcon } from "lucide-react";

const toneStyles = {
  light: "bg-ink/10 border-ink/25 text-ink/50",
  dark: "bg-white/10 border-white/40 text-white/70",
};

export default function ImagePlaceholder({
  label,
  className = "",
  tone = "light",
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed text-center px-4 ${toneStyles[tone]} ${className}`}
    >
      <ImageIcon size={28} strokeWidth={1.5} />
      <span className="text-xs font-display uppercase tracking-wide">{label}</span>
    </div>
  );
}
