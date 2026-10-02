"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export function SiteHeader({ onInterested }: { onInterested?: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="shell nav-wrap">
    <Link href="/" className="brand"><span className="brand-mark">NI</span><span><b>SMK NURUL IMAN</b><small>SPMB · NI FUTURE</small></span></Link>
    <button className="menu-button" aria-label="Buka menu" onClick={()=>setOpen(!open)}>☰</button>
    <nav className={open ? "open" : ""}><Link href="/#program">Program</Link><Link href="/karya">Karya</Link><Link href="/biaya">Biaya</Link><Link href="/presentasi">Presentasi</Link><Link href="/konsultasi">Konsultasi</Link>{onInterested ? <button className="nav-cta" onClick={onInterested}>Saya Tertarik ↗</button> : <Link className="nav-cta" href="/minat">Temukan Potensi ↗</Link>}</nav>
  </div></header>
}

export function SiteFooter() {
  return <footer><div className="shell footer-grid"><div><div className="brand footer-brand"><span className="brand-mark">NI</span><span><b>SMK NURUL IMAN</b><small>NI FUTURE · SPMB 2027/2028</small></span></div><p>Lanjutkan perjalanan. Siapkan masa depan.</p></div><div><b>JELAJAHI</b><Link href="/minat">Temukan Potensi</Link><Link href="/karya">Karya Santri</Link><Link href="/biaya">Biaya</Link></div><div><b>HUBUNGI</b><Link href="/konsultasi">Konsultasi SPMB</Link><Link href="/admin">Dashboard Admin</Link></div></div><div className="shell copyright">© 2026 SMK Nurul Iman <span>Adab · Skill · Masa Depan</span></div></footer>
}

export function PageIntro({ kicker, title, italic, description }: { kicker: string; title: string; italic?: string; description: string }) {
  return <section className="page-intro"><div className="shell"><div className="section-kicker light">{kicker}</div><h1>{title}<br/>{italic && <em>{italic}</em>}</h1><p>{description}</p></div></section>
}

export function InterestModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle"|"sending"|"done"|"error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/leads", { method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify(data) });
    setStatus(res.ok ? "done" : "error");
  }
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Form ketertarikan"><div className="modal-card"><button className="modal-close" onClick={onClose} aria-label="Tutup">×</button>{status === "done" ? <div className="success-state"><span>✓</span><h2>Terima kasih.</h2><p>Minat Anda sudah tercatat. Tim SPMB akan menghubungi dengan cara yang nyaman untuk Anda.</p><button className="button primary" onClick={onClose}>Selesai</button></div> : <><div className="section-kicker">SAYA TERTARIK</div><h2>Mari mulai dari sini.</h2><p>Isi singkat agar tim kami dapat memberikan informasi yang relevan.</p><form onSubmit={submit} className="stack-form"><label>Nama siswa<input name="studentName" required placeholder="Nama lengkap siswa" /></label><div className="form-row"><label>Nama wali<input name="parentName" required placeholder="Nama wali" /></label><label>WhatsApp wali<input name="phone" inputMode="tel" required placeholder="08xxxxxxxxxx" /></label></div><label>Asal sekolah<input name="school" required placeholder="Nama sekolah asal" /></label><label>Tingkat ketertarikan<select name="interestLevel" required defaultValue=""><option value="" disabled>Pilih salah satu</option><option>Sangat tertarik</option><option>Masih mempertimbangkan</option><option>Ingin konsultasi</option><option>Ingin melihat sekolah</option><option>Ingin mengetahui biaya</option><option>Siap mendaftar</option></select></label>{status === "error" && <p className="form-error">Belum berhasil dikirim. Silakan coba lagi.</p>}<button className="button primary full" disabled={status==="sending"}>{status === "sending" ? "Mengirim…" : "Kirim Minat →"}</button><small>Data digunakan hanya untuk keperluan komunikasi SPMB.</small></form></>}</div></div>
}
