# OddGood Events — Website

## What This Is

The marketing site for **OddGood Events**, Max Rykov's interactive events
business in Birmingham, Alabama (game shows, custom events, creative
campaigns, emceeing). It replaces maxrykov.com. Tagline: *Real Meaningful Fun.*

The full build brief is in `docs/oddgood-site-brief.md` — read it before
building any page. It has the exact copy, colors, contrast rules, sitemap,
and launch checklist. Use the brief's copy as written (Max tightens it later).

An earlier version of this repo was a maxrykov.com redesign (maroon/gold,
Poppins). `/work`, `/work/[slug]` and `/start` are still from that build and
will be replaced; their old color classes (`anchor`, `accent`, `paper`, ...)
are remapped to OddGood colors in `app/globals.css` until then.

## Tech Stack

Next.js 16 (App Router, TypeScript) + Tailwind CSS v4 + lucide-react +
Vercel Web Analytics. All pages statically rendered. Content lives in
`/content/*.json`.

## Brand (see brief §3)

- Tokens in `app/globals.css`: `og-red` #B11F25 (buttons/CTAs), `og-teal`
  #0097B2 (large text, fills), `og-teal-dark` #007A91 (small teal text),
  `og-yellow` #E1BA58 (burst, tags — never text on light bg), `og-ink`
  #161616, `og-cream` #FBF7F0 (page bg).
- On teal backgrounds use ink text, not white.
- Fonts: Fraunces (display, `.font-display`) + DM Sans (body). DM Sans was
  chosen over Nunito because Nunito is nearly the logo's "Good" face and
  would blur the logo's serif/rounded contrast.
- Wrap Fraunces headline text in `amp()` (`components/og/Amp.tsx`) so any
  "&" renders as a classic ampersand. Fraunces' default "&" looks like "@".
- `.eyebrow` = small letter-spaced caps label. `.on-dark` on a dark section
  switches focus rings to yellow.
- Logo: `public/brand/` — `oddgood-logo.svg` (rebuilt from Max's PNG:
  "Odd" is Fraunces Black and "EVENTS" is Montserrat, both converted to
  outlines; **"Good" is traced from the original PNG** because Max wants it
  to look exactly like the original and no font matched), `-white`, `oddgood-wordmark*.svg` (no "EVENTS"),
  `oddgood-mark.svg` (O + burst; also `app/icon.svg`, `app/apple-icon.png`).
  Original AI-generated PNG kept as `oddgood-logo.png` for reference.
- Components: `components/og/` (Button with buzzer-style primary, Burst,
  Logo, ComingSoon), `components/ImagePlaceholder.tsx` (solid brand block
  with a `[PHOTO: ...]` caption).

## Build Status

- **Home** built and approved (2026-10-14): Max chose the "Poster" direction
  (cream, split hero, teal "How it works" band) over a full-bleed dark-photo
  alternative. Keep new pages consistent with it. `components/home/HomePage.tsx`.
- **Experiences** built (`content/experiences.json`). The comparison-grid
  values and the "Optional" comedians on 02/03 are inferred from the brief's
  card contents — Max to confirm. Two FAQ answers show a [CONFIRM] tag.
- **Book a Call** (`/book`, `components/book/BookCall.tsx`): form-first flow
  Max chose (modeled on The Joy Collective's booking). Step 1 = call type +
  name + email → POST /api/inquiry (emails Max the lead) → step 2 = Calendly
  embed prefilled with name/email. Email failures never block booking.
  `/book?type=host|custom` preselects the call type. Calendly links go in
  `content/site.json` → `calendly`; while empty, a placeholder shows.
- **/api/inquiry** handles `book-call`, `plan`, and `emcee` (schemas in
  `lib/inquiry.ts`) with zod validation, honeypot (`website`), in-memory rate
  limit, and Resend. Env: `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`,
  `INQUIRY_FROM_EMAIL` (see `.env.example`).
- `/emcee`, `/campaigns`, `/about`, `/plan` are still `ComingSoon` stubs —
  Max is reviewing the site before those are built.
- Images: `public/images/source/INVENTORY.md` lists everything pulled from
  maxrykov.com. The originals are gitignored (~51 MB); web-sized copies of
  the ones in use are in `public/images/`.

- Featured work (Home), in Max's order: The Fountys, Recycled Runway, Why'd
  They Do That?!, Can You Repeat That?, The Other Awards. **NICE ("Growing an
  Organization") is dropped from the site** at Max's request — don't add it back.

## Open [CONFIRM] Items

Hero video, Max portrait, client logos
(permission), contact email (`hello@oddgoodevents.com` placeholder in
`content/site.json`), Instagram/LinkedIn handles (hidden until
`confirmed: true`), Calendly URLs, Resend account, prices, "Most booked"
tag, domain, FAQ answers. Max may add more images later — use labeled
placeholders until then.

## Notes for Claude

- **User is non-technical.** Explain steps clearly. Prefer simple, working
  solutions over clever ones.
- Don't invent stats, clients, or testimonials. Use `[CONFIRM]` placeholders.
- Button labels are actions (Plan an Event, Book a Call, ...). Never "Learn More".
- Review changes on a Vercel Preview (push a branch) before merging to `main`,
  which deploys to production.
