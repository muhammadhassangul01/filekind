"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const publicPaths = new Set(["/", "/compress-image", "/convert-image", "/images-to-pdf", "/pdf-to-images"]);
const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ?? "https://filekind-analytics.muhammadhassangul01.workers.dev/analytics";

export default function AnalyticsBeacon() {
  const pathname = usePathname();
  const sentPath = useRef<string | null>(null);
  useEffect(() => {
    const legacyTarget = pathname === "/" && new URLSearchParams(window.location.search).has("targetKB");
    if (!publicPaths.has(pathname) || legacyTarget || sentPath.current === pathname) return;
    sentPath.current = pathname;
    const endpoint = analyticsEndpoint;
    const hostname = window.location.hostname;
    const configuredSite = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.tech").replace(/\/$/, "");
    if (!endpoint || hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local") || (configuredSite && window.location.origin !== configuredSite)) return;
    const send = (event?: string) => void fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(event ? { path: pathname, event } : { path: pathname }), keepalive: true }).catch(() => undefined);
    send();
    function recordClick(clickEvent: MouseEvent) {
      const target = clickEvent.target instanceof Element ? clickEvent.target.closest<HTMLButtonElement | HTMLAnchorElement>("button, a") : null;
      if (!target) return;
      const label = target.getAttribute("data-analytics-event") ?? target.getAttribute("aria-label") ?? (target instanceof HTMLAnchorElement ? `link-${target.getAttribute("href") ?? "unknown"}` : target.textContent ?? "");
      const event = label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64);
      if (event) send(event);
    }
    document.addEventListener("click", recordClick, true);
    return () => document.removeEventListener("click", recordClick, true);
  }, [pathname]);
  return null;
}
