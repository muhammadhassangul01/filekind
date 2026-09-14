"use client";

import { useState } from "react";
import Link from "next/link";

export default function ToolLayout({
  children,
  active,
}: { children: React.ReactNode; active: "compressor" | "png" | "jpg" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Filekind home"><span className="brand-mark" aria-hidden="true" />Filekind</Link>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="image-tools-nav" onClick={() => setMenuOpen((open) => !open)}>Menu</button>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} id="image-tools-nav" aria-label="Image tools">
          <Link onClick={() => setMenuOpen(false)} href="/" aria-current={active === "compressor" ? "page" : undefined}>Compress image</Link>
          <Link onClick={() => setMenuOpen(false)} href="/png-to-jpg" aria-current={active === "png" ? "page" : undefined}>PNG to JPG</Link>
          <Link onClick={() => setMenuOpen(false)} href="/jpg-to-png" aria-current={active === "jpg" ? "page" : undefined}>JPG to PNG</Link>
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
      <span>JPEG and PNG, up to 25 MB</span>
      <input className="file-input" id={inputId} type="file" accept={accept} onChange={handleChange} disabled={busy} />
    </label>
  );
}

export function PageFooter() {
  return <footer className="footer">Private by design. Files stay in your browser and are never uploaded.</footer>;
}
