import type { Metadata } from "next";
import JpgToPng from "../components/jpg-to-png";

export const metadata: Metadata = { title: "JPG to PNG converter", description: "Redirecting to the shared image converter.", robots: { index: false, follow: false } };
export default function JpgToPngPage() { return <JpgToPng />; }