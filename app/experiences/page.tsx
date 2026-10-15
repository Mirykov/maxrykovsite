import { amp } from "@/components/og/Amp";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import content from "@/content/experiences.json";
import Button from "@/components/og/Button";
import Burst from "@/components/og/Burst";
import CtaBand from "@/components/og/CtaBand";
import SectionHeading from "@/components/og/SectionHeading";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Custom game shows, fully original event experiences, emcee hosting, and creative campaigns in Birmingham. See what's included and book a call.",
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
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
            style={{ objectPosition: hero.imagePosition }}
          />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section aria-labelledby="services" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-28">
      <h2 id="services" className="sr-only">
        What you can book
      </h2>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {content.services.map((s) => {
          const featured = Boolean(s.tag);
          return (
            <li
              key={s.name}
              className={`relative flex flex-col rounded-3xl bg-white p-6 ${
                featured ? "border-[3px] border-og-teal shadow-[0_8px_0_var(--og-teal)]" : "border-2 border-og-ink/10"
              }`}
            >
              {s.tag && (
                <span className="eyebrow absolute -top-4 right-5 inline-flex items-center gap-1.5 rounded-full bg-og-yellow px-3 py-1.5 text-[0.7rem] text-og-ink">
                  <Burst className="h-4 w-4" color="var(--og-ink)" />
                  {s.tag}
                </span>
              )}
              <h3 className="font-display mb-2 text-2xl font-bold leading-snug">{amp(s.name)}</h3>
              <p className="mb-5 font-semibold text-og-teal-dark">For {s.for.charAt(0).toLowerCase() + s.for.slice(1)}</p>
              <ul className="mb-6 flex-1 space-y-2.5">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-og-ink/85">
                    <Check size={18} strokeWidth={3} aria-hidden="true" className="mt-0.5 shrink-0 text-og-teal-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-3 border-t border-og-ink/10 pt-5">
                <Button href={s.cta.href} className="w-full !px-3 text-center !text-sm">
                  {s.cta.label}
                </Button>
                {/* Every card reserves the link row so the Book a Call buttons line up */}
                <div className="flex h-5 items-center justify-center">
                  {s.moreLink && (
                    <Link
                      href={s.moreLink.href}
                      className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-og-teal-dark underline-offset-4 hover:underline"
                    >
                      {s.moreLink.label}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-8 text-sm text-og-ink/70">{content.servicesNote}</p>
    </section>
  );
}

function RightPlace() {
  const { rightPlace } = content;
  return (
    <section aria-labelledby="right-place" className="bg-og-teal text-og-ink">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading id="right-place" title={rightPlace.title} />
        <ul className="grid gap-4 md:grid-cols-2">
          {rightPlace.items.map((item) => (
            <li key={item} className="flex items-start gap-4 rounded-3xl bg-og-cream p-6 text-lg font-semibold">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-og-red text-white">
                <Check size={20} strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="pt-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  const { faq } = content;
  return (
    <section aria-labelledby="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading id="faq" title={faq.title} />
      <div className="divide-y-2 divide-og-ink/10 border-y-2 border-og-ink/10">
        {faq.items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {item.q}
              <Plus
                size={22}
                strokeWidth={2.5}
                aria-hidden="true"
                className="shrink-0 text-og-red transition-transform group-open:rotate-45 motion-reduce:transition-none"
              />
            </summary>
            <div className="pb-6 pr-10 text-og-ink/80">
              {item.a ?? (
                <span className="eyebrow rounded bg-og-yellow px-2 py-1 text-og-ink">[CONFIRM: Max to answer]</span>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function ExperiencesPage() {
  return (
    <>
      <Hero />
      <Services />
      <RightPlace />
      <Faq />
      <CtaBand id="closing" {...content.closing} />
    </>
  );
}
