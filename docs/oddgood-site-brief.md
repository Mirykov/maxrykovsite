# OddGood Events — Website Build Brief (for Claude Code)

> Read this whole file before writing code. Build the **Home page first** and stop for Max's review before building the rest. Where a decision is marked **[CONFIRM]**, use the stated default and list it in your summary so Max can change it.

---

## 0. What you're building

A new marketing site for **OddGood Events**, Max Rykov's interactive events business in Birmingham, Alabama. It replaces the current maxrykov.com.

**One-sentence brand:** OddGood Events creates participatory experiences (game shows, custom events, creative campaigns, and emceeing) that use humor and collective ridiculousness to bring people together.

**Tagline:** Real Meaningful Fun.

**The visitor should leave thinking:** "This is the person who makes fun, unusual events. We need him for our next company party or fundraiser."

**Every page has one job and one next step.** Let photos, video, and testimonials do the persuading, not extra paragraphs.

---

## 1. Decisions and defaults

| Decision | Default to use | Status |
| --- | --- | --- |
| Name styling | **OddGood Events** in text (one word, both capitals). Never "Odd Good" or "Oddgood." The logo is set; see §3a. | Decided |
| Platform | **Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel.** Statically render every page. Keep content (copy, services, testimonials, projects) in Markdown/JSON files under `/content` so it's easy to edit later. Use `next/image` for all photos and `next/font` for fonts. | Decided |
| Forms | A Next.js Route Handler (`/app/api/inquiry/route.ts`) that validates input (zod) and emails Max via **Resend**. API key and recipient address go in Vercel environment variables (`RESEND_API_KEY`, `INQUIRY_TO_EMAIL`), with an `.env.example`. Add a spam honeypot field and basic rate limiting. One handler serves both the /plan form and the emcee form, tagged by `formType`. | [CONFIRM] Resend account. Fallback if Max prefers no-code: Formspree. |
| Scheduler | **Calendly** inline embed. Two event types: "Emcee availability · 15 min" and "Plan something custom · 30 min." Use placeholder URLs until Max provides real ones. | [CONFIRM] |
| Domain | oddgoodevents.com. Redirect old maxrykov.com URLs (see §8). | [CONFIRM] |
| Prices | Show "from" prices: $1,250 / $2,500 / $5,000. Emcee pricing: "Ask for a quote." | [CONFIRM] |
| Analytics | Vercel Web Analytics (privacy-friendly, no cookie banner needed). | [CONFIRM] |
| Repo + deploys | GitHub repo connected to Vercel: every push gets a Preview URL for Max to review; `main` deploys to production. | Decided |

---

## 2. Assets

### 2a. Pull existing images from maxrykov.com

The current site is WordPress. Crawl these pages and download every content image at its largest available size (WordPress `wp-content/uploads` originals, not `?fit=` thumbnails) into `/public/images/source/`:

- https://maxrykov.com/
- https://maxrykov.com/work/
- https://maxrykov.com/nice/
- https://maxrykov.com/runway/
- https://maxrykov.com/water/
- https://maxrykov.com/history
- https://maxrykov.com/fountys
- https://maxrykov.com/otherawards
- https://maxrykov.com/otherfoundation/
- https://maxrykov.com/contact/

Known images so far:
- https://maxrykov.com/wp-content/uploads/2026/05/What-I-Do-Images.png
- https://maxrykov.com/wp-content/uploads/2026/05/What-I-Do-Images-2.png
- https://maxrykov.com/wp-content/uploads/2026/05/What-I-Do-Images-3.png

