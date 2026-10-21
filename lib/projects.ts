import data from "@/content/projects.json";

export type Project = {
  slug: string;
  title: string;
  subtitle: string | null;
  partnerLabel: string | null;
  partner: string | null;
  challenge: string | null;
  project: string[];
  highlightsTitle?: string;
  highlights?: string[];
  stats: { value: string; label: string }[];
  image: string;
  imageAlt: string;
  imagePosition?: string;
  // Pixel width of the hero photo when it's too small to fill the page width without going soft
  imageMaxWidth?: number;
  // Optional different photo for cards (e.g. when the page's wide hero crops badly in a portrait card)
  cardImage?: string;
  cardImageAlt?: string;
  cardImagePosition?: string;
  gallery: { src: string; alt: string; position?: string }[];
  // Gallery frame shape as a CSS aspect-ratio, e.g. "3 / 2" (default "4 / 3")
  galleryAspect?: string;
  photoCredit?: string;
  featuredOnHome: boolean;
};

export const projects = data as Project[];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// The project after this one, wrapping around, for "Next project" links
export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
