import type { ReactNode } from "react";

const paths: Record<string, string> = {
  "/compress-image": "M4 6h16M6 10h12M8 14h8M10 18h4",
  "/resize-image": "M5 5h6v2H7v4H5V5Zm14 14h-6v-2h4v-4h2v6ZM5 19v-6h2v4h4v2H5Zm14-14v6h-2V7h-4V5h6Z",
  "/convert-image": "M7 7h8l-2-2 1.5-1.5L19 8l-4.5 4.5L13 11l2-2H7v3l-2-2V7h2Zm10 10H9l2 2-1.5 1.5L5 16l4.5-4.5L11 13l-2 2h8v-3l2 2v3h-2Z",
  "/images-to-pdf": "M7 3h7l4 4v14H7V3Zm7 1v4h4M9 12h6M9 16h6",
  "/pdf-to-images": "M5 4h10l4 4v12H5V4Zm10 0v5h4M8 13h8M8 17h5",
  "/merge-pdf": "M5 5h6v2H7v12h4v2H5V5Zm8 0h6v16h-6v-2h4V7h-4V5Zm-5 8h6M12 10l2 3-2 3",
  "/split-pdf": "M5 4h14v6H5V4Zm0 10h14v6H5v-6Zm7-4v4",
  "/compress-pdf": "M5 4h14v16H5V4Zm4 4h6M9 12h6M9 16h4",
  "/rotate-pdf": "M7 8a6 6 0 1 1-1 7M7 8V4m0 4h4",
};

export default function ToolIcon({ href, children }: { href?: string; children?: ReactNode }) {
  return (
    <span className="home-tool-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        <path d={paths[href ?? ""] ?? "M6 4h12v16H6zM9 8h6M9 12h6M9 16h4"} />
      </svg>
      {children}
    </span>
  );
}
