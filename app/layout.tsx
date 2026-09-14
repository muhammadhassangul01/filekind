import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Filekind | Simple image tools",
    template: "%s | Filekind",
  },
  description: "Compress images and convert PNGs to JPGs privately in your browser.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
