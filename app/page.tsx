import type { Metadata } from "next";
import { Icon } from "../components/icons/Icon";
import { Container } from "../components/layout/Container";
import { Eyebrow, Section, SectionHeader } from "../components/layout/Section";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Badge } from "../components/ui/Badge";
import { ButtonLink } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Accordion } from "../components/ui/Accordion";

export const metadata: Metadata = {
  title: { absolute: "NI FUTURE — Kenali Potensi, Temukan Masa Depan" },
  description: "Platform pengembangan minat dan potensi siswa Pondok Pesantren Nurul Iman untuk membantu siswa mengenali diri, mengeksplorasi bidang, dan menentukan langkah pengembangan.",
  alternates: { canonical: "/" },
  openGraph: { title: "NI FUTURE — Kenali Potensi, Temukan Masa Depan", description: "Kenali diri, eksplorasi bidang, dan tentukan langkah pengembangan bersama NI FUTURE.", url: "/", type: "website" },
};

const problems = [
  ["Arah belum jelas", "Banyak pilihan terasa menarik, tetapi kamu belum tahu mana yang paling cocok untuk mulai dikembangkan."],
  ["Takut salah memilih", "Memilih bidang terasa seperti keputusan besar, padahal arah bisa ditemukan lewat proses mencoba."],
  ["Potensi belum terlihat", "Minat sering muncul dari aktivitas sederhana yang belum sempat dikenali sebagai kekuatan."],
] as const;
const steps = [
  ["01", "Isi asesmen singkat", "Jawab pertanyaan tentang aktivitas dan cara belajar yang paling kamu sukai."],
  ["02", "Kenali pola minat", "Lihat bidang yang paling dekat dengan kecenderungan dan ketertarikanmu saat ini."],
  ["03", "Eksplorasi program", "Temukan keterampilan dan program belajar yang dapat kamu coba dan kembangkan."],
  ["04", "Susun langkah berikutnya", "Gunakan hasil sebagai bahan diskusi bersama orang tua dan pendamping."],
] as const;
const interests = [
  ["Visual", "Mengolah ide lewat warna, komposisi, foto, dan tampilan yang komunikatif.", "Desain & fotografi"],
  ["Teknologi", "Menyukai logika, perangkat digital, dan proses membangun solusi.", "Coding & literasi digital"],
  ["Cerita", "Menangkap pesan dan menyusunnya menjadi pengalaman yang mudah dipahami.", "Video & konten"],
  ["Bisnis", "Melihat peluang, menyusun strategi, dan membawa ide menjadi sesuatu yang bernilai.", "Entrepreneurship"],
] as const;
const programs = [
  ["Design Grafis", "Belajar menyampaikan pesan melalui identitas visual, layout, dan karya desain."],
  ["Photography", "Mengasah kepekaan melihat momen, cahaya, komposisi, dan cerita visual."],
  ["Video Editing", "Menyusun gambar, suara, ritme, dan pesan menjadi cerita yang utuh."],
  ["Coding", "Melatih logika dan membangun solusi digital melalui proses yang terstruktur."],
  ["Digital Literacy", "Menggunakan teknologi secara cerdas, aman, kritis, dan bertanggung jawab."],
  ["Entrepreneurship", "Mengembangkan keberanian mencoba, membaca peluang, dan mengelola ide."],
] as const;
const benefits = [
  ["Karakter menjadi fondasi", "Adab dan lingkungan pesantren menjaga arah saat kemampuan terus bertumbuh."],
  ["Belajar lewat praktik", "Siswa mencoba, mengevaluasi, dan memperbaiki karya melalui pengalaman langsung."],
  ["Karya menjadi bukti proses", "Portfolio membantu siswa melihat perkembangan dan menunjukkan kemampuan."],
  ["Arah disusun bertahap", "Minat tidak dipaksakan menjadi label; siswa diberi ruang untuk bereksplorasi."],
] as const;
const faqs = [
  { title: "Apa itu NI FUTURE?", content: "NI FUTURE adalah platform pengembangan minat dan potensi siswa Pondok Pesantren Nurul Iman. Platform ini membantu siswa mengenali kecenderungan awal, mengeksplorasi bidang, dan menyiapkan percakapan tentang langkah pengembangan." },
  { title: "Apakah asesmen gratis?", content: "Ya. Asesmen minat awal NI FUTURE dapat digunakan tanpa biaya." },
  { title: "Berapa lama asesmen?", content: "Rata-rata sekitar lima menit. Waktu dapat berbeda sesuai ritme setiap siswa." },
  { title: "Apakah hasil asesmen menentukan jurusan saya?", content: "Tidak. Hasil merupakan rekomendasi awal untuk membantu eksplorasi dan diskusi, bukan diagnosis atau keputusan mutlak tentang jurusan maupun masa depan." },
  { title: "Apakah orang tua dapat melihat hasil?", content: "Hasil ditampilkan setelah asesmen selesai pada perangkat yang digunakan. Siswa dapat membukanya bersama orang tua; saat ini belum tersedia akun orang tua atau pengiriman hasil otomatis." },
  { title: "Apakah saya bisa berkonsultasi setelah asesmen?", content: "Bisa. Formulir konsultasi yang tersedia dapat digunakan untuk mengajukan diskusi lanjutan dengan tim SPMB NI FUTURE." },
];

