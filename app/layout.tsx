import type { Metadata } from "next";
import "./globals.css";
import AnalyticsBeacon from "./components/analytics-beacon";

export const metadata: Metadata = {
  title: {
    default: "Filekind | Simple image tools",
    template: "%s | Filekind",
  },
  description: "Compress and convert images, create PDFs, and render PDF pages locally in your browser.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://filekind.pages.dev"),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body><AnalyticsBeacon />{children}</body></html>;
}
