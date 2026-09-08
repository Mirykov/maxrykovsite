import type { LucideIcon } from "lucide-react";
import { HandCoins, MessagesSquare, Users, PartyPopper, Mic2 } from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  hook: string;
  intro: string;
  offerings: string[];
  closing: string;
  richTestimonials?: { quote: string; attribution: string }[];
};

export const services: Service[] = [
  {
    slug: "fundraising",
    name: "Fundraising & Campaigns",
    icon: HandCoins,
    hook: "Raising money is easier when people understand why their money matters.",
    intro: "We connect the financial ask to a compelling story that gives donors a reason to participate.",
    offerings: [
      "Campaign strategy",
      "Case for support",
      "Annual giving",
      "Major initiatives",
      "Creative fundraising concepts",
      "Donor communications",
    ],
    closing: "The goal isn't just to ask for money. It's to give people a reason to say yes.",
  },
  {
    slug: "communications",
    name: "Communications & Storytelling",
    icon: MessagesSquare,
    hook: "You know your organization inside and out. That doesn't necessarily mean everyone else understands what you do.",
    intro: "We help organizations find the stories, messages, and creative ideas that make their work easier to understand — and harder to ignore.",
    offerings: ["Messaging", "Content", "Video", "Digital campaigns", "Websites", "Social media", "Creative direction"],
    closing: "Sometimes the problem isn't what you're saying. It's how you're saying it.",
  },
  {
    slug: "community-engagement",
    name: "Community Engagement",
    icon: Users,
    hook: "“Raise awareness” is not the end goal.",
    intro: "What do you want people to actually do? We create campaigns, programs, and experiences that turn audiences into participants — whether the goal is getting people through the door, into the conversation, onto the volunteer list, or behind a cause.",
    offerings: ["Community campaigns", "Audience engagement", "Public participation", "Partnerships", "Interactive experiences"],
    closing: "",
  },
  {
    slug: "events",
    name: "Events & Experiences",
    icon: PartyPopper,
    hook: "An event should do more than occupy a date on the calendar. It should accomplish something.",
    intro: "Raise money. Build relationships. Celebrate your community. Create some excitement. And, ideally, be fun. We develop fundraising events, community events, launches, celebrations, and experiences from concept through execution.",
    offerings: [],
    closing: "",
    richTestimonials: [],
  },
  {
    slug: "hosting-emcee",
    name: "Hosting & Emcee Services",
    icon: Mic2,
    hook: "A good event still needs someone in the room who can hold it together.",
    intro: "We bring energy, humor, and professionalism to fundraisers, festivals, sporting events, game shows, team-building outings, and ceremonies — keeping the room on schedule and paying attention without ever feeling like a script is being read.",
    offerings: [],
    closing: "It's the same instinct behind everything else here: make people care enough to pay attention.",
    richTestimonials: [
      {
        quote: "His energy, his humor, and passion always brings each room to life.",
        attribution: "Zulfat Suara, Metro Nashville Council Member",
      },
      {
        quote: "He brought a perfect amount of humor while leading a respectful discussion between the candidates.",
        attribution: "Elizabeth Sanfelippo, Neighborhood President",
      },
      {
        quote: "His wit, charm, and poignancy is unmatched and I could not imagine hosting an event like ours without such a titan.",
        attribution: "Jackie Miller, Athletic Alabama",
      },
      {
        quote: "He hosts with an approachable eloquence, an acute wit and effortless charm. But what truly stood out and surprised me was how much detail, care and customization he brought to the big day.",
        attribution: "Bryson Schmidt, Groom",
      },
    ],
  },
];
