# OddGood Events — Website

## What This Is

The marketing site for **OddGood Events**, Max Rykov's interactive events
business in Birmingham, Alabama (game shows, custom events, creative
campaigns, emceeing). It replaces maxrykov.com. Tagline: *Real Meaningful Fun.*

The full build brief is in `docs/oddgood-site-brief.md` — read it before
building any page. It has the exact copy, colors, contrast rules, sitemap,
and launch checklist. Use the brief's copy as written (Max tightens it later).

An earlier version of this repo was a maxrykov.com redesign (maroon/gold,
Poppins). Nothing from that build remains.

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
- Fonts: Fraunces (display, `.font-display`) + Poppins (body, Max's pick on 2026-10-15; it matches the old maxrykov.com headings). DM Sans was the first pick and was
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
- **Experiences** (`content/experiences.json`), as Max revised it on 2026-10-15:
  four unnumbered cards with no prices (Custom Game Show, Fully Customized
  Experience, Emcee & Event Hosting, Creative Campaigns). Every card button is
  a red "Book a Call"; Emcee and Campaigns also get a small text link to their
  page. The Hosted Game Show tier and the comparison table were removed.
  Pricing lives only in the FAQ "How much does it cost?" ($2,000–$5,000 for
  events, emcee from $100/hr, 50/50 deposit). Two FAQ answers still show a
  [CONFIRM] tag.
- **Booking is the one call to action.** Max dropped the separate Plan an
  Event page (redundant with Book a Call): the nav button reads "Let's Work
  Together" and goes to /book, and /plan, /start and /contact redirect to
  /book. Use a single "Book a Call" button rather than adding a second CTA.
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
- **Emcee** (`/emcee`, `content/emcee.json`): an experiment Max asked for, with
  a hero video (`public/video/emcee-hero-v2.mp4`, the Tall Bike Joust hosting
  reel). It's 1600px wide, 30fps, color-boosted, 2.7 MB with sound, and has a
  poster frame at 6.4s. It plays silently on a loop with no buttons (Max removed the sound and pause controls on 2026-10-21; the audio track is stripped)
  (`components/HeroVideo.tsx`); reduced motion shows the poster. The page also
  has all four testimonials, "Where Max can help" chips, and a closing booking
  CTA. The brief's side-by-side Calendly + emcee form is not built yet; the
  buttons go to /book?type=host. The original video is
  `Downloads/TBJ Short.mp4` (69 MB, 1080p60).
- **Campaigns** (`content/campaigns.json`): the brief's hero and three
  offering cards, then the Campaign for Clean Water story copied from
  maxrykov.com/water (three phases, the label quote, stat blocks taken from
  that page's text). Photos are in `public/images/campaigns/`.
- **Work cards** (Home and /work) show only the photo and title; no
  organization or subtitle (Max's call). Subtitles remain on event pages.
- **About** (`content/about.json`): Max's own copy, with inline teal links (freelance quarterback video, otherfoundationbham.org). The photo is cropped from his red-blazer stage shot and has a yellow offset block.
- Images: `public/images/source/INVENTORY.md` lists everything pulled from
  maxrykov.com. The originals are gitignored (~51 MB); web-sized copies of
  the ones in use are in `public/images/`.

- **Work**: six events in `content/projects.json` (typed in `lib/projects.ts`),
  in Max's order: The Fountys, Recycled Runway, Why'd They Do That?!, Can You
  Repeat That?, The Other Awards, Romantically Challenged. Text and photos for
  the first four are copied from the old maxrykov.com pages (keep that wording);
  WTDT uses Max's own description; Romantically Challenged's description is a
  [CONFIRM] placeholder. Home and `/work` show cards (`ProjectCard`) with **no
  organization names** — those live only on each `/work/[slug]` page (Max's
  call). Event photos are in `public/images/work/<slug>-N.jpg`.
- **NICE ("Growing an Organization") is dropped from the site** at Max's
  request — don't add it back. Clean Water and The Other Foundation are off the
  Work page for now (likely belong on Campaigns).
- `next.config.ts` redirects old maxrykov.com paths (/fountys, /runway, ...)
  and the earlier redesign's case-study URLs.
- **Home hero** (2026-10-22): Max wants the headline, photo/video, intro AND both buttons on the first screen. Phones: headline, then a full-width 16:9 frame (`hero.imageMobile`, its own crop), then intro + buttons, with sizes tuned to fit 393x660 and 440x700 viewports. Desktop: text left; a 4:5 frame on the right (`hero.image`) capped to the window height, with a smaller headline on short screens. A hero video needs 16:9 for phones and 4:5 for desktop (two exports). Desktop now plays `public/video/home-hero-desktop-slide.mp4` (2026-10-24: Max's Canva stills on red, each pushing in from the right and holding ~1.2s, ending with his Odd/Good clip, 17s loop, 2.1 MB, built by script. Max tried a continuous no-hold filmstrip (`home-hero-desktop-strip.mp4`, in git history) and found it too fast even at 1.5s per photo, so he went back to this one; the previous Canva video `home-hero-desktop-final.mp4` is in git history) via `HeroVideo` with `media="(min-width: 768px)"`, so phones never download it. Phones play `public/video/home-hero-phone-final.mp4` (from Max's 1620x1080 3:2 export, scaled to 1200 wide, 1.2 MB) with `media="(max-width: 767px)"`; the phone frame is 3:2 on large phones and 16:9 otherwise (object-cover trims the 16:9 case). The hero photos were retired.
- **Home "Trusted by" ticker** after Selected work (`components/og/Marquee.tsx`, `content/home.json` → `trustedBy`): Max's list of 12 organizations; it has a pause button and is static for reduced motion. The About page no longer lists organizations (Max removed it on 2026-10-21).
- **Home testimonials** after How it works: `TestimonialCarousel` (Zulfat and Jackie) with Max's honoree photo on the right (`content/home.json` → `testimonials`).

## Live Site

**Max's standing instruction (2026-10-20): publish every update to the public
site.** After a change is built and checked, push it to `oddgood-redesign` and
fast-forward `main` to it; there's no need to ask first.

**Live at https://www.oddgoodevents.com** (since 2026-10-20). The domain is registered at WordPress.com, with DNS records there: A `@` → 216.198.79.1 and CNAME `www` → Vercel. The bare domain 308-redirects to www. maxrykovsite.vercel.app still works.

First published to production (`main` → https://maxrykovsite.vercel.app) on
2026-10-15 so Max can share it for feedback. The `oddgood-redesign` preview
is behind Vercel login. Unfinished bits are hidden on the public site, not
shown as notes: FAQ items with `a: null`, a project's `descriptionPlaceholder`,
the footer/booking email (until `emailConfirmed: true` in `content/site.json`),
and social links (until `confirmed`). Book a Call step 2 says "Online
scheduling is coming soon" until the Calendly links are added.

Email: hello@oddgoodevents.com is WordPress.com Professional Email (Titan MX/SPF records; don't touch them). Resend is verified for oddgoodevents.com (records `resend._domainkey`, `rsend`, `send`), and the Vercel env vars are set. Lead emails come from "OddGood Website <noreply@oddgoodevents.com>". A live test on 2026-10-20 arrived.

Calendly: Max is on the free plan (one event type), so both call types open https://calendly.com/hello-oddgoodevents/30min ("OddGood Events Intro Call", 30 min), connected to his Google Calendar. The site lists both as 30-minute calls.

## Open [CONFIRM] Items

Max portrait, contact email (`hello@oddgoodevents.com` placeholder in
`content/site.json`), Instagram/LinkedIn handles (hidden until
`confirmed: true`), Resend account, prices, "Most booked"
tag, domain, FAQ answers. Max may add more images later — use labeled
placeholders until then.

## Notes for Claude

- **User is non-technical.** Explain steps clearly. Prefer simple, working
  solutions over clever ones.
- Don't invent stats, clients, or testimonials. Use `[CONFIRM]` placeholders.
- Button labels are actions (Plan an Event, Book a Call, ...). Never "Learn More".
- Review changes on a Vercel Preview (push a branch) before merging to `main`,
  which deploys to production.
