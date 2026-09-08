# Max Rykov — Website Redesign

## What This Is

A redesign of maxrykov.com (currently a plain single-column WordPress/WPBakery
site) as a new custom-built site, per a website redesign brief (v11) supplied
at project kickoff — not included in this repo. Max Rykov runs a small
creative studio doing fundraising, communications, community engagement, and
event/emcee work for mission-driven organizations.

This file is the build-state summary; the original brief has the full content
and design rationale (reference site: voteshift.com for the visual system).

## Tech Stack

Next.js (App Router, TypeScript) + Tailwind CSS v4 + lucide-react icons.
No database — the site is static/content-driven except the `/start` form,
which emails submissions via Resend.

## Brand

Colors pulled from the live maxrykov.com WordPress theme's inline styles:
- `--color-anchor` `#6b1e1b` — deep maroon, dark anchor (hero, Meet Max, footer accents)
- `--color-accent` `#f5c908` — gold, bright accent (buttons, headline highlights)
- `--color-navy` `#273b8a` — secondary section color (Philosophy band)
- `--color-teal` `#047083` — secondary section color (How We Work band)
- `--color-paper` `#faf6ef` — warm off-white body background
- Headline font: Poppins (matches the live site's heading font). Body font: Inter.

## Site Map

```
/                    Homepage — hero, philosophy, what we do, how we work,
                     selected work preview, meet max, final CTA
/work                Full selected-work index (all 5 case studies)
/work/[slug]         Dedicated case study page (nice, clean-water,
                     recycled-runway, birmingham-history-center,
                     the-other-foundation)
/start               Project intake form -> POST /api/start-project -> Resend
/api/start-project   API route, emails form submissions via Resend
```

Content data lives in `lib/caseStudies.ts` and `lib/services.ts`.

## Known Placeholders — Do Not Treat as Finished

- **Case study "Insight"/"Idea" sections** (`lib/caseStudies.ts`): drafted by
  Claude as a starting point per the brief's explicit instruction that these
  need Max's own strategic read, not invented facts. Each is prefixed
  `DRAFT — replace with Max's own read:` and rendered in italic on the case
  study page. Replace before launch.
- **Photos**: hero background, Meet Max photo, and 4 of 5 case study photos
  (NICE, Clean Water, Recycled Runway, Birmingham History Center) are real —
  pulled directly from the live maxrykov.com WordPress media library (Jetpack
  Photon CDN, resized via `?w=&quality=` query params) and stored in
  `public/images/`. **The Other Foundation** case study still uses
  `ImagePlaceholder` — no photo for it exists on the live site. Swap any of
  these for better/different photos by replacing the file in
  `public/images/` (same filename) or updating the `image` path in
  `lib/caseStudies.ts` / `app/page.tsx`.
- **"Freelance quarterback" YouTube video**: `YouTubeEmbed` component in
  `app/page.tsx` (Meet Max section) has `videoId="REPLACE_ME"` — swap in the
  real YouTube video ID.
- **Contact email**: `hello@maxrykov.com` is a placeholder used in `/start`
  and the API route's `from` address — confirm the real inbox/domain to use.

## Required Setup Before Going Live

- `.env.local` needs `RESEND_API_KEY` and `CONTACT_EMAIL` (see `.env.example`)
  for the `/start` form to actually send email. Without these, submissions
  fail gracefully with an error telling the visitor to email directly.
- Resend's `from` address (`noreply@maxrykov.com` in
  `app/api/start-project/route.ts`) requires that domain be verified in
  Resend — same setup pattern as the Other Foundation project.
- Repo is at github.com/Mirykov/maxrykovsite; Vercel deploy was initiated
  from the dashboard import flow — check Vercel for current live URL.

## Notes for Claude

- **User is non-technical.** Explain steps clearly. Prefer simple, working
  solutions over clever ones.
- Don't invent case-study metrics, client language, or outcomes — the facts
  in `lib/caseStudies.ts` (Challenge/Work/Result) are pulled from the live
  site and should be double-checked against the original record, not
  extended.
- The two-color "alternating full-bleed section background" rhythm from the
  brief is implemented via plain Tailwind background classes per `<section>`
  in `app/page.tsx` — keep new sections consistent with that pattern rather
  than introducing a new background treatment.
