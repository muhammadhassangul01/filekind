import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.pages.dev";
  return ["/", "/compress-image", "/convert-image", "/images-to-pdf", "/pdf-to-images"].map((path) => ({ url: `${base}${path}` }));
}
