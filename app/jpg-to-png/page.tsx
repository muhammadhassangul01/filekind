import type { Metadata } from "next";
import JpgToPng from "../components/jpg-to-png";

export const metadata: Metadata = { title: "JPG to PNG converter", description: "Convert JPG images to PNGs privately in your browser." };
export default function JpgToPngPage() { return <JpgToPng />; }