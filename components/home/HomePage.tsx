import { amp } from "@/components/og/Amp";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import home from "@/content/home.json";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import CtaBand, { Ctas } from "@/components/og/CtaBand";
import SectionHeading from "@/components/og/SectionHeading";
import Burst from "@/components/og/Burst";
import Marquee from "@/components/og/Marquee";
import HeroVideo from "@/components/HeroVideo";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import testimonials from "@/content/testimonials.json";
import { headlineBurstClass, markerClass } from "@/components/og/Highlight";

// Splits the H1 around the highlighted word so it can get the yellow marker + burst
function HeroTitle({ className }: { className: string }) {
  const { title, highlight } = home.hero;
  const [before, after] = title.split(highlight);
  return (
    <h1 className={className}>
      {before}
      <span className="relative inline-block whitespace-nowrap">
        {/* Mirrored so the burst radiates from the word's top-right; sized in em so it never reaches the line above */}
        <Burst className={headlineBurstClass} />
        <span className={`relative ${markerClass}`}>{highlight}</span>
      </span>
      {after}
    </h1>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Max wants the headline, photo/video, intro AND buttons all on the first screen.
          Phones: headline, then a full-width 16:9 frame, then intro + buttons, all sized to fit.
          Desktop: headline/intro/buttons on the left; a 4:5 frame on the right capped to the window height. */}
      <div className="mx-auto grid max-w-6xl gap-y-4 px-4 pb-12 pt-4 sm:px-6 md:min-h-[calc(100svh-5rem)] md:grid-cols-[1.15fr_1fr] md:grid-rows-[auto_1fr] md:content-center md:gap-x-12 md:gap-y-6 md:py-8">
        <HeroTitle className="font-display text-[1.9rem] font-black leading-[1.04] tracking-tight mb-4 min-[420px]:text-[2.1rem] min-[420px]:[@media(min-height:740px)]:text-[2.25rem] sm:mb-6 sm:text-5xl md:mb-0 md:self-start lg:text-[clamp(2.9rem,calc((100svh-14rem)/7.4),4rem)]" />
        <div className="relative mr-4 sm:mr-6 md:col-start-2 md:row-span-2 md:row-start-1 md:mr-0 md:ml-auto md:self-start md:w-full md:max-w-[calc((100svh-10rem)*0.8)]">
          <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-[1.75rem] bg-og-teal sm:-right-6 sm:-top-6 md:rounded-[2rem]" />
          {/* Taller 3:2 on larger phones (e.g. 440x765, Max's iPhone), 16:9 on smaller ones so everything still fits */}
          <div className="relative aspect-video overflow-hidden rounded-[1.75rem] min-[420px]:[@media(min-height:740px)]:aspect-[3/2] md:hidden">
            <Image
              src={home.hero.imageMobile}
              alt={home.hero.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] md:block">
            <HeroVideo
              src={home.hero.videoDesktop}
              poster={home.hero.videoDesktopPoster}
              label={home.hero.videoDesktopLabel}
              media="(min-width: 768px)"
            />
          </div>
        </div>
        <div className="md:col-start-1 md:row-start-2 md:self-start">
          <p className="mb-4 max-w-xl text-[0.95rem] leading-relaxed text-og-ink/80 sm:text-lg md:mb-8 lg:text-xl lg:[@media(max-height:760px)]:mb-5 lg:[@media(max-height:760px)]:text-lg">{home.hero.sub}</p>
          <Ctas
            buttons={home.hero.buttons}
            className="gap-3 max-sm:[&>a]:!px-5 max-sm:[&>a]:!py-3 max-sm:[&>a]:!text-[0.95rem] sm:gap-4"
          />
        </div>
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
        <div className="relative">
          {/* Yellow offset block (the hero uses teal, top-right; this one sits bottom-left for variety) */}
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-full w-full rounded-[2rem] bg-og-yellow sm:-bottom-6 sm:-left-6" />
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem]">
            <Image
              src={home.problem.image}
              alt={home.problem.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
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
        <ol className="grid gap-6 md:grid-cols-3">
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
      </div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section aria-labelledby="trusted-by" className="border-y border-og-ink/10 bg-white/50 py-14 md:py-16">
      <h2 id="trusted-by" className="eyebrow mb-8 text-center text-og-ink/60">
        {home.trustedBy.label}
      </h2>
      <Marquee items={home.trustedBy.organizations} label="Organizations that have worked with OddGood Events" />
    </section>
  );
}

function Testimonials() {
  const { testimonials: t } = home;
  const quotes = t.ids.map((id) => testimonials.find((q) => q.id === id)!);
  return (
    <section aria-labelledby="home-testimonials" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading id="home-testimonials" title={t.title} />
      {/* Carousel left, photo right on desktop; on phones the photo follows the carousel */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <TestimonialCarousel quotes={quotes} />
        <div className="relative mx-auto mr-4 w-full max-w-md sm:mr-6 lg:max-w-none">
          <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] bg-og-teal sm:-right-6 sm:-top-6" />
          <div className="relative aspect-square overflow-hidden rounded-[2rem]">
            <Image src={t.image} alt={t.imageAlt} fill sizes="(min-width: 1024px) 45vw, 448px" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ChooseYourFun />
      <Problem />
      <SelectedWork />
      <TrustedBy />
      <HowItWorks />
      <Testimonials />
      <CtaBand id="closing" {...home.closing} />
    </>
  );
}
