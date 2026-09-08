import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "accent" | "outline-light" | "outline-dark";

const variantStyles: Record<Variant, string> = {
  accent: "bg-accent text-anchor hover:bg-white",
  "outline-light":
    "border-2 border-white text-white hover:bg-white hover:text-anchor",
  "outline-dark":
    "border-2 border-anchor text-anchor hover:bg-anchor hover:text-white",
};

export default function PillButton({
  href,
  children,
  variant = "accent",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-display font-semibold uppercase tracking-wide text-sm transition-colors duration-150 ${variantStyles[variant]} ${className}`}
    >
      {children}
      <ArrowRight size={16} strokeWidth={2.5} />
    </Link>
  );
}
