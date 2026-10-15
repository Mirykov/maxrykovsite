import type { Metadata } from "next";
import Image from "next/image";
import content from "@/content/about.json";
import { amp } from "@/components/og/Amp";
import CtaBand from "@/components/og/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "OddGood Events is led by Max Rykov, a creative thinker, event host, and community engagement professional in Birmingham, Alabama.",
};

type Segment = { text: string; href?: string };

function Paragraph({ segments }: { segments: Segment[] }) {
  return (
    <p>
      {segments.map((seg, i) =>
        seg.href ? (
          <a
            key={i}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-og-teal-dark underline decoration-og-teal/50 decoration-2 underline-offset-4 hover:decoration-og-teal-dark"
          >
            {seg.text}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-28 md:pt-20 lg:gap-16">
        <div>
          <p className="eyebrow mb-6 text-og-teal-dark">{content.eyebrow}</p>
          <h1 className="font-display mb-6 text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-6xl">
            {amp(content.title)}
          </h1>
          <p className="mb-12 text-lg leading-relaxed text-og-ink/80 sm:text-xl">{content.lead}</p>

          <h2 className="font-display mb-5 text-3xl font-bold sm:text-4xl">{content.greeting}</h2>
          <div className="space-y-5 text-lg leading-relaxed text-og-ink/85">
            {content.paragraphs.map((segments, i) => (
              <Paragraph key={i} segments={segments} />
            ))}
          </div>
        </div>

        <div className="relative md:sticky md:top-28">
          {/* Yellow offset block, like the Home page photos (red would clash with the blazer) */}
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-full w-full rounded-[2rem] bg-og-yellow sm:-bottom-6 sm:-left-6" />
          <div className="relative aspect-[6/7] overflow-hidden rounded-[2rem]">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
          </div>
        </div>
      </section>

      <CtaBand id="closing" {...content.closing} />
    </>
  );
}
