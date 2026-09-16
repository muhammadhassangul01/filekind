"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const publicPaths = new Set(["/", "/compress-image", "/convert-image", "/images-to-pdf", "/pdf-to-images"]);

export default function AnalyticsBeacon() {
  const pathname = usePathname();
  const sentPath = useRef<string | null>(null);
  useEffect(() => {
    const legacyTarget = pathname === "/" && new URLSearchParams(window.location.search).has("targetKB");
    if (!publicPaths.has(pathname) || legacyTarget || sentPath.current === pathname) return;
    sentPath.current = pathname;
    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
    const hostname = window.location.hostname;
    const configuredSite = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    if (!endpoint || hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local") || (configuredSite && window.location.origin !== configuredSite)) return;
    void fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ path: pathname }), keepalive: true }).catch(() => undefined);
  }, [pathname]);
  return null;
}
