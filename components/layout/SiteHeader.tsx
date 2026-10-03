"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../icons/Icon";

const items = [
  ["Beranda", "/"], ["Tentang", "/#tentang"], ["Eksplorasi Minat", "/#eksplorasi"], ["Program", "/#program"], ["Portofolio", "/#portofolio"], ["FAQ", "/#faq"],
] as const;

export function SiteHeader({ onInterested }: { onInterested?: () => void }) {
  const pathname = usePathname(), [open, setOpen] = useState(false), triggerRef = useRef<HTMLButtonElement>(null), menuId = "public-navigation";
  const close = useCallback((restore = false) => { setOpen(false); if (restore) requestAnimationFrame(() => triggerRef.current?.focus()); }, []);
  useEffect(() => {
    if (!open) return;
    function keydown(event: KeyboardEvent) { if (event.key === "Escape") close(true); }
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [open, close]);
  return <header className="site-header"><div className="shell nav-wrap">
    <Link href="/" className="brand" aria-label="NI FUTURE — Beranda"><span className="brand-mark">NI</span><span><b>NI FUTURE</b><small>SMK NURUL IMAN</small></span></Link>
    <button ref={triggerRef} className="menu-button" type="button" aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(value => !value)}><Icon name={open ? "close" : "menu"}/></button>
    <nav id={menuId} className={open ? "open" : ""} aria-label="Navigasi utama">{items.map(([label, href]) => <Link href={href} key={label} onClick={() => close()} aria-current={href === "/" && pathname === "/" ? "page" : undefined}>{label}</Link>)}{onInterested ? <button type="button" className="nav-cta" onClick={() => { close(); onInterested(); }}>Mulai Asesmen</button> : <Link className="nav-cta" href="/minat" onClick={() => close()}>Mulai Asesmen</Link>}</nav>
  </div></header>;
}
