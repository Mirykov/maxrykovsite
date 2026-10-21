import type { Metadata } from "next";
import content from "@/content/emcee.json";
import testimonials from "@/content/testimonials.json";
import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { Ctas } from "@/components/og/CtaBand";
import CtaBand from "@/components/og/CtaBand";
import SectionHeading from "@/components/og/SectionHeading";
import { amp } from "@/components/og/Amp";

export const metadata: Metadata = {
  title: "Emcee & Event Hosting",
  description:
    "Book Max Rykov to emcee your fundraiser, conference, festival, or ceremony. Humor, energy, and professionalism that keep the program moving.",
};

export default function EmceePage() {
  const { hero } = content;
  const quotes = content.testimonials.map((id) => testimonials.find((t) => t.id === id)!);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 md:pt-20">
        <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-[1.3fr_1fr] md:items-end">
          <div>
            <p className="eyebrow mb-6 text-og-teal-dark">{amp(hero.eyebrow)}</p>
            <h1 className="font-display text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-6xl">
              {amp(hero.title)}
            </h1>
          </div>
          <div>
            <p className="mb-8 text-lg leading-relaxed text-og-ink/80 sm:text-xl">{hero.sub}</p>
            <Ctas buttons={hero.buttons} />
          </div>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] bg-og-teal sm:-right-5 sm:-top-5" />
          <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-og-ink">
            <HeroVideo src={hero.video} poster={hero.poster} label={hero.videoLabel} />
          </div>
        </div>
      </section>

      <section aria-labelledby="testimonials" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <SectionHeading id="testimonials" title={content.testimonialsTitle} />
        {/* Carousel left, photo right on desktop; on phones the photo follows the carousel */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <TestimonialCarousel quotes={quotes} />
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-full w-full rounded-[2rem] bg-og-yellow sm:-bottom-6 sm:-left-6" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem]">
              <Image
                src={content.testimonialsImage}
                alt={content.testimonialsImageAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 448px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="help" className="bg-og-teal text-og-ink">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <SectionHeading id="help" title={content.helpWith.title} className="!mb-8" />
          <ul className="flex flex-wrap gap-3">
            {content.helpWith.items.map((item) => (
              <li key={item} className="rounded-full bg-og-cream px-5 py-2.5 text-lg font-semibold">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand id="booking" {...content.booking} />
    </>
  );
}
