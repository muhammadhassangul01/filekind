"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ToolLayout({
  children,
  active,
}: { children: React.ReactNode; active: "home" | "compressor" | "converter" | "images-pdf" | "pdf-images" }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
          <Link onClick={() => setMenuOpen(false)} href="/compress-image" aria-current={active === "compressor" ? "page" : undefined}>Compress image</Link>
          <Link onClick={() => setMenuOpen(false)} href="/convert-image" aria-current={active === "converter" ? "page" : undefined}>Convert image</Link>
          <Link onClick={() => setMenuOpen(false)} href="/images-to-pdf" aria-current={active === "images-pdf" ? "page" : undefined}>Images to PDF</Link>
          <Link onClick={() => setMenuOpen(false)} href="/pdf-to-images" aria-current={active === "pdf-images" ? "page" : undefined}>PDF to images</Link>
        </nav>
      </header>
      <main className="page">{children}</main>
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

export function PageFooter() {
  return <footer className="footer">Files stay in your browser. Filekind collects limited anonymous page-view analytics to understand which tools are useful.</footer>;
}
