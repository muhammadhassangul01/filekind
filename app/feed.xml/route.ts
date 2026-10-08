import { guides } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const recent = [...guides].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 30);
  const items = recent
    .map(
      (guide) => `    <item>
      <title>${escapeXml(guide.metaTitle)}</title>
      <link>${absoluteUrl(`/guides/${guide.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/guides/${guide.slug}`)}</guid>
      <description>${escapeXml(guide.summary)}</description>
      <pubDate>${new Date(guide.updated).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} image and PDF guides`)}</title>
    <link>${absoluteUrl("/guides")}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
