import { notFound } from "next/navigation";
import { Container } from "../../components/layout/Container";
import { Section, SectionHeader } from "../../components/layout/Section";
import { SiteFooter } from "../../components/layout/SiteFooter";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";
import { appEnvironment } from "../../lib/environment";
import { DesignSystemDemo } from "./DesignSystemDemo";

export const dynamic = "force-dynamic";

export default function DesignSystemPage() {
  if (appEnvironment() === "production") notFound();
  return <main className="design-system-page"><SiteHeader/><header className="design-system-hero"><Container><Badge variant="primary">STAGING PREVIEW</Badge><h1 className="ni-display">NI FUTURE<br/>Design System.</h1><p className="ni-body-lg">Fondasi visual untuk pengalaman siswa dan wali yang modern, terarah, hangat, serta siap berkembang.</p></Container></header>
    <Section><SectionHeader eyebrow="Color system" title="White, green, forest, neutral." description="Green menyampaikan pertumbuhan dan peluang. Forest memberi authority, sedangkan neutral menjaga informasi tetap tenang dan jelas."/><div className="ds-grid"><div className="ds-swatch ds-swatch--green">Primary · Green 700</div><div className="ds-swatch ds-swatch--forest">Authority · Forest 900</div><div className="ds-swatch ds-swatch--neutral">Surface · Neutral 100</div></div></Section>
    <Section tone="subtle"><SectionHeader eyebrow="Typography" title="Hierarki yang jelas, tanpa membebani layar kecil."/><div className="ni-card"><div className="ni-display">Future Starts Here.</div><h1 className="ni-h1">Temukan potensimu.</h1><h2 className="ni-h2">Bangun skill nyata.</h2><h3 className="ni-h3">Ciptakan masa depan.</h3><p className="ni-body-lg ni-muted">Body large membantu menjelaskan keputusan penting untuk siswa dan orang tua.</p><p className="ni-body ni-muted">Body menggunakan line-height nyaman untuk informasi pendidikan yang perlu dipahami dengan tenang.</p><span className="ni-label">Label / Eyebrow</span></div></Section>
    <Section><SectionHeader eyebrow="Buttons & dialog" title="Satu aksi dominan, state yang lengkap." description="Seluruh kontrol memiliki touch target minimal 44px dan focus ring yang konsisten."/><DesignSystemDemo/></Section>
    <Section tone="subtle"><SectionHeader eyebrow="Badges" title="Status informatif, bukan tombol."/><div className="ds-stack"><Badge>Neutral</Badge><Badge variant="primary">Primary</Badge><Badge variant="success">Success</Badge><Badge variant="warning">Warning</Badge><Badge variant="danger">Danger</Badge><Badge variant="info">Info</Badge></div></Section>
    <Section><SectionHeader eyebrow="Cards" title="Satu keluarga, peran yang berbeda."/><div className="ds-grid"><Card><Badge>Base</Badge><h3 className="ni-h3">Base Card</h3><p className="ni-muted">Informasi umum dengan border dan shadow ringan.</p></Card><Card variant="feature"><Badge variant="primary">Feature</Badge><h3 className="ni-h3">Feature Card</h3><p className="ni-muted">Penekanan halus untuk fitur utama.</p></Card><Card variant="program"><Badge variant="success">Program</Badge><h3 className="ni-h3">Program Card</h3><p className="ni-muted">Struktur pembelajaran dan jalur skill.</p></Card><Card variant="metric"><Badge variant="info">Metric</Badge><h3 className="ni-h3">24 proyek</h3><p className="ni-muted">Ringkas dan mudah dipindai.</p></Card><Card variant="result"><Badge variant="primary">Result</Badge><h3 className="ni-h3">Creative Visual</h3><p>Hasil pemetaan dengan authority tinggi.</p></Card><Card variant="admin"><Badge variant="warning">Admin</Badge><h3 className="ni-h3">12 lead baru</h3><p className="ni-muted">Lebih padat untuk workspace operasional.</p></Card></div></Section>
    <Section tone="forest"><SectionHeader eyebrow="Section system" title="Discover your potential. Build real skills. Create your future." description="Section forest dipakai hemat untuk area ber-authority tinggi dan momen transisi penting." align="center"/></Section>
    <SiteFooter/>
  </main>;
}
