"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const analyticsEndpoint =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ??
  "https://filekind-analytics.muhammadhassangul01.workers.dev/analytics";

function normalizeEvent(value: string) {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized.slice(0, 64) || "interaction";
}

function isProductionSite() {
  const hostname = window.location.hostname;
  const configuredSite = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.tech").replace(/\/$/, "");
  return (
    hostname !== "localhost" &&
    hostname !== "127.0.0.1" &&
    !hostname.endsWith(".local") &&
    window.location.origin === configuredSite
  );
}

export default function AnalyticsBeacon() {
  const pathname = usePathname();
  const sentPath = useRef<string | null>(null);

  useEffect(() => {
    const legacyTarget = pathname === "/" && new URLSearchParams(window.location.search).has("targetKB");
    if (legacyTarget) return;
    if (!pathname || pathname === "/admin" || pathname === "/analytics" || sentPath.current === pathname) return;
    sentPath.current = pathname;
    if (!analyticsEndpoint || !isProductionSite()) return;

    const send = (event?: string) => {
      const body = event ? { path: pathname, event } : { path: pathname };
      void fetch(analyticsEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(() => undefined);
    };

    send();

    function recordControlChange(changeEvent: Event) {
      const target = changeEvent.target;
      if (target instanceof HTMLInputElement && target.type === "file") {
        if (target.files?.length) send("file-selected");
        return;
      }

      if (target instanceof HTMLSelectElement) {
        send("selection-change");
        return;
      }

      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        const event = target instanceof HTMLInputElement && ["checkbox", "radio"].includes(target.type)
          ? "toggle-change"
          : "field-change";
        send(event);
      }
    }

    function recordClick(clickEvent: MouseEvent) {
      const target = clickEvent.target instanceof Element
        ? clickEvent.target.closest<HTMLAnchorElement | HTMLButtonElement | HTMLElement>("a, button, summary")
        : null;
      if (!target) return;

      if (target instanceof HTMLAnchorElement) {
        const url = new URL(target.href, window.location.href);
        const event = url.origin === window.location.origin
          ? `link-${url.pathname}`
          : "external-link";
        send(normalizeEvent(event));
        return;
      }

      const event = target.dataset.analyticsEvent ??
        (target instanceof HTMLButtonElement ? "button-click" : "faq-toggle");
      send(normalizeEvent(event));
    }

    document.addEventListener("click", recordClick, true);
    document.addEventListener("change", recordControlChange, true);
    return () => {
      document.removeEventListener("click", recordClick, true);
      document.removeEventListener("change", recordControlChange, true);
    };
  }, [pathname]);

  return null;
}
