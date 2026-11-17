import Link from "next/link";

const colors: Record<string, string> = {
  JPG: "format-jpg",
  PNG: "format-png",
  WEBP: "format-webp",
};

export default function FormatPairIcon({ href, from, to }: { href: string; from: string; to: string }) {
  return (
    <Link className="format-pair-card" href={href}>
      <span className={`format-badge ${colors[from] ?? ""}`}>{from}</span>
      <span className="format-pair-arrow" aria-hidden="true">→</span>
      <span className={`format-badge ${colors[to] ?? ""}`}>{to}</span>
      <span className="visually-hidden">{from} to {to}</span>
    </Link>
  );
}
