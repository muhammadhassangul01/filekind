import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.tech";
  const paths = [
    "/",
    "/compress-image",
    "/convert-image",
    "/images-to-pdf",
    "/pdf-to-images",
    ...["jpg", "png", "webp"].flatMap((from) => ["jpg", "png", "webp"].filter((to) => to !== from).map((to) => `/convert-image/${from}-to-${to}`)),
  ];
  return paths.map((path) => ({ url: `${base}${path}` }));
}
