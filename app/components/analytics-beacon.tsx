"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const publicPaths = new Set(["/", "/convert-image", "/images-to-pdf", "/pdf-to-images"]);

export default function AnalyticsBeacon() {
  const pathname = usePathname();
  const sentPath = useRef<string | null>(null);
  useEffect(() => {
    if (!publicPaths.has(pathname) || sentPath.current === pathname) return;
    sentPath.current = pathname;
    const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
    if (!endpoint) return;
    void fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ path: pathname }), keepalive: true }).catch(() => undefined);
  }, [pathname]);
  return null;
}
