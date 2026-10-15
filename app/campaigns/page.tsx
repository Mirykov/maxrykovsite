import type { Metadata } from "next";
import Image from "next/image";
import content from "@/content/campaigns.json";
import { amp } from "@/components/og/Amp";
import CtaBand from "@/components/og/CtaBand";
import SectionHeading from "@/components/og/SectionHeading";

export const metadata: Metadata = {
  title: "Creative Campaigns",
  description:
    "Creative marketing and engagement campaigns that help nonprofits earn attention and invite participation, like the Campaign for Clean Water at Lake Purdy.",
};

function Hero() {
  const { hero } = content;
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pb-20 md:pt-20">
      <div>
        <p className="eyebrow mb-6 text-og-teal-dark">{hero.eyebrow}</p>
        <h1 className="font-display mb-6 text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-6xl">{amp(hero.title)}</h1>
        <p className="max-w-xl text-lg leading-relaxed text-og-ink/80 sm:text-xl">{hero.sub}</p>
      </div>
      <div className="relative">
        <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] bg-og-teal sm:-right-6 sm:-top-6" />
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image src={hero.image} alt={hero.imageAlt} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

function Offerings() {
  return (
    <section aria-labelledby="offerings" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-28">
      <h2 id="offerings" className="sr-only">
        How we help with campaigns
      </h2>
      <ul className="grid gap-6 md:grid-cols-3">
        {content.offerings.map((o) => (
          <li key={o.title} className="rounded-3xl border-2 border-og-teal bg-white p-7">
            <h3 className="font-display mb-2 text-2xl font-bold leading-snug">{amp(o.title)}</h3>
            <p className="mb-3 font-semibold text-og-teal-dark">{o.for}</p>
            <p className="text-og-ink/80">{o.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CaseStudy() {
  const cs = content.caseStudy;
  return (
    <section aria-labelledby="case-study" className="bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading id="case-study" eyebrow={cs.eyebrow} title={cs.title} className="!mb-4" />
        <p className="eyebrow mb-10 flex flex-wrap gap-x-6 gap-y-1 text-og-ink/60">
          {cs.partners.map((p) => (
            <span key={p.name}>
              {p.label}: {amp(p.name)}
            </span>
          ))}
        </p>

        <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
          <p className="max-w-3xl text-lg leading-relaxed text-og-ink/85 sm:text-xl">{cs.intro}</p>
          {/* Scorecard-style stat blocks */}
          <dl className="grid grid-cols-2 gap-3">
            {cs.stats.map((s) => (
              <div key={s.label} className="on-dark flex flex-col-reverse rounded-2xl bg-og-ink p-4 text-white">
                <dt className="mt-1 text-sm font-semibold leading-snug text-white/80">{s.label}</dt>
                <dd className="font-display text-3xl font-black text-og-yellow">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="space-y-16 md:space-y-20">
          {cs.phases.map((phase, i) => (
            <li key={phase.title} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              {/* Photos alternate sides on wider screens */}
              <div className={`relative ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-og-ink/5">
                  <Image
                    src={phase.image}
                    alt={phase.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2 text-og-teal-dark">{phase.label}</p>
                <h3 className="font-display mb-4 text-3xl font-bold leading-tight">{amp(phase.title)}</h3>
                <div className="space-y-4 text-lg leading-relaxed text-og-ink/85">
                  {phase.body.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
                {phase.quote && (
                  <figure className="mt-6 border-l-4 border-og-yellow pl-5">
                    <blockquote className="font-display text-lg italic leading-relaxed">
                      <p>&ldquo;{phase.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-2 text-sm font-semibold text-og-ink/60">{phase.quoteSource}</figcaption>
                  </figure>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function CampaignsPage() {
  return (
    <>
      <Hero />
      <Offerings />
      <CaseStudy />
      <CtaBand id="closing" {...content.closing} />
    </>
  );
}
