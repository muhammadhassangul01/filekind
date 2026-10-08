import type { MetadataRoute } from "next";
import { comparisons, glossaryTerms, guides, hubLinks } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

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

  const tools: MetadataRoute.Sitemap = [
    "/compress-image",
    "/resize-image",
    "/convert-image",
    "/images-to-pdf",
    "/pdf-to-images",
    "/jpg-to-pdf",
    "/png-to-pdf",
    "/webp-to-pdf",
    "/pdf-to-jpg",
    "/pdf-to-png",
  ].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: weekly, priority: 0.9 }));

  const converters: MetadataRoute.Sitemap = [
    "/convert-image/jpg-to-png",
    "/convert-image/jpg-to-webp",
    "/convert-image/png-to-jpg",
    "/convert-image/png-to-webp",
    "/convert-image/webp-to-jpg",
    "/convert-image/webp-to-png",
  ].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: weekly, priority: 0.9 }));

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
    ...tools,
    ...converters,
    ...hubs,
    ...guideEntries,
    ...comparisonEntries,
    ...glossaryEntries,
  ];
}
