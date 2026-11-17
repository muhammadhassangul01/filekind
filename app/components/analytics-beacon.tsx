"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const analyticsEndpoint =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ??
  "https://filekind-analytics.muhammadhassangul01.workers.dev/analytics";

function normalizeEvent(value: string) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return normalized.slice(0, 80) || "interaction";
}

function visitorId() {
  const key = "filekind-analytics-visitor";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const created = crypto.randomUUID().replaceAll("-", "");
  window.localStorage.setItem(key, created);
  return created;
}

function isProductionSite() {
  const hostname = window.location.hostname;
  const configuredSite = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.tech").replace(/\/$/, "");
  return hostname !== "localhost" && hostname !== "127.0.0.1" && !hostname.endsWith(".local") &&
    window.location.origin === configuredSite;
}

export default function AnalyticsBeacon() {
  const pathname = usePathname();
  const sentPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname === "/admin" || pathname === "/analytics" || sentPath.current === pathname) return;
    sentPath.current = pathname;
    if (!analyticsEndpoint || !isProductionSite()) return;

    const id = visitorId();
    const startedAt = Date.now();
    let sentDuration = false;
    const send = (payload: Record<string, unknown>) => {
      void fetch(analyticsEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ path: pathname, visitorId: id, ...payload }),
        keepalive: true,
      }).catch(() => undefined);
    };
    const sendDuration = () => {
      if (sentDuration) return;
      const seconds = Math.round((Date.now() - startedAt) / 1000);
      if (seconds > 0) send({ eventType: "time", durationSeconds: Math.min(seconds, 86_400) });
      sentDuration = true;
    };

    send({ eventType: "page_view" });

    function recordClick(clickEvent: MouseEvent) {
      const target = clickEvent.target instanceof Element
        ? clickEvent.target.closest<HTMLAnchorElement | HTMLButtonElement | HTMLElement>("a, button, summary")
        : null;
      if (!target) return;
      const event = target instanceof HTMLAnchorElement
        ? (new URL(target.href, window.location.href).origin === window.location.origin
          ? `link-${new URL(target.href, window.location.href).pathname}`
          : "external-link")
        : target.dataset.analyticsEvent ?? (target instanceof HTMLButtonElement ? "button-click" : "faq-toggle");
      send({ eventType: "click", eventName: normalizeEvent(event) });
    }

    document.addEventListener("click", recordClick, true);
    window.addEventListener("pagehide", sendDuration);
    return () => {
      document.removeEventListener("click", recordClick, true);
      window.removeEventListener("pagehide", sendDuration);
      sendDuration();
    };
  }, [pathname]);

  return null;
}
