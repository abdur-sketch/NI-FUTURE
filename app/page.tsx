"use client";

import Link from "next/link";
import { useState } from "react";
import { InterestModal, SiteFooter, SiteHeader } from "./ui";

const concerns = [
  ["01", "AGAMA", "Apakah salat, adab, Al-Qur’an dan lingkungan baiknya tetap terjaga?"],
  ["02", "PERGAULAN", "Siapa yang mendampingi anak ketika memasuki usia remaja?"],
  ["03", "KETERAMPILAN", "Apakah setelah lulus anak benar-benar memiliki kemampuan?"],
  ["04", "MASA DEPAN", "Apakah anak siap kuliah, bekerja, berkarya atau berusaha?"],
];

const pillars = [
  { n: "01", title: "Adab & Agama", intro: "Akar yang menjaga arah.", items: ["Tahfidz & diniyah", "Pembiasaan ibadah", "Adab", "Lingkungan pesantren"] },
  { n: "02", title: "Skill & Teknologi", intro: "Kemampuan yang terus diasah.", items: ["Desain grafis", "Photography & video", "Coding", "Project-based learning"] },
  { n: "03", title: "Masa Depan", intro: "Pilihan yang dipersiapkan.", items: ["Portfolio", "PKL", "Entrepreneurship", "Kuliah, kerja, atau usaha"] },
];

const years = [
  { year: "X", label: "FONDASI KREATIF", text: "Mulai dari dasar, berani mencoba.", items: ["Desain Grafis", "Nirmana", "Photography", "Video Editing", "Digital Literacy"] },
  { year: "XI", label: "NAIK LEVEL", text: "Menyelesaikan masalah lewat karya.", items: ["Coding", "Teknologi Digital", "Project", "Problem Solving", "Entrepreneurship"] },
  { year: "XII", label: "DUNIA NYATA", text: "Membawa skill ke pengalaman nyata.", items: ["PKL / Magang", "Portfolio", "Uji Kompetensi", "Persiapan Kuliah", "Kerja & Usaha"] },
];

