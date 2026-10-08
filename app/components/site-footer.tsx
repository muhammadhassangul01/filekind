import Link from "next/link";
import { footerColumns } from "@/lib/content/links";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        {footerColumns.map((column) => (
          <nav className="footer-column" key={column.heading} aria-label={`${column.heading} links`}>
            <h2 className="footer-heading">{column.heading}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <p>
          Filekind works entirely in your browser. Images and PDFs are never uploaded, and every tool is free with no
          signup or watermark.
        </p>
        <p className="footer-meta">
          <span>© 2026 Filekind</span>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/directory">Site directory</Link>
          <Link href="/glossary">Glossary</Link>
          <Link href="/compare">Comparisons</Link>
          <a href="/feed.xml">RSS</a>
        </p>
      </div>
    </footer>
  );
}
