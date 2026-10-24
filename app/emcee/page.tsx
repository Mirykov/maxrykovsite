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
      {/* Same layout and sizes as the home hero (components/home/HomePage.tsx), at Max's request:
          phones get headline, then the 16:9 video, then intro + button; desktop puts the text on the
          left and a 4:5 crop of the video (following Max through each shot) on the right. */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-y-4 px-4 pb-12 pt-4 sm:px-6 md:min-h-[calc(100svh-5rem)] md:grid-cols-[1.15fr_1fr] md:grid-rows-[auto_1fr] md:content-center md:gap-x-12 md:gap-y-6 md:py-8">
          <div className="mb-4 sm:mb-6 md:mb-0 md:self-start">
            <p className="eyebrow mb-3 text-og-teal-dark md:mb-5">{amp(hero.eyebrow)}</p>
            <h1 className="font-display text-[1.9rem] font-black leading-[1.04] tracking-tight min-[420px]:text-[2.1rem] min-[420px]:[@media(min-height:740px)]:text-[2.25rem] sm:text-5xl lg:text-[clamp(2.9rem,calc((100svh-14rem)/7.4),4rem)]">
              {amp(hero.title)}
            </h1>
          </div>
          <div className="relative mr-4 sm:mr-6 md:col-start-2 md:row-span-2 md:row-start-1 md:mr-0 md:ml-auto md:self-start md:w-full md:max-w-[calc((100svh-10rem)*0.8)]">
            <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-[1.75rem] bg-og-teal sm:-right-6 sm:-top-6 md:rounded-[2rem]" />
            <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-og-ink md:hidden">
              <HeroVideo src={hero.video} poster={hero.poster} label={hero.videoLabel} media="(max-width: 767px)" />
            </div>
            <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[2rem] bg-og-ink md:block">
              <HeroVideo src={hero.videoTall} poster={hero.posterTall} label={hero.videoLabel} media="(min-width: 768px)" />
            </div>
          </div>
          <div className="md:col-start-1 md:row-start-2 md:self-start">
            <p className="mb-4 max-w-xl text-[0.95rem] leading-relaxed text-og-ink/80 sm:text-lg md:mb-8 lg:text-xl lg:[@media(max-height:760px)]:mb-5 lg:[@media(max-height:760px)]:text-lg">{hero.sub}</p>
            <Ctas
              buttons={hero.buttons}
              className="gap-3 max-sm:[&>a]:!px-5 max-sm:[&>a]:!py-3 max-sm:[&>a]:!text-[0.95rem] sm:gap-4"
            />
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
