import { amp } from "@/components/og/Amp";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/caseStudies";
import ImagePlaceholder from "./ImagePlaceholder";

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-ink/10 bg-white/40 hover:border-anchor transition-colors"
    >
      <div className="relative h-40 w-full">
        {caseStudy.image ? (
          <Image
            src={caseStudy.image}
            alt={caseStudy.client}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder label={caseStudy.client} className="h-full w-full" />
        )}
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-wide text-anchor font-display mb-1">
          {amp(caseStudy.client)}
        </p>
        <h3 className="font-display text-lg uppercase tracking-wide mb-2 group-hover:text-anchor transition-colors">
          {amp(caseStudy.title)}
        </h3>
        <p className="text-sm text-ink/70">{caseStudy.hook}</p>
      </div>
    </Link>
  );
}
