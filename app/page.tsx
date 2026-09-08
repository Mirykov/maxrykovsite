import Image from "next/image";
import PillButton from "@/components/PillButton";
import ServiceGrid from "@/components/ServiceGrid";
import CaseStudyCard from "@/components/CaseStudyCard";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { caseStudies } from "@/lib/caseStudies";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center bg-anchor text-white overflow-hidden">
        <Image
          src="/images/hero-crowd.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-anchor/70 via-anchor/60 to-black/80" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <h1 className="font-display font-bold uppercase text-accent leading-[0.95] text-4xl sm:text-6xl md:text-7xl mb-6">
            Making important things
            <br /> impossible to ignore.
          </h1>
          <p className="max-w-xl text-lg sm:text-xl text-white/90 mb-2">
            Fundraising. Communications. Community engagement. Events.
          </p>
          <p className="max-w-xl text-lg sm:text-xl text-white/90 mb-8">
            We help mission-driven organizations get people to care —
            and give them a reason to act.
          </p>
          <PillButton href="/start" variant="accent">
            Start a Project
          </PillButton>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl mb-8">
            Important work doesn&rsquo;t have to be boring.
          </h2>
          <div className="space-y-5 text-lg text-white/90">
            <p>
              Another email. Another gala. Another &ldquo;awareness campaign.&rdquo;
              Another organization telling people how important its mission is.
            </p>
            <p>
              Meanwhile, the work actually matters — and it&rsquo;s still
              competing for the same attention, dollars, and time as
              everything else.
            </p>
            <p>
              We think there&rsquo;s a better way: strategy that&rsquo;s smart
              and fun, executed well enough that people actually show up.
              Sometimes that&rsquo;s a beautifully run gala. Sometimes it&rsquo;s
              asking your donors to fund the operating costs grants won&rsquo;t
              touch by building couture out of office supplies. Both are on
              the table.
            </p>
            <p className="font-display uppercase text-accent">
              That&rsquo;s the kind of work we like to do.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="what-we-do" className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl text-anchor">
              What We Do
            </h2>
          </div>
          <ServiceGrid />
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-teal text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl mb-8">
            How We Work
          </h2>
          <h3 className="font-display text-2xl mb-6 text-accent">
            Start with the problem. Not the deliverable.
          </h3>
          <div className="space-y-5 text-lg text-white/90">
            <p>You might come to us asking for a website.</p>
            <p>
              But maybe you don&rsquo;t really need a website. Maybe you need
              people to understand what you do.
            </p>
            <p>You might ask us to plan your annual fundraiser.</p>
            <p>
              But maybe the real problem is that nobody is excited to attend
              anymore.
            </p>
            <p>
              We start there. Before we make anything, we figure out what
              you&rsquo;re actually trying to accomplish, who needs to care,
              what you want them to do, and what&rsquo;s getting in the way.
            </p>
            <p className="font-display">Then we figure out what needs to be built.</p>
          </div>

          <h3 className="font-display text-2xl mt-12 mb-6 text-accent">
            Strategy + Creativity + Execution
          </h3>
          <div className="space-y-5 text-lg text-white/90">
            <p>
              Strategy isn&rsquo;t a separate deliverable we hand you and walk
              away from. It&rsquo;s part of everything we do.
            </p>
            <p>
              We bring strategic thinking and creative problem-solving to the
              table, then stay involved through execution. Depending on the
              project, that might mean developing the campaign strategy,
              writing the messaging, designing the website, producing the
              video, creating the event, managing the rollout, or bringing in
              the designer, developer, filmmaker, photographer, writer, or
              producer the project actually calls for.
            </p>
            <p className="font-display">
              The idea is the easy part. Making it work is the interesting
              part.
            </p>
            <p className="font-display uppercase text-accent">
              One point of contact. The right people around the table. No
              unnecessary agency machinery.
            </p>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="selected-work" className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl text-anchor mb-3">
            Selected Work
          </h2>
          <p className="text-ink/70 max-w-2xl mb-10">
            Proof of experience — and examples of the kind of problem we can
            help solve.
          </p>

          <div className="flex items-center gap-3 mb-10 text-sm text-ink/60 font-display uppercase tracking-wide flex-wrap">
            <span>Worked with:</span>
            <span>NICE</span>
            <span>&middot;</span>
            <span>Central Alabama Water</span>
            <span>&middot;</span>
            <span>Bib &amp; Tucker Sew-Op</span>
            <span>&middot;</span>
            <span>Birmingham History Center</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>

          <div className="rounded-xl border border-ink/10 bg-white/40 p-6 sm:p-8">
            <h3 className="font-display uppercase tracking-wide text-anchor mb-2">
              A few other things we&rsquo;ve worked on.
            </h3>
            <p className="text-ink/70 mb-4">
              Refugee services. Clean water. Public transportation. Museums.
              Environmental causes. Fundraising campaigns. Community
              initiatives. Events. Websites.
            </p>
            <PillButton href="/work" variant="outline-dark">
              See More Work
            </PillButton>
          </div>
        </div>
      </section>

      {/* MEET MAX */}
      <section id="meet-max" className="bg-anchor text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-full rounded-xl overflow-hidden">
            <Image
              src="/images/meet-max.jpg"
              alt="Max Rykov hosting an event on stage"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl mb-2">
              Meet Max
            </h2>
            <h3 className="font-display text-xl text-accent mb-6">
              The person behind the work.
            </h3>
            <div className="space-y-4 text-white/90 mb-6">
              <p>
                Max Rykov has spent more than a decade working at the
                intersection of fundraising, communications, community
                engagement, and creative strategy.
              </p>
              <p>
                He&rsquo;s worked with nonprofits, government agencies,
                businesses, universities, and community organizations —
                helping them raise money, tell better stories, engage their
                audiences, and make things happen.
              </p>
              <p>Sometimes that means strategy.</p>
              <p>Sometimes it means writing.</p>
              <p>Sometimes it means building a campaign.</p>
              <p>Sometimes it means getting on stage and hosting the thing.</p>
              <p>He&rsquo;s also America&rsquo;s only freelance quarterback.</p>
            </div>

            <div className="mb-6">
              <YouTubeEmbed videoId="REPLACE_ME" title="Max Rykov — America's Only Freelance Quarterback" />
            </div>

            <p className="font-display uppercase mb-1">The work changes. The question doesn&rsquo;t:</p>
            <p className="font-display text-2xl text-accent mb-8">
              How do we get people to care?
            </p>
            <PillButton href="/start" variant="accent">
              Meet Max
            </PillButton>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-accent text-anchor">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display font-bold uppercase text-3xl sm:text-5xl mb-8">
            Let&rsquo;s Make Something Happen.
          </h2>
          <div className="space-y-4 text-lg mb-10">
            <p>Got a project? A problem? A half-baked idea?</p>
            <p className="font-display uppercase text-xl">Tell us about it.</p>
            <p>
              You don&rsquo;t need to have the perfect brief. You don&rsquo;t
              even need to know exactly what you need yet.
            </p>
            <p>
              Tell us what you&rsquo;re trying to accomplish, what&rsquo;s
              getting in the way, and what you&rsquo;ve got in mind.
            </p>
            <p className="font-display">We&rsquo;ll take it from there.</p>
          </div>
          <PillButton href="/start" variant="outline-dark">
            Start a Project
          </PillButton>
        </div>
      </section>
    </>
  );
}