Then write `/public/images/source/INVENTORY.md`, a table with: filename · source page · what it shows (look at each image) · suggested use on the new site · quality (OK for hero / card only / don't use). Flag gaps (see 2b).

### 2b. Additional assets Max will provide (use labeled placeholders until then)

- Hero video loop (10–20 sec, no sound) of audiences laughing and playing. **Highest priority.**
- Max on stage hosting (2–3 photos).
- Crowd reaction shots from *Why'd They Do That?!*, Can You Repeat That?, and Recycled Runway.
- One portrait of Max for About.
- Client logos: Birmingham History Center, Space One Eleven, Bib & Tucker Sew-Op, Central Alabama Water, Birmingham Education Foundation. **[CONFIRM permission]**
- OddGood logo: **provided** (`oddgood-logo.png`). See §3a for rebuilding it as SVG.

Placeholder style: a solid brand-color block with a caption like `[PHOTO: Max on stage, wide]`. Never use stock photos of corporate meetings.

---

## 3. Visual direction

**Feel:** playful but credible. Think "smart comedy show poster" rather than "kids' party" or "corporate consultancy." There should be lots of real faces mid-laugh.

### 3a. Logo (approved)

File: `oddgood-logo.png` (provided by Max; put it in `/public/brand/`). It's a transparent PNG:
- **"Odd"**: a heavy, quirky old-style serif in brand red, with **three short yellow "burst" lines** above the top-left of the "O"
- **"Good"**: a rounded, geometric bold sans in brand teal
- **"EVENTS"**: small, widely letter-spaced caps in near-black, centered underneath

The supplied PNG is AI-generated and has rough edges and color fringing. **Rebuild it as a clean SVG** (`/public/brand/oddgood-logo.svg`) that matches the original closely:
- Use real fonts for the letters (closest free matches: Fraunces Black or a Recoleta/Cooper-style heavy serif for "Odd"; Nunito Black or Quicksand Bold for "Good"; Montserrat or DM Sans for "EVENTS").
- Draw the burst as three rounded strokes.
- Add a little more space between "Odd" and "Good" than the original (the "d" and "G" nearly touch).
- Convert text to outlines in the final SVG so it doesn't depend on loaded fonts.

Show Max the rebuilt SVG beside the original for approval. Also produce:
- `oddgood-logo-white.svg`: an all-white version for dark backgrounds and photos
- `oddgood-mark.svg`: just the "O" with the yellow burst, as a square icon for favicon, Apple touch icon, social avatar, and Open Graph image
- Wordmark-only (no "EVENTS") for the compact mobile header

### 3b. Brand colors (exact)

| Token | Hex | Role |
| --- | --- | --- |
| `--og-red` | **#B11F25** | "Odd." **Primary buttons and main CTAs** (white text on red passes AA at 6.8:1). Key accents. |
| `--og-teal` | **#0097B2** | "Good." Large headlines, icons, illustrations, section backgrounds, card borders. |
| `--og-yellow` | **#E1BA58** | The burst. Highlights, tags ("Most booked"), underlines, stat numbers on dark backgrounds, playful accents. |
| `--og-ink` | #161616 | Body text, "EVENTS," dark sections. |
| `--og-cream` | #FBF7F0 | Default page background (warmer than pure white). |
| `--og-teal-dark` | #007A91 | Derived for accessibility: teal **links and small text** on light backgrounds (5.0:1). |

Contrast rules (these are checked; follow them):
- **Teal #0097B2 is only 3.5:1 on white**, so use it for large text (24px+ or 19px+ bold), icons, and fills, not body copy or small links. Use `--og-teal-dark` for small teal text.
- **On a teal background, use ink text (5.2:1), not white (3.5:1).**
- **Yellow #E1BA58 never carries text on light backgrounds** (1.9:1). Ink text *on* yellow is excellent (9.8:1), so yellow tags and buttons get ink text.
- Red buttons: white text. Never red text on teal or teal text on red.

Balance: mostly cream and ink with photos carrying the energy; red for actions, teal for structure, yellow as the occasional spark. One section per page can go full-color (a teal or ink band).

### 3c. Type

Echo the logo: a characterful serif for display and a friendly sans for reading.
- **Display / H1–H2:** Fraunces (heavy weight, slight softness), via `next/font/google`.
- **Body and UI:** Nunito or DM Sans (pick whichever pairs better and say why).
- **Small caps labels** (eyebrows, "01 · Hosted Game Show"): the body sans, uppercase, letter-spaced like "EVENTS" in the logo.

### 3d. Motifs and components

- **The yellow burst** is the brand's signature. Reuse it sparingly: beside a key headline word, on the "Most booked" tag, on the hover state of the main CTA, and as a subtle animation when a form submits. Respect `prefers-reduced-motion`.
- **Game-show cues:** numbered cards (01, 02, 03), a buzzer-style primary button, scorecard-style stat blocks. Use them lightly.
- **Components:** service card, project card, testimonial card, CTA band, stat block, FAQ accordion, inquiry form, scheduler block.

Accessibility: WCAG AA contrast (see 3b), visible focus states (a yellow focus ring on dark, a teal-dark ring on light), keyboard navigation, labels on every form field, descriptive alt text from the inventory. Mobile-first.

---

## 4. Reference: The Joy Collective (https://www.thejoycollectivemedia.com/)

Open the homepage and https://www.thejoycollectivemedia.com/book in a browser and take screenshots for reference. **Borrow the structure and clarity, not the wording, colors, or exact layout.**

Patterns to borrow:

1. **Numbered service cards in a row.** Each card has: number (01) · offer name · "For…" line · 2–3 included items · price line ("from $2,500") · one action button. Tag one card as **"Most booked."** Cards stack on mobile.
2. **A comparison grid under the cards** (for the three show tiers only). Rows: Live hosting · Questions written for you · Original format · Custom event concept · Planning calls · Add-on comedians. Cells say "Included," "Optional," or "—".
3. **A dedicated booking page (/book)** with almost nothing on it: one headline, one reassuring line, the embedded scheduler. Their line is "a diagnosis, not a pitch." Ours (below) is different but serves the same purpose.
4. **The same main CTA repeated** after nearly every section, always with action words, never "Learn More."
5. **A "You're in the right place if…" checklist** before the final CTA.
6. **FAQ near the bottom** of Experiences, answering real booking questions.
7. **Simple 3-step process** ("How it works").

---

## 5. Sitemap and navigation

| Page | URL | Job | Primary CTA |
| --- | --- | --- | --- |
| Home | / | Show the promise, route visitors by need | Plan an Event |
| Experiences | /experiences | Menu of bookable shows and events, with prices | Book a Call |
| Emcee | /emcee | Book Max to host an existing event | Check Emcee Availability |
| Creative Campaigns | /campaigns | Playful campaigns for nonprofits | Talk About a Campaign |
| Selected Work | /work | Proof | Start a Project |
| About | /about | Max and the collaborator model, briefly | Plan an Event |
| Plan an Event | /plan | Inquiry form | Send |
| Book a Call | /book | Scheduler | (book a time) |

**Nav:** Experiences · Emcee · Campaigns · Work · About · **[Plan an Event]** (button style, always visible; sticky on mobile).

**Footer:** wordmark + tagline · nav links · "Based in Birmingham, Alabama" · email [CONFIRM] · Instagram/LinkedIn [CONFIRM handles] · "Book a call" link.

---

## 6. Page-by-page content

Use this copy as written. It's draft copy Max will tighten later, so don't rewrite it. You may trim for layout, but note any trims.

### 6.1 Home

**Hero**
- Eyebrow: ODDGOOD EVENTS · REAL MEANINGFUL FUN.
- H1: We create unique events that get people laughing, participating, and connecting.
- Sub: From company parties that break the usual mold to nonprofit fundraisers people actually remember, we make gatherings worth showing up for.
- Buttons: [Explore Experiences] [Plan an Event]
- Visual: hero video loop (placeholder until provided).

**Logo strip:** "Trusted by" + client logos (placeholder boxes until confirmed).

**Choose your kind of fun:** three cards.
1. **Interactive Events & Game Shows.** For companies, nonprofits, and conferences. Hosted game shows and original activities that get the room involved, not just watching. → [Explore Experiences]
2. **Emcee & Event Hosting.** For events that already have a plan. Professional hosting from Max, with wit, warmth, and the experience to keep the program moving. → [Book Max as Emcee]
3. **Creative Campaigns.** Especially for nonprofits and community causes. Unexpected campaign ideas that help a cause stand out and invite people to take part. → [Explore Creative Campaigns]

**The problem** (short, one strong image)
- H2: Another dinner and a few speeches?
- There's nothing wrong with a traditional event. But if you want people to participate, connect, and remember the experience, there are more interesting ways to do it.

**Selected work:** 4 image-led cards: *Why'd They Do That?!* · Recycled Runway · Can You Repeat That? · The Fountys. → [See Selected Work]

**How it works:** 3 numbered steps.
1. **Tell us what you're planning.** Share the occasion, audience, goals, date, and budget if known.
2. **Shape the right idea.** We recommend an existing format or develop a custom approach.
3. **Make it happen.** Max leads and brings in collaborators when the project needs them.
→ [Let's Plan Something]

**Testimonial:** one featured quote (Zulfat Suara), large.

**Closing CTA band**
- H2: Your event can be the one people talk about afterward.
- Tell us what you're planning. We'll figure out the most interesting way to bring it to life.
- [Plan an Event] [Book a Call]

### 6.2 Experiences (the Joy Collective–style menu)

- H1: Your event. Less predictable.
- Sub: From ready-to-go game shows to fully original experiences, we make it easier for people to participate, and harder for them to forget the event.

**Numbered service cards**

| # | Name | For… | Includes | Price | Tag | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Hosted Game Show | Groups that want a ready-to-go interactive centerpiece | ~80-minute hosted show (*Why'd They Do That?!* format) · prep + one planning call · add comedians from the original show for $200 each | from $1,250 | — | Book a Call |
| 02 | Custom Game Show | Organizations that want a show that feels like theirs | Original format · custom rounds, organizational trivia, inside jokes · planning + live hosting | from $2,500 | Most booked [CONFIRM] | Book a Call |
| 03 | Fully Customized Experience | Events that need a bigger idea | Original concept + event design · tailored activities · creative planning, coordination, hosting · collaborators as needed | from $5,000 | — | Book a Call |
| 04 | Emcee & Event Hosting | Organizers who already have the event planned | A sharp, warm, professional host who keeps things moving | Ask for a quote | — | Check Emcee Availability → /emcee |

Under the cards: "Final scope, travel, AV, production, and optional performers may affect the quote."

**Comparison grid** for 01–03 (see §4.2).

**You're in the right place if…**
- Your last event was "fine," and you want more than fine.
- You want people participating, not just watching.
- You'd like the event to say something about your team or your mission.
- You want one creative lead who handles it start to finish.

**FAQ** (accordion; content from Max's pricing doc)
- *Do you bring AV?* If your venue has a suitable setup, there's no equipment charge. If not, rental and delivery are quoted separately and added only with your approval before booking.
- *How does payment work?* 50% deposit to reserve your date and start creative work; the remaining 50% is due after the event.
- *Do you travel?* Yes. Travel outside the Birmingham area is discussed and approved in advance.
- *How far ahead should we book?* [CONFIRM: Max to answer]
- *How big a group can you handle?* [CONFIRM: Max to answer]

**Page CTA:** Not sure what fits? Tell us about the event. [Book a Call] [Plan an Event]

### 6.3 Emcee

- H1: A good event needs a good host.
- Sub: Max brings humor, energy, and professionalism to the stage, keeping the program moving and the audience engaged.
- Buttons: [Check Availability] [Ask About Your Event]
- Visual: hosting reel or strong stage photo.

**Testimonials, near the top** (cards or carousel; keep wording and attribution exactly):

> "I have had the honor of attending several events where Max was the emcee. Not everyone can do what he does so effortlessly. His energy, his humor, and passion always brings each room to life. He is very skilled at making everyone engaged and energized."
> — Zulfat Suara, Metro Nashville Council Member

> "I chose Max for our city council forum because I had seen him emcee other events and was impressed with his quick wit, intelligence, and enthusiasm. He did not disappoint! He brought a perfect amount of humor while leading a respectful discussion between the candidates."
> — Elizabeth Sanfelippo, Neighborhood President

> "His wit, charm, and poignancy is unmatched and I could not imagine hosting an event like ours without such a titan."
> — Jackie Miller, Athletic Alabama

> "He hosts with an approachable eloquence, an acute wit and effortless charm. But what truly stood out and surprised me was how much detail, care and customization he brought to the big day. He asked all about our relationship, our tastes, our beliefs, and used our answers to create a ceremony that was beautifully specific, subtly hilarious and even involved our friends and family in clever ways. Everyone went out of their way to tell me how much they loved the ceremony."
> — Bryson Schmidt, Groom

**Where Max can help** (chips): Fundraisers · Conferences · Festivals · Sporting events · Game shows · Team-building events · Ceremonies · Weddings

**Easy booking**
- H2: Already have the event planned? Let's get you a great host.
- Send the date, location, event type, audience size, and a little about the program. Max will follow up about availability and fit.
- Two side-by-side options (stacked on mobile):
  - **Pick a time:** Calendly embed, "Emcee availability · 15 min."
  - **Or send details:** form with Name · Email · Organization · Event date · Location · Event type · Approximate audience size · What should the host know? · Budget (optional).

### 6.4 Creative Campaigns

- H1: Good causes deserve more interesting campaigns.
- Sub: We develop creative marketing and engagement campaigns that help nonprofits earn attention, invite participation, and give people a memorable way to support the mission.

Three cards:
1. **Campaign Concepts.** For a cause that needs to cut through the noise. Find a surprising, shareable idea that makes people curious enough to pay attention.
2. **Fundraising & Participation.** For organizations that want people to do more than donate and leave. Participatory campaigns and event concepts that give supporters a role in the story.
3. **Campaign Creative & Execution.** For teams that need help bringing the idea to life. Build the plan and coordinate the right creative partners across messaging, design, video, digital, and events.

Proof: Campaign for Clean Water and Recycled Runway case-study cards.

CTA band: Have a cause worth getting people excited about? [Talk About a Campaign] → /book

### 6.5 Selected Work

- H1: Different challenges. Unexpected ideas. Real people getting involved.
- Our work spans interactive events, creative campaigns, and community experiences. The common thread is finding a more interesting way to get people to care, participate, or connect.

Filterable grid (All · Game Shows · Events · Campaigns):

| Project | Client | Filter | Verified facts to show |
| --- | --- | --- | --- |
| Why'd They Do That?! | Saturn Birmingham | Game Shows | Comedy game show about life and politics in Alabama. [CONFIRM stats] |
| Can You Repeat That? | Birmingham History Center | Game Shows | Birmingham history game show |
| The Fountys | Space One Eleven | Events | Art history awards show |
| The Other Awards | Birmingham Education Foundation | Events | Celebrating unsung heroes |
| Recycled Runway | Bib & Tucker Sew-Op | Events, Campaigns | $50k+ raised · 700+ attendees · 50+ [CONFIRM label from current /runway page] |
| Campaign for Clean Water | Central Alabama Water + Alabama Rivers Alliance | Campaigns | Creative environmental advocacy |
| The Other Foundation | Community grant program | Campaigns | A participatory model of local philanthropy |

**Case-study template** (one page per project, reuse existing copy from the matching maxrykov.com page): hero image · client · Challenge (1–2 sentences) · The Idea (1–2 sentences) · Max's role and collaborators · Verified result as a stat block (only documented numbers) · photo gallery · CTA "Want something like this?" [Discuss a Similar Project].

### 6.6 About

- H1: Good ideas. Odd approaches. Meaningful results.
- OddGood Events is led by Max Rykov, a creative thinker, event host, and community engagement professional. With more than 13 years of experience across events, fundraising, communications, and community engagement, Max understands both what organizations need to accomplish and how to get people interested enough to take part.
- Max leads each project and brings in the right collaborators when the idea calls for them: designers, filmmakers, developers, event professionals, and other specialists. Clients get direct creative leadership and a team shaped around the project.
- One portrait, one candid event photo, link to Selected Work. Keep it short.

### 6.7 Plan an Event (/plan)

- H1: Tell us what you're planning.
- A company party, a fundraiser, a conference, a campaign, or something you haven't quite figured out yet. Share what you know, and we'll work out the next step.
- Form: Name · Email · Organization (optional) · What are you interested in? (Game show / Custom event / Emcee / Creative campaign / Not sure yet) · Date or timeframe · Location · Approximate audience size · Budget range (optional, dropdown: Under $1,500 / $1,500–$3,000 / $3,000–$6,000 / $6,000+ / Not sure) · What would you like people to experience or accomplish?
- Beside the form: "Rather talk it through?" [Book a Call]
- Confirmation: Thanks for reaching out. We'll review the details and get back to you about next steps.

### 6.8 Book a Call (/book)

Minimal, like the Joy Collective's /book.
- H1: Book a call.
- Line: Pick a time that works. No pitch, no pressure. You'll leave knowing which option fits, or whether we're the right fit at all.
- Toggle between two Calendly event types: **"I need a host" (15 min)** · **"I want to create something custom" (30 min).** Show the meeting length on each.
- Small fallback link: "Prefer email? Send us the details." → /plan

---

## 7. Rules (don't break these)

- Don't lead with consulting services or a long capabilities list.
- Don't repeat "fun," "connection," and "memorable" in every section. Each section has its own job.
- Don't bury emcee booking or make it feel like a custom-project inquiry.
- Keep Campaigns to its own page plus one homepage card.
- Don't invent stats, clients, or testimonials. Use `[CONFIRM]` placeholders.
- Use action labels on buttons: Plan an Event · Explore Experiences · Check Emcee Availability · Book a Call · Talk About a Campaign · See Selected Work. Never "Learn More."
- No generic stock photography.

---

## 8. Launch checklist

- [ ] Permanent (308) redirects in `next.config` `redirects()` for old maxrykov.com URLs: /runway, /water, /history, /fountys, /otherawards, /otherfoundation, /nice → matching case studies (or /work) · /contact → /plan. If maxrykov.com is also pointed at this Vercel project, redirect the whole domain to oddgoodevents.com with paths preserved.
- [ ] Page titles and meta descriptions via the Next.js Metadata API (150–160 characters), `sitemap.ts`, `robots.ts`, and Open Graph images for link previews
- [ ] Vercel environment variables set for Production and Preview; test the form on a Preview deployment first
- [ ] Vercel Web Analytics turned on (one line: `<Analytics />` in the root layout) [CONFIRM]
- [ ] Favicon from the wordmark
- [ ] Forms tested end to end; confirmation emails go to Max
- [ ] Calendly links swapped from placeholders to real
- [ ] Every `[CONFIRM]` resolved
- [ ] Lighthouse: performance and accessibility ≥ 90 on mobile
- [ ] Hero video compressed (< 3 MB) with a poster image fallback

---

## 9. How to work

1. Crawl maxrykov.com, download images, write the inventory (§2a). Screenshot the Joy Collective reference pages (§4).
2. Set up the Next.js project, Tailwind design tokens, and the GitHub → Vercel connection. Build the **Home page** with real copy and the best available images.
3. **Stop.** Share the Vercel Preview URL for the Home page (two visual directions if possible, e.g. on `/` and `/home-b`) and list the open `[CONFIRM]` items.
4. After approval, build Experiences and /book next (the main booking path), then Emcee, then the rest.
