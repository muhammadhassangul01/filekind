import type { Metadata } from "next";
import PngToJpg from "../components/png-to-jpg";

export const metadata: Metadata = {
  title: "PNG to JPG converter",
  description: "Convert PNG images to JPGs privately in your browser with a white background.",
  robots: { index: false, follow: false },
};

export default function PngToJpgPage() {
  return <PngToJpg />;
}
