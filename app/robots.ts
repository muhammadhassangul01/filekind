import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.pages.dev";
  return { rules: [{ userAgent: "*", allow: ["/", "/convert-image", "/images-to-pdf", "/pdf-to-images"], disallow: ["/admin", "/api/"] }], sitemap: `${base}/sitemap.xml` };
}
