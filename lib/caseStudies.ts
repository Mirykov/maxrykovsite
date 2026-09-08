export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  hook: string;
  image?: string;
  challenge: string;
  // DRAFT copy below — Max should replace with his own strategic read before launch.
  // These are placeholders written from the surrounding facts, not published facts themselves.
  insightLabel: "The Insight" | "The Idea";
  insight: string;
  work: string;
  result: string;
  biggerIdea: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nice",
    title: "Growing an Organization",
    client: "Nashville International Center for Empowerment (NICE)",
    hook: "Refugee and Immigrant Services",
    image: "/images/case-nice.jpg",
    challenge:
      "As Director of Development & Communications (2021–2025), Max needed to expand NICE's fundraising capacity and build public understanding of refugee and immigrant needs in Middle Tennessee — including through the Afghan and Ukrainian resettlement surges.",
    insightLabel: "The Insight",
    insight:
      "DRAFT — replace with Max's own read: During the resettlement surges, refugees were mostly a headline — an abstract, sometimes politicized, topic. The fundraising and communications problem wasn't a lack of awareness, it was a lack of local, personal specificity. Donors in Middle Tennessee needed to see refugees as their new neighbors before a dollar ask would land.",
    work: "Expanded the grants strategy. Refined individual and corporate giving programs. Upgraded marketing and communications. Used storytelling to reshape how Middle Tennessee talked about refugees and immigrants.",
    result:
      "Annual budget grew from $2.9M (2021) to $11.4M (2025) — a 4× increase. 1,000+ new donors acquired. Increased volunteer support.",
    biggerIdea:
      "Growing an organization isn't just about asking more people for more money. It's about giving people a compelling reason to believe in where the organization is going — and making it easier for them to come along.",
  },
  {
    slug: "clean-water",
    title: "Campaign for Clean Water",
    client: "Central Alabama Water + Alabama Rivers Alliance",
    hook: "Water Conservation & Stewardship",
    image: "/images/case-clean-water.jpg",
    challenge:
      "During a severe drought, Birmingham's water authority needed to mobilize public engagement around water conservation and stewardship of Lake Purdy, the city's primary drinking water source.",
    insightLabel: "The Insight",
    insight:
      "DRAFT — replace with Max's own read: Conservation messaging usually asks people to feel worried or guilty — an approach that fatigues fast. The sharper move was to make the problem and the fix physical: turning trash pulled from the lake into sculpture and keepsakes gave supporters something to hold, not just another statistic about a drought.",
    work: "A three-phase campaign: organized a Lake Purdy cleanup that removed thousands of pounds of trash; partnered with UAB art students to turn the collected debris into metal sculptures, presented to riverkeeper leaders at an Alabama Rivers Alliance fundraiser; and created a set of upcycled wine bottles, sold and auctioned with all proceeds benefiting the riverkeeper organizations.",
    result:
      "100+ volunteers mobilized. Thousands of pounds of trash removed from Lake Purdy. 20 commemorative bottles auctioned, with 100% of proceeds donated to Alabama's riverkeeper organizations.",
    biggerIdea:
      "Advocacy doesn't have to sound like advocacy. The strongest campaigns give people something they can understand, care about, and actually do.",
  },
  {
    slug: "recycled-runway",
    title: "Recycled Runway",
    client: "Bib & Tucker Sew-Op",
    hook: "Sustainable Fashion Fundraiser",
    image: "/images/case-recycled-runway.jpg",
    challenge:
      "Bib & Tucker Sew-Op needed a new fundraising event that could engage the public while showing off what its sewing-education and sustainability mission actually does for Birmingham's textile community.",
    insightLabel: "The Idea",
    insight:
      "DRAFT — replace with Max's own read: A lecture on sustainable sewing wasn't going to fill a room. But a live competition — mystery boxes, a ticking clock, real models on a runway — gave people a reason to show up for the entertainment first, and let the mission's actual skill speak for itself in front of them instead of being explained to them.",
    work: "Conceived and produced a three-year signature fundraising event: teams paired with local seamstresses and models, working from mystery boxes of garments under a 90-minute design-and-construction constraint, culminating in a runway show judged by local style influencers.",
    result: "$50,000+ raised. 700+ attendees per event. 50+ participants annually. Three years running.",
    biggerIdea:
      "Sometimes the best way to get people to care about a mission is to give them an experience they genuinely want to be part of.",
  },
  {
    slug: "birmingham-history-center",
    title: "Can You Repeat That?",
    client: "Birmingham History Center",
    hook: "Live Game Show",
    image: "/images/case-birmingham-history.jpg",
    challenge:
      "The Birmingham History Center needed to generate enthusiasm — and financial support — for its mission of preserving artifacts and stories from Birmingham's history.",
    insightLabel: "The Idea",
    insight:
      "DRAFT — replace with Max's own read: History organizations tend to ask supporters to care about the past in the abstract. The sharper move was to make Birmingham's own recognizable personalities — a meteorologist, a chef, its mayors — the subject of the trivia, so the audience wasn't learning history from a stranger, they were watching people they already trust get tested on it.",
    work: "Wrote, produced, and hosted a live game show at the Virginia Samford Theater, featuring local personalities including meteorologist James Spann, chef Frank Stitt, and former and current Birmingham mayors.",
    result: "Sold out: 312+ attendees, 14 contestants, $10,000+ in ticket revenue.",
    biggerIdea:
      "When an audience gets to participate instead of simply watch, an event becomes an experience — and experiences are much harder to forget.",
  },
  {
    slug: "the-other-foundation",
    title: "The Other Foundation",
    client: "The Other Foundation",
    hook: "A New Approach to Community Philanthropy",
    challenge:
      "Traditional philanthropy can be exclusive and opaque — Max saw an opportunity to build a funding model for Birmingham that was more accessible, transparent, and community-driven.",
    insightLabel: "The Idea",
    insight:
      "DRAFT — replace with Max's own read: Most giving circles route money to whichever cause a wealthy few decide matters. The idea here was to flip who holds the power: keep the buy-in low enough that ordinary people could join the room, and let members vote on winners directly — including individuals and unregistered groups that traditional grantmaking structures would automatically screen out.",
    work: "Designed a donor-collective giving circle: members contribute $100/month, and the collective awards microgrants each month — including to community-led groups and individuals without 501(c)(3) status.",
    result:
      "A running monthly giving circle in Birmingham, awarding $1,000–$3,000 in microgrants each month to community-led initiatives.",
    biggerIdea:
      "Philanthropy doesn't have to be complicated, intimidating, or reserved for people with enormous checkbooks. Sometimes the best way to get more people involved is to make participation simple, democratic, and a little more fun.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