export default function Home() {
  const [year, setYear] = useState(0);
  const [modal, setModal] = useState(false);
  return (
    <main>
      <SiteHeader onInterested={() => setModal(true)} />
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span /> SPMB SMK NURUL IMAN · 2027/2028</div>
          <h1>Melanjutkan perjalanan.<br/><em>Menyiapkan masa depan.</em></h1>
          <p className="hero-lead">Adab terjaga. Skill bertumbuh. Masa depan dipersiapkan.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/minat">Temukan Potensi Anak <span>↗</span></Link>
            <Link className="button secondary" href="#program">Kenali Program <span>↓</span></Link>
          </div>
          <div className="hero-note"><span>✦</span><p><b>Bukan sekadar memilih sekolah.</b><br/>Ini tentang menemukan lingkungan tumbuh yang tepat.</p></div>
        </div>
        <div className="hero-visual" aria-label="Ilustrasi perjalanan belajar santri">
          <div className="hero-grid" />
          <div className="orbit orbit-a"><span>ADAB</span></div>
          <div className="orbit orbit-b"><span>SKILL</span></div>
          <div className="hero-card main-card">
            <span className="tiny">NI FUTURE / 01</span>
            <div className="monogram">NI</div>
            <h2>Tumbuh utuh,<br/>melangkah jauh.</h2>
            <p>Pesantren × Kreativitas × Teknologi</p>
          </div>
          <div className="float-card float-top">KARYA<br/><strong>YANG NYATA</strong></div>
          <div className="float-card float-bottom"><strong>3 TAHUN</strong><br/>SATU PERJALANAN</div>
        </div>
      </section>

      <section className="dark-section concern-section">
        <div className="shell">
          <div className="section-kicker light">YANG SERING DIPIKIRKAN WALI</div>
          <div className="split-title"><h2>Bukan hanya<br/>soal sekolah.</h2><p>Memilih pendidikan lanjutan berarti memikirkan anak secara utuh—hari ini dan masa depannya.</p></div>
          <div className="concern-grid">
            {concerns.map(([n, title, text]) => <article className="concern-card" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="cream-section pillars" id="program">
        <div className="shell">
          <div className="section-heading"><div><div className="section-kicker">PONDASI PENDIDIKAN</div><h2>Mengapa<br/><em>SMK Nurul Iman?</em></h2></div><p>Karena pendidikan terbaik bukan memilih antara karakter dan kompetensi. Keduanya harus tumbuh bersama.</p></div>
          <div className="pillar-grid">
            {pillars.map(p => <article className="pillar-card" key={p.n}><div className="pillar-top"><span>{p.n}</span><span className="pillar-mark">✦</span></div><h3>{p.title}</h3><p>{p.intro}</p><ul>{p.items.map(i => <li key={i}>{i}</li>)}</ul></article>)}
          </div>
          <blockquote>“Mondoknya tetap. <span>Skill-nya naik level.</span><br/>Masa depannya dipersiapkan.”</blockquote>
        </div>
      </section>

      <section className="journey-section">
        <div className="shell">
          <div className="section-heading inverse"><div><div className="section-kicker light">PERJALANAN BELAJAR</div><h2>Tiga tahun.<br/><em>Bertumbuh bertahap.</em></h2></div><p>Bukan belajar serba cepat. Setiap tahap dirancang untuk memberi fondasi, ruang praktik, dan pengalaman nyata.</p></div>
          <div className="year-tabs" role="tablist" aria-label="Pilih kelas">
            {years.map((y, i) => <button key={y.year} className={year === i ? "active" : ""} onClick={() => setYear(i)} role="tab" aria-selected={year===i}>KELAS {y.year}</button>)}
          </div>
          <div className="year-panel">
            <div className="big-year">{years[year].year}</div>
            <div><div className="section-kicker gold">TAHAP {year + 1}</div><h3>{years[year].label}</h3><p>{years[year].text}</p></div>
            <ul>{years[year].items.map((item, i) => <li key={item}><span>0{i+1}</span>{item}</li>)}</ul>
          </div>
          <div className="learning-flow"><span>LEARN</span><b>→</b><span>PRACTICE</span><b>→</b><span>PROJECT</span><b>→</b><span>PORTFOLIO</span></div>
        </div>
      </section>

      <section className="explore-section shell">
        <div className="section-kicker">MULAI DENGAN MENGENAL</div>
        <h2>Setiap anak punya<br/><em>cara bertumbuhnya sendiri.</em></h2>
        <div className="explore-grid">
          <Link href="/minat" className="explore-card featured"><span className="card-index">01</span><div className="abstract-art"><i/><i/><i/></div><div><div className="label">INTERAKTIF · ± 5 MENIT</div><h3>Temukan Potensimu</h3><p>Pemetaan minat awal untuk membuka percakapan tentang arah belajar anak.</p><span className="circle-arrow">↗</span></div></Link>
          <Link href="/karya" className="explore-card"><span className="card-index">02</span><div className="mini-art photo-art">KARYA<br/>SANTRI</div><div><h3>Lihat Karya</h3><p>Ruang bagi proses dan hasil belajar untuk berbicara.</p><span className="circle-arrow">↗</span></div></Link>
          <Link href="/biaya" className="explore-card"><span className="card-index">03</span><div className="mini-art cost-art">TRANSPARAN</div><div><h3>Biaya Pendidikan</h3><p>Informasi komponen biaya yang jelas dan mudah dipahami.</p><span className="circle-arrow">↗</span></div></Link>
        </div>
      </section>

      <section className="closing">
        <div className="shell closing-inner"><div><div className="section-kicker light">LANGKAH BERIKUTNYA</div><h2>Mari bicarakan<br/><em>masa depan anak.</em></h2><p>Tidak harus langsung memutuskan. Mulai dari memahami program dan kebutuhan anak Anda.</p></div><div className="closing-actions"><Link className="button gold-button" href="/konsultasi">Jadwalkan Konsultasi <span>↗</span></Link><button className="text-button" onClick={()=>setModal(true)}>Saya tertarik <span>→</span></button></div></div>
      </section>
      <SiteFooter />
      {modal && <InterestModal onClose={() => setModal(false)} />}
    </main>
  );
}
