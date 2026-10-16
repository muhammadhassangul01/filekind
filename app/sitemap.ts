import type { MetadataRoute } from "next";
import { comparisons, glossaryTerms, guides, hubLinks } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { nicheTools } from "@/lib/niche-tools";

export const dynamic = "force-static";

const weekly = "weekly" as const;
const daily = "daily" as const;
const monthly = "monthly" as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: `${SITE_URL}/`,
    lastModified: new Date(),
    changeFrequency: daily,
    priority: 1,
  } as const;

  const catalogEntries: MetadataRoute.Sitemap = nicheTools.map((tool) => ({
    url: `${SITE_URL}/${tool.path.join("/")}`,
    lastModified: new Date(),
    changeFrequency: weekly,
    priority: 0.95,
  }));

  const hubs: MetadataRoute.Sitemap = [
    ...hubLinks.map((link) => link.href),
    "/about",
    "/privacy",
  ].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: weekly, priority: 0.8 }));

  const guideEntries: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updated),
    changeFrequency: monthly,
    priority: 0.7,
  }));

  const glossaryEntries: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${SITE_URL}/glossary/${term.slug}`,
    lastModified: new Date(term.updated),
    changeFrequency: monthly,
    priority: 0.6,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: `${SITE_URL}/compare/${comparison.slug}`,
    lastModified: new Date(comparison.updated),
    changeFrequency: monthly,
    priority: 0.7,
  }));

  return [
    home,
    ...catalogEntries,
    ...hubs,
    ...guideEntries,
    ...comparisonEntries,
    ...glossaryEntries,
  ];
}
