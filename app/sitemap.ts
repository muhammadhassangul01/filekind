import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { nicheTools } from "@/lib/niche-tools";
import { useCases } from "@/lib/use-cases";

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

  const coreToolEntries: MetadataRoute.Sitemap = nicheTools.map((tool) => ({
    url: `${SITE_URL}/${tool.path.join("/")}`,
    lastModified: new Date(),
    changeFrequency: weekly,
    priority: 0.95,
  }));

  const useCaseEntries: MetadataRoute.Sitemap = useCases.map((useCase) => ({
    url: `${SITE_URL}/${useCase.path.join("/")}`,
    changeFrequency: monthly,
    lastModified: new Date(),
    priority: 0.9,
  }));

  return [home, ...coreToolEntries, ...useCaseEntries];
}
