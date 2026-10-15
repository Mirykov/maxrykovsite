import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PillButton from "@/components/PillButton";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: caseStudy.challenge,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  const sections = [
    { label: "The Problem", body: caseStudy.challenge },
    { label: caseStudy.insightLabel, body: caseStudy.insight, isDraft: true },
    { label: "The Work", body: caseStudy.work },
    { label: "The Result", body: caseStudy.result },
    { label: "The Bigger Idea", body: caseStudy.biggerIdea },
  ];

  return (
    <article className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wide text-anchor mb-8"
        >
          <ArrowLeft size={16} /> Selected Work
        </Link>

        <p className="text-sm font-display uppercase tracking-wide text-anchor mb-2">
          {caseStudy.client}
        </p>
        <h1 className="font-display font-bold uppercase text-3xl sm:text-5xl mb-4">
          {caseStudy.title}
        </h1>
        <p className="text-ink/70 text-lg mb-10">{caseStudy.hook}</p>

        {caseStudy.image ? (
          <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden mb-12">
            <Image
              src={caseStudy.image}
              alt={caseStudy.client}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <ImagePlaceholder label={`${caseStudy.client} photo`} className="h-64 sm:h-96 w-full rounded-xl mb-12" />
        )}

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.label}>
              <h2 className="font-display uppercase tracking-wide text-anchor text-xl mb-3">
                {section.label}
              </h2>
              <p className={`text-lg leading-relaxed ${section.isDraft ? "italic text-ink/60" : "text-ink/85"}`}>
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl border border-ink/10 bg-white/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-display uppercase tracking-wide text-anchor">
            Got a problem like this one?
          </p>
          <PillButton href="/start" variant="outline-dark">
            Start a Project
          </PillButton>
        </div>
      </div>
    </article>
  );
}
