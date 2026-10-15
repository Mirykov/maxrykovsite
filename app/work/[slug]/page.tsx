import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, nextProject, projects } from "@/lib/projects";
import { amp } from "@/components/og/Amp";
import CtaBand from "@/components/og/CtaBand";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const lead = project.challenge ?? project.project[0] ?? project.subtitle ?? "";
  return {
    title: project.title,
    description: lead.length > 160 ? lead.slice(0, 157).trimEnd() + "…" : lead,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-4 text-og-teal-dark">{title}</h2>
      <div className="space-y-4 text-lg leading-relaxed text-og-ink/85">{children}</div>
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = nextProject(slug);

  return (
    <>
      <article>
        <header className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-2 font-semibold text-og-teal-dark underline-offset-4 hover:underline"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            All work
          </Link>
          {project.partner && (
            <p className="eyebrow mb-4 text-og-teal-dark">
              {project.partnerLabel}: {project.partner}
            </p>
          )}
          <h1 className="font-display mb-3 max-w-4xl text-[2.5rem] font-black leading-[1.05] tracking-tight sm:text-6xl">
            {amp(project.title)}
          </h1>
          {project.subtitle && (
            <p className="font-display max-w-3xl text-xl text-og-ink/75 sm:text-2xl">{amp(project.subtitle)}</p>
          )}
        </header>

        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
          <div className="relative" style={{ maxWidth: project.imageMaxWidth }}>
            <div aria-hidden="true" className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] bg-og-teal sm:-right-5 sm:-top-5" />
            <div
              className={`relative overflow-hidden rounded-[2rem] ${project.imageMaxWidth ? "aspect-[3/2]" : "aspect-[4/3] sm:aspect-[16/9]"}`}
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes={project.imageMaxWidth ? `${project.imageMaxWidth}px` : "(min-width: 1152px) 1104px, 100vw"}
                className="object-cover"
                style={{ objectPosition: project.imagePosition }}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-3xl space-y-12">
            {project.challenge && (
              <Section title="The Challenge">
                <p>{project.challenge}</p>
              </Section>
            )}
            {project.project.length > 0 && (
              <Section title="The Project">
                {project.project.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
                {project.highlights && (
                  <>
                    {project.highlightsTitle && <p className="font-semibold text-og-ink">{project.highlightsTitle}</p>}
                    <ul className="space-y-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-og-red" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Section>
            )}
          </div>

          {project.stats.length > 0 && (
            <aside aria-labelledby="impact" className="lg:sticky lg:top-28 lg:self-start">
              <h2 id="impact" className="eyebrow mb-4 text-og-teal-dark">
                The Impact
              </h2>
              {/* Scorecard-style stat blocks */}
              <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {project.stats.map((s) => (
                  // Label comes first in the markup (as <dl> requires) but shows below the number
                  <div key={s.label} className="on-dark flex flex-col-reverse rounded-2xl bg-og-ink p-4 text-white sm:p-5">
                    <dt className="mt-1 text-sm font-semibold text-white/80">{s.label}</dt>
                    <dd className="font-display text-3xl font-black text-og-yellow sm:text-4xl">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>

        {project.gallery.length > 0 && (
          <section aria-label="Photos" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
            <ul className={`grid gap-4 ${project.gallery.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {project.gallery.map((photo) => (
                <li key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={project.gallery.length === 3 ? "(min-width: 640px) 33vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
            {project.photoCredit && <p className="mt-4 text-sm text-og-ink/60">Photos: {project.photoCredit}</p>}
          </section>
        )}

        <nav aria-label="Next project" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-3xl border-2 border-og-ink/10 bg-white p-6 hover:border-og-teal sm:p-8"
          >
            <span>
              <span className="eyebrow mb-1 block text-og-teal-dark">Next project</span>
              <span className="font-display text-2xl font-bold group-hover:text-og-red sm:text-3xl">{amp(next.title)}</span>
            </span>
            <ArrowRight size={28} aria-hidden="true" className="shrink-0 text-og-red transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </article>

      <CtaBand
        id="closing"
        title="Want something like this?"
        body="Tell us what you're planning. We'll figure out the most interesting way to bring it to life."
        buttons={[{ href: "/book", label: "Book a Call", variant: "primary" }]}
      />
    </>
  );
}
