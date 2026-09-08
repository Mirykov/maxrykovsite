export default function Testimonial({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <blockquote className="border-l-4 border-accent bg-white/5 pl-5 py-3 pr-4">
      <p className="italic text-ink/90">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-2 text-sm text-ink/60">&mdash; {attribution}</footer>
    </blockquote>
  );
}
