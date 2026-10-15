import Link from "next/link";
import Burst from "./Burst";

export type ButtonVariant = "primary" | "secondary" | "secondary-light" | "yellow";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full font-bold text-base transition-[transform,background-color,color,box-shadow] duration-150 active:translate-y-[2px]";

// Primary is the "buzzer": red with a darker red underside that presses in on click.
const variants: Record<ButtonVariant, string> = {
  primary:
    "og-burst-hover bg-og-red text-white px-7 py-3.5 shadow-[0_4px_0_var(--og-red-dark)] hover:bg-og-red-dark active:shadow-[0_2px_0_var(--og-red-dark)]",
  secondary:
    "border-2 border-og-ink text-og-ink px-7 py-3 hover:bg-og-ink hover:text-white",
  "secondary-light":
    "border-2 border-white text-white px-7 py-3 hover:bg-white hover:text-og-ink",
  yellow:
    "bg-og-yellow text-og-ink px-7 py-3.5 shadow-[0_4px_0_#b8953c] hover:bg-[#e8c56c] active:shadow-[0_2px_0_#b8953c]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {variant === "primary" && (
        <Burst className="pointer-events-none absolute -left-4 -top-4 h-7 w-7" />
      )}
      {children}
    </Link>
  );
}
