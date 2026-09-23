import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.tech";
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/login"] }], sitemap: `${base}/sitemap.xml` };
}