export default function Home() {
  return <main className="home-page">
    <SiteHeader />
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Container className="home-hero__grid">
        <div className="home-hero__copy">
          <Eyebrow>NI FUTURE · SMK NURUL IMAN</Eyebrow>
          <h1 id="home-hero-title" className="ni-display">Kenali Potensimu. <span>Temukan Arah Masa Depanmu.</span></h1>
          <p className="ni-body-lg">Mulai dari mengenali minat, mengeksplorasi bidang, lalu susun langkah pengembangan yang lebih terarah bersama NI FUTURE.</p>
          <div className="home-actions"><ButtonLink href="/minat" size="lg">Mulai Asesmen Gratis <Icon name="arrow-up-right" /></ButtonLink><ButtonLink href="#program" variant="secondary" size="lg">Jelajahi Program</ButtonLink></div>
          <p className="home-microcopy"><Icon name="check" size={16}/> ± 5 menit <span aria-hidden="true">•</span> Gratis <span aria-hidden="true">•</span> Hasil langsung</p>
        </div>
        <div className="home-hero-visual" aria-label="Preview antarmuka eksplorasi minat NI FUTURE" role="img">
          <div className="home-hero-visual__top"><span>NI / DISCOVERY</span><span>LANGKAH 02</span></div>
          <div className="home-hero-visual__prompt"><span className="home-hero-visual__number">02</span><p>Aktivitas mana yang paling membuatmu lupa waktu?</p></div>
          <div className="home-hero-visual__choices"><span className="is-active">Membuat visual</span><span>Memecahkan masalah</span><span>Menyusun cerita</span></div>
          <div className="home-hero-visual__result"><div><small>ARAH YANG DAPAT DIEKSPLORASI</small><strong>Kreatif Visual</strong></div><span>78%</span></div>
          <i className="home-orbit home-orbit--one"/><i className="home-orbit home-orbit--two"/>
        </div>
      </Container>
    </section>
    <div className="home-trust" aria-label="Keunggulan NI FUTURE"><Container className="home-trust__grid">{["Eksplorasi yang terarah", "Hasil langsung dipahami", "Rekomendasi, bukan label", "Dapat dilanjutkan konsultasi"].map((item) => <div key={item}><Icon name="check" size={16}/><span>{item}</span></div>)}</Container></div>

    <Section id="tentang" className="home-empathy">
      <SectionHeader eyebrow="MULAI DARI YANG KAMU RASAKAN" title={<>Menentukan arah tidak harus <span className="home-accent">langsung sempurna.</span></>} description="Bingung adalah bagian wajar dari proses mengenal diri. Yang penting, kamu punya ruang untuk mulai mencoba dan memahami pilihan." />
      <div className="home-three-grid">{problems.map(([title, description], index) => <Card key={title} className="home-problem-card"><span>0{index + 1}</span><h3 className="ni-h3">{title}</h3><p>{description}</p></Card>)}</div>
    </Section>

    <Section tone="subtle" className="home-steps">
      <SectionHeader eyebrow="CARA KERJA" title="Empat langkah untuk mulai mengenal arahmu." description="Sederhana, singkat, dan dirancang sebagai titik awal percakapan—bukan penentu masa depan." />
      <ol className="home-step-grid">{steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
    </Section>

    <Section tone="forest" className="home-assessment"><div className="home-assessment__grid">
      <div><Eyebrow>ASESMEN MINAT AWAL</Eyebrow><h2 className="ni-h2">Temukan pola dari hal-hal yang kamu sukai.</h2><p className="ni-body-lg">Sepuluh pertanyaan ringan membantumu melihat kecenderungan minat dan bidang yang dapat dieksplorasi lebih lanjut.</p><ButtonLink href="/minat" size="lg" className="home-button-light">Mulai Asesmen <Icon name="arrow-up-right" /></ButtonLink><small>Bukan tes psikologi atau diagnosis kemampuan.</small></div>
      <Card variant="result" className="home-assessment__card"><div className="home-assessment__card-head"><Badge variant="success">Preview proses</Badge><span>06 / 10</span></div><h3>Ketika mendapat ide baru, apa yang paling ingin kamu lakukan?</h3><div className="home-answer-list"><span>Memvisualisasikannya</span><span>Mencari cara kerjanya</span><span>Menceritakannya</span></div><div className="home-progress" aria-label="Progres contoh asesmen: 60 persen"><span style={{ width: "60%" }}/></div></Card>
    </div></Section>

    <Section id="eksplorasi" className="home-interests">
      <SectionHeader eyebrow="EKSPLORASI MINAT" title="Minat bisa tumbuh dari banyak pintu." description="Kenali beberapa pola aktivitas yang dapat menjadi awal untuk menemukan bidang pengembanganmu." />
      <div className="home-four-grid">{interests.map(([title, description, field], index) => <Card variant="feature" key={title} className="home-interest-card"><span className="home-interest-card__symbol" aria-hidden="true">{["◐", "⌁", "◒", "↗"][index]}</span><h3 className="ni-h3">{title}</h3><p>{description}</p><small>{field}</small></Card>)}</div>
    </Section>

    <Section id="program" tone="subtle" className="home-programs">
      <SectionHeader eyebrow="PROGRAM PENGEMBANGAN" title="Dari rasa ingin tahu menjadi keterampilan nyata." description="Enam bidang pembelajaran memberi ruang untuk mencoba, berlatih, dan membangun karya secara bertahap." actions={<ButtonLink href="/karya" variant="secondary">Lihat ruang karya</ButtonLink>} />
      <div className="home-program-grid">{programs.map(([title, description], index) => <Card variant="program" key={title} className="home-program-card"><span>0{index + 1}</span><h3 className="ni-h3">{title}</h3><p>{description}</p></Card>)}</div>
    </Section>

    <Section className="home-result-preview"><div className="home-result-grid">
      <div><Eyebrow>PREVIEW HASIL · DATA DEMO</Eyebrow><h2 className="ni-h2">Hasil yang mudah dibaca, lalu dibicarakan.</h2><p className="ni-body-lg">Setelah asesmen, siswa melihat urutan kecenderungan minat, penjelasan singkat, dan ide bidang yang dapat dicoba.</p><ul className="home-check-list"><li><Icon name="check" size={16}/> Ringkasan kecenderungan</li><li><Icon name="check" size={16}/> Rekomendasi eksplorasi</li><li><Icon name="check" size={16}/> Pengingat bahwa hasil bukan keputusan mutlak</li></ul></div>
      <Card variant="result" className="home-result-card"><div className="home-result-card__head"><span>HASIL CONTOH</span><Badge variant="success">Data demo</Badge></div><p>ARAH UTAMA</p><h3>Kreatif Visual</h3>{[["Visual", 82], ["Teknologi", 68], ["Cerita", 57]].map(([label, score]) => <div className="home-result-bar" key={label}><div><span>{label}</span><strong>{score}%</strong></div><i><span style={{ width: `${score}%` }}/></i></div>)}<small>Hasil ini hanya ilustrasi tampilan, bukan hasil siswa.</small></Card>
    </div></Section>

    <Section id="portofolio" tone="subtle" className="home-portfolio">
      <SectionHeader eyebrow="KARYA SANTRI" title="Belajar meninggalkan jejak yang bisa dilihat." description="Galeri publik masih disiapkan. Tiga kartu berikut adalah contoh kategori karya, bukan karya atau identitas siswa aktual." actions={<ButtonLink href="/karya" variant="secondary">Kunjungi galeri</ButtonLink>} />
      <div className="home-three-grid">{[["Identitas Visual", "DESAIN", "Bentuk, warna, dan pesan"], ["Cerita Cahaya", "FOTOGRAFI", "Momen, sudut, dan komposisi"], ["Produk Digital", "CODING", "Logika, fungsi, dan pengalaman"]].map(([title, category, caption], index) => <Card variant="portfolio" className="home-portfolio-card" key={title}><div className={`home-portfolio-art home-portfolio-art--${index + 1}`} aria-hidden="true"><span>{category.slice(0, 2)}</span></div><div><Badge>Contoh kategori</Badge><h3>{title}</h3><p>{caption}</p></div></Card>)}</div>
    </Section>

    <Section className="home-benefits"><SectionHeader eyebrow="MENGAPA NI FUTURE" title="Tumbuh utuh, bukan sekadar memilih bidang." description="Pengembangan keterampilan berjalan bersama karakter, pengalaman praktik, dan pendampingan arah." /><div className="home-benefit-grid">{benefits.map(([title, description], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></div>)}</div></Section>

    <Section tone="forest" className="home-parent"><div className="home-parent__grid"><div><Eyebrow>UNTUK ORANG TUA</Eyebrow><h2 className="ni-h2">Mulai percakapan dari rasa ingin tahu, bukan tekanan.</h2></div><div><p className="ni-body-lg">Hasil asesmen dapat menjadi bahan awal untuk mendengar apa yang menarik bagi anak dan bidang apa yang ingin mereka coba.</p><p>NI FUTURE tidak memberi diagnosis dan tidak menggantikan pertimbangan keluarga, guru, atau tenaga profesional. Rekomendasi membantu membuka pilihan, bukan membatasi masa depan.</p><ButtonLink href="/minat" variant="secondary" className="home-button-outline">Ajak anak mulai asesmen</ButtonLink></div></div></Section>

    <Section className="home-consultation"><Card variant="feature" className="home-consultation__card"><div><Eyebrow>KONSULTASI SPMB</Eyebrow><h2 className="ni-h2">Masih bingung dengan hasil atau pilihanmu?</h2><p>Diskusikan hasil asesmen dan rencana pengembanganmu bersama pendamping NI FUTURE.</p></div><ButtonLink href="/konsultasi" size="lg">Ajukan Konsultasi <Icon name="arrow-up-right" /></ButtonLink></Card></Section>

    <Section id="faq" tone="subtle" className="home-faq"><div className="home-faq__grid"><SectionHeader eyebrow="PERTANYAAN UMUM" title="Hal yang perlu kamu ketahui sebelum mulai." description="Jawaban singkat tentang asesmen, hasil, dan langkah lanjut di NI FUTURE."/><Accordion items={faqs}/></div></Section>

    <Section className="home-final-cta"><div className="home-final-cta__inner"><Eyebrow>LANGKAH PERTAMA</Eyebrow><h2 className="ni-h2">Masa depan yang baik dimulai dari mengenal diri.</h2><p className="ni-body-lg">Temukan minatmu dan mulai kembangkan potensimu bersama NI FUTURE.</p><div className="home-actions"><ButtonLink href="/minat" size="lg">Mulai Asesmen Gratis</ButtonLink><ButtonLink href="#program" variant="secondary" size="lg">Eksplorasi Program</ButtonLink></div></div></Section>
    <SiteFooter />
  </main>;
}
