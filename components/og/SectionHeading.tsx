import { amp } from "./Amp";

export default function SectionHeading({
  id,
  title,
  eyebrow,
  className = "",
}: {
  id: string;
  title: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-3 text-og-teal-dark">{eyebrow}</p>}
      <h2 id={id} className="font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl">
        {amp(title)}
      </h2>
    </div>
  );
}
