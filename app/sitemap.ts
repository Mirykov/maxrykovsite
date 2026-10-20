import type { MetadataRoute } from "next";
import site from "@/content/site.json";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/experiences", "/emcee", "/campaigns", "/work", "/about", "/book"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}` })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}` })),
  ];
}
