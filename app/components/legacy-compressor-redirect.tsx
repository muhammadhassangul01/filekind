"use client";

import { useEffect } from "react";

export default function LegacyCompressorRedirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const targetKB = params.get("targetKB");
    if (!targetKB || !/^\d+(?:\.\d+)?$/.test(targetKB)) return;
    const value = Number(targetKB);
    if (value < 1 || value > 50_000) return;
    window.location.replace(`/compress-image?targetKB=${encodeURIComponent(targetKB)}`);
  }, []);
  return null;
}