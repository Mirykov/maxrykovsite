import type { Metadata } from "next";
import PillButton from "@/components/PillButton";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/caseStudies";

export const metadata: Metadata = {
  title: "Selected Work | Max Rykov",
  description: "Case studies in fundraising, communications, community engagement, and events.",
};

export default function WorkPage() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h1 className="font-display font-bold uppercase text-3xl sm:text-5xl text-anchor mb-4">
          Selected Work
        </h1>
        <p className="text-ink/70 max-w-2xl mb-12 text-lg">
          Five deep, specific stories — each one proof of experience and an
          example of the kind of problem we can help solve.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>

        <div className="rounded-xl border border-ink/10 bg-white/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display uppercase tracking-wide text-anchor mb-2">
              Got something like this?
            </h2>
            <p className="text-ink/70">Let&rsquo;s talk about what you&rsquo;re trying to make happen.</p>
          </div>
          <PillButton href="/start" variant="outline-dark">
            Start a Project
          </PillButton>
        </div>
      </div>
    </section>
  );
}
