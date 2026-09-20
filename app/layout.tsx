import type { Metadata } from "next";
import "./globals.css";
import AnalyticsBeacon from "./components/analytics-beacon";

export const metadata: Metadata = {
  title: {
    default: "Free Image and PDF Tools | Filekind",
    template: "%s",
  },
  description: "Free browser tools to compress and convert images, create PDFs, and render PDF pages on your device.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.com"),
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "Filekind",
    title: "Free Image and PDF Tools | Filekind",
    description: "Free browser tools to compress and convert images, create PDFs, and render PDF pages on your device.",
  },
  twitter: {
    card: "summary",
    title: "Free Image and PDF Tools | Filekind",
    description: "Free browser tools to compress and convert images, create PDFs, and render PDF pages on your device.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body><AnalyticsBeacon />{children}</body></html>;
}
