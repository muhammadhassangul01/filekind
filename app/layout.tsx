import type { Metadata } from "next";
import "./globals.css";
import AnalyticsBeacon from "./components/analytics-beacon";
import JsonLd from "./components/json-ld";
import {
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  organizationSchema,
  pageMetadata,
  softwareAppSchema,
  websiteSchema,
} from "@/lib/seo";

const verification = {
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : {}),
  ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
    ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
    : {}),
  ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
    ? { "yandex-verification": process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
    : {}),
};

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Free Image and PDF Tools: Compress, Convert, Resize | Filekind",
    description: SITE_DESCRIPTION,
    path: "/",
    keywords: [
      "image tools",
      "compress image online",
      "convert image online",
      "image to pdf",
      "pdf to images",
      "resize image",
      "free online image compressor",
      "browser image converter",
    ],
  }),
  title: {
    default: `Free Image and PDF Tools: Compress, Convert, Resize | Filekind`,
    template: "%s | Filekind",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.tech"),
  applicationName: "Filekind",
  authors: [{ name: "Filekind" }],
  category: "utilities",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  ...(Object.keys(verification).length ? { verification } : {}),
};

const siteSchemas = [
  organizationSchema(),
  websiteSchema(),
  softwareAppSchema({
    name: "Filekind",
    description: SITE_DESCRIPTION,
    path: "/",
    category: "MultimediaApplication",
    features: [
      "Compress images to a target KB or MB size",
      "Resize images by pixels or percentage",
      "Convert between JPG, PNG, and WebP",
      "Combine images into a PDF",
      "Render PDF pages as JPG or PNG images",
    ],
  }),
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={SITE_LANGUAGE}>
      <body>
        <AnalyticsBeacon />
        <JsonLd data={siteSchemas} />
        {children}
      </body>
    </html>
  );
}

