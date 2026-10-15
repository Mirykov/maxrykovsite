import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { amp } from "./og/Amp";

// Image-led card linking to the project's own page. Organization names live
// on the project page, not the card (Max's call).
export default function ProjectCard({
  project,
  sizes,
  showSubtitle = false,
}: {
  project: Project;
  sizes: string;
  showSubtitle?: boolean;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3]">
        <Image
          src={project.cardImage ?? project.image}
          alt={project.cardImageAlt ?? project.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          style={{ objectPosition: project.cardImage ? project.cardImagePosition : project.imagePosition }}
        />
      </div>
      <h3 className="font-display text-lg font-bold leading-snug group-hover:text-og-red sm:text-xl">
        {amp(project.title)}
      </h3>
      {showSubtitle && project.subtitle && <p className="mt-1 text-og-ink/70">{project.subtitle}</p>}
    </Link>
  );
}
