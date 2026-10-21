import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/og/CtaBand";
import { highlight } from "@/components/og/Highlight";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Game shows, awards shows, and signature fundraising events by OddGood Events, from The Fountys to Recycled Runway and Can You Repeat That?",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-20">
        <p className="eyebrow mb-6 text-og-teal-dark">Selected Work</p>
        <h1 className="font-display mb-6 max-w-4xl text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-6xl">
          {highlight(
            "We believe that building community and buy-in for worthy causes is most effective when it's genuinely fun.",
            "genuinely fun",
            { burst: true },
          )}
        </h1>
        <p className="mb-14 max-w-2xl text-lg leading-relaxed text-og-ink/80 sm:text-xl">
          Our work spans interactive events, creative campaigns, and whimsical community experiences. The common
          thread is finding a more interesting way to get people to care, participate, or connect.
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} sizes="(min-width: 1024px) 33vw, 50vw" />
            </li>
          ))}
        </ul>
      </section>
      <CtaBand
        id="closing"
        title="Want something like this?"
        body="Tell us what you're planning. We'll figure out the most interesting way to bring it to life."
        buttons={[{ href: "/book", label: "Book a Call", variant: "primary" }]}
      />
    </>
  );
}
