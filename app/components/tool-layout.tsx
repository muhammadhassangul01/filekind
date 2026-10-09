"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JsonLd from "./json-ld";
import SiteFooter from "./site-footer";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";

export type NavKey =
  | "home"
  | "compressor"
  | "resize"
  | "converter"
  | "images-pdf"
  | "pdf-images"
  | "merge-pdf"
  | "split-pdf"
  | "compress-pdf"
  | "rotate-pdf"
  | "guides"
  | "glossary"
  | "compare"
  | "directory"
  | "info";

const navItems = [
  { href: "/compress-image", label: "Compress image", key: "compressor" as const },
  { href: "/resize-image", label: "Resize image", key: "resize" as const },
  { href: "/convert-image", label: "Convert image", key: "converter" as const },
  { href: "/images-to-pdf", label: "Images to PDF", key: "images-pdf" as const },
  { href: "/pdf-to-images", label: "PDF to images", key: "pdf-images" as const },
  { href: "/guides", label: "Guides", key: "guides" as const },
];

const homeCrumb: Crumb = { name: "Home", href: "/" };

const defaultCrumbs: Partial<Record<NavKey, Crumb[]>> = {
  compressor: [homeCrumb, { name: "Compress image" }],
  resize: [homeCrumb, { name: "Resize image" }],
  converter: [homeCrumb, { name: "Convert image" }],
  "images-pdf": [homeCrumb, { name: "Images to PDF" }],
  "pdf-images": [homeCrumb, { name: "PDF to images" }],
  "merge-pdf": [homeCrumb, { name: "PDF tools", href: "/pdf-tools" }, { name: "Merge PDF" }],
  "split-pdf": [homeCrumb, { name: "PDF tools", href: "/pdf-tools" }, { name: "Split PDF" }],
  "compress-pdf": [homeCrumb, { name: "PDF tools", href: "/pdf-tools" }, { name: "Compress PDF" }],
  "rotate-pdf": [homeCrumb, { name: "PDF tools", href: "/pdf-tools" }, { name: "Rotate PDF" }],
  guides: [homeCrumb, { name: "Guides" }],
  glossary: [homeCrumb, { name: "Glossary" }],
  compare: [homeCrumb, { name: "Comparisons" }],
  directory: [homeCrumb, { name: "Site directory" }],
  info: [homeCrumb],
};

function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length < 2) return null;
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.name}-${index}`}>
                {item.href && !isLast ? (
                  <Link href={item.href}>{item.name}</Link>
                ) : (
                  <span aria-current="page">{item.name}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default function ToolLayout({
  children,
  active,
  breadcrumbs,
}: {
  children: React.ReactNode;
  active: NavKey;
  breadcrumbs?: Crumb[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const crumbs = breadcrumbs ?? defaultCrumbs[active] ?? [homeCrumb];
  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("menu-is-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("menu-is-open");
    };
  }, [menuOpen]);
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Filekind home"><span className="brand-mark" aria-hidden="true"><span className="brand-mark-fold" /></span>Filekind</Link>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="image-tools-nav" onClick={() => setMenuOpen((open) => !open)}>
          <span className="menu-icon" aria-hidden="true"><span /><span /><span /></span>
        </button>
        {menuOpen && <button className="menu-backdrop" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} id="image-tools-nav" aria-label="Image tools">
          {navItems.map((item) => (
            <Link key={item.href} onClick={() => setMenuOpen(false)} href={item.href} aria-current={active === item.key ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="page">
        <Breadcrumbs items={crumbs} />
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function FileDrop({ accept, onFile, busy, inputId }: { accept: string; onFile: (file: File) => void; busy: boolean; inputId: string }) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onFile(file);
    event.target.value = "";
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) onFile(file);
  }

  return (
    <label className="dropzone" htmlFor={inputId} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
      <span className="upload-icon" aria-hidden="true">+</span>
      <strong>{busy ? "Working on your image..." : "Choose an image or drop it here"}</strong>
      <span>JPEG, PNG, or static WebP, up to 25 MB</span>
      <input className="file-input" id={inputId} type="file" accept={accept} onChange={handleChange} disabled={busy} />
    </label>
  );
}
