import Button from "./Button";
import Burst from "./Burst";

// Temporary stand-in for pages that come after the Home page review.
export default function ComingSoon({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 md:py-32">
      <Burst className="mb-4 h-10 w-10" />
      <h1 className="font-display mb-5 text-4xl font-black leading-tight tracking-tight sm:text-6xl">{title}</h1>
      <p className="mb-4 text-lg text-og-ink/80 sm:text-xl">{sub}</p>
      <p className="eyebrow mb-10 text-og-teal-dark">This page is next on the build list.</p>
      <Button href="/" variant="secondary">
        Back to Home
      </Button>
    </section>
  );
}
