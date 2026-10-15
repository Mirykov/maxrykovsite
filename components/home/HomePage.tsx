import { amp } from "@/components/og/Amp";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import home from "@/content/home.json";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import testimonials from "@/content/testimonials.json";
import Button from "@/components/og/Button";
import CtaBand, { Ctas } from "@/components/og/CtaBand";
import SectionHeading from "@/components/og/SectionHeading";
import Burst from "@/components/og/Burst";

// Splits the H1 around the highlighted word so it can get the yellow marker + burst
function HeroTitle({ className }: { className: string }) {
  const { title, highlight } = home.hero;
  const [before, after] = title.split(highlight);
  return (
    <h1 className={className}>
      {before}
      <span className="relative inline-block whitespace-nowrap">
        {/* Mirrored so the burst radiates from the word's top-right, clear of the line above */}
        <Burst className="absolute -right-4 -top-3 h-6 w-6 -scale-x-100 sm:-right-6 sm:-top-4 sm:h-8 sm:w-8" />
        <span className="relative bg-[linear-gradient(transparent_62%,var(--og-yellow)_62%,var(--og-yellow)_92%,transparent_92%)]">
          {highlight}
        </span>
      </span>
      {after}
    </h1>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-24 md:pt-20">
        <div>
          <p className="eyebrow mb-6 text-og-teal-dark">{home.hero.eyebrow}</p>
          <HeroTitle className="font-display mb-6 text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[4rem]" />
          <p className="mb-9 max-w-xl text-lg leading-relaxed text-og-ink/80 sm:text-xl">
            {home.hero.sub}
          </p>
          <Ctas buttons={home.hero.buttons} />
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] bg-og-teal sm:-right-6 sm:-top-6" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/6]">
            <Image
              src={home.hero.image}
              alt={home.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: home.hero.imagePosition }}
            />
            {!home.hero.videoSrc && (
              <span className="eyebrow absolute bottom-3 right-3 rounded-full bg-og-cream/90 px-3 py-1.5 text-[0.65rem] tracking-[0.15em] text-og-ink">
                {home.hero.videoPlaceholder}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <section aria-labelledby="trusted-by" className="border-y border-og-ink/10 bg-white/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:gap-10">
        <h2 id="trusted-by" className="eyebrow shrink-0 text-og-ink/60">
          {home.logoStrip.label}
        </h2>
        <ul className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {home.logoStrip.clients.map((client) => (
            <li
              key={client}
              title="Logo placeholder: swap in the real logo once permission is confirmed"
              className="flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-og-ink/15 px-3 text-center text-sm font-semibold leading-tight text-og-ink/55"
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ChooseYourFun() {
  return (
    <section aria-labelledby="choose" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading id="choose" title={home.chooseYourFun.title} />
      <ul className="grid gap-6 md:grid-cols-3">
        {home.chooseYourFun.cards.map((card) => (
          <li
            key={card.number}
            className="group flex flex-col overflow-hidden rounded-3xl border-2 border-og-teal bg-white transition-shadow hover:shadow-[0_8px_0_var(--og-teal)]"
          >
            <div className="relative aspect-[4/3]">
              <Image src={card.image} alt={card.imageAlt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              <span className="font-display absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-og-yellow text-lg font-black text-og-ink">
                {card.number}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display mb-2 text-2xl font-bold leading-snug">{amp(card.title)}</h3>
              <p className="mb-3 font-semibold text-og-teal-dark">{card.for}</p>
              <p className="mb-6 flex-1 text-og-ink/80">{card.body}</p>
              <Link
                href={card.cta.href}
                className="inline-flex items-center gap-2 self-start font-bold text-og-red underline decoration-2 underline-offset-4 hover:decoration-og-yellow"
              >
                {card.cta.label}
                <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Problem() {
  return (
    <section aria-labelledby="problem" className="bg-white/50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src={home.problem.image}
            alt={home.problem.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover grayscale-[70%]"
          />
        </div>
        <div>
          <h2 id="problem" className="font-display mb-6 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            {amp(home.problem.title)}
          </h2>
          <p className="text-lg leading-relaxed text-og-ink/80 sm:text-xl">{home.problem.body}</p>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  const featured = projects.filter((p) => p.featuredOnHome);
  return (
    <section aria-labelledby="work" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading id="work" title={home.work.title} />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-3">
        {featured.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} sizes="(min-width: 1024px) 33vw, 50vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function HowItWorks() {
  return (
    <section aria-labelledby="how" className="bg-og-teal text-og-ink">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading id="how" title={home.howItWorks.title} />
        <ol className="mb-12 grid gap-6 md:grid-cols-3">
          {home.howItWorks.steps.map((step, i) => (
            <li key={step.title} className="rounded-3xl bg-og-cream p-7">
              {/* Scorecard-style step number */}
              <span className="font-display mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-og-ink text-3xl font-black text-og-yellow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mb-2 text-2xl font-bold leading-snug">{amp(step.title)}</h3>
              <p className="text-og-ink/80">{step.body}</p>
            </li>
          ))}
        </ol>
        <Button href={home.howItWorks.cta.href}>{home.howItWorks.cta.label}</Button>
      </div>
    </section>
  );
}

function FeaturedTestimonial() {
  const t = testimonials.find((x) => x.id === home.featuredTestimonial)!;
  return (
    <section aria-label="What people say">
      <figure className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28">
        <span aria-hidden="true" className="font-display absolute -top-2 left-2 text-[9rem] leading-none text-og-yellow sm:left-0 md:top-6">
          &ldquo;
        </span>
        <blockquote className="font-display relative text-2xl font-medium leading-snug sm:text-[2rem]">
          <p>{t.quote}</p>
        </blockquote>
        <figcaption className="mt-8">
          <span className="block font-bold">{t.name}</span>
          <span className="text-og-ink/70">{t.role}</span>
        </figcaption>
      </figure>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <ChooseYourFun />
      <Problem />
      <SelectedWork />
      <HowItWorks />
      <FeaturedTestimonial />
      <CtaBand id="closing" {...home.closing} />
    </>
  );
}
