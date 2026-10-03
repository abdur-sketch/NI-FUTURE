import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("homepage exposes the conversion journey and required sections", async () => {
  const home = await read("app/page.tsx");
  for (const content of ["Kenali Potensimu", "Mulai Asesmen Gratis", "id=\"tentang\"", "id=\"eksplorasi\"", "id=\"program\"", "PREVIEW HASIL", "id=\"portofolio\"", "Ajukan Konsultasi", "id=\"faq\""]) assert.match(home, new RegExp(content));
  for (const program of ["Design Grafis", "Photography", "Video Editing", "Coding", "Digital Literacy", "Entrepreneurship"]) assert.match(home, new RegExp(program));
  assert.match(home, /Data demo/);
  assert.match(home, /bukan hasil siswa/);
});

test("public navigation has a mobile contract and excludes admin", async () => {
  const [header, footer] = await Promise.all([read("components/layout/SiteHeader.tsx"), read("components/layout/SiteFooter.tsx")]);
  for (const item of ["Beranda", "Tentang", "Eksplorasi Minat", "Program", "Portofolio", "FAQ", "Mulai Asesmen"]) assert.match(header, new RegExp(item));
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-controls/);
  assert.match(header, /aria-label=\{open \? "Tutup menu" : "Buka menu"\}/);
  assert.doesNotMatch(header + footer, /href="\/admin/);
  for (const item of ["Tentang", "Asesmen", "Program", "Portofolio", "FAQ", "Konsultasi", "Pondok Pesantren Nurul Iman"]) assert.match(footer, new RegExp(item));
});

test("FAQ extension implements accessible accordion semantics", async () => {
  const accordion = await read("components/ui/Accordion.tsx");
  for (const contract of [/aria-expanded/, /aria-controls/, /role="region"/, /aria-labelledby/, /type="button"/]) assert.match(accordion, contract);
});

test("homepage uses Phase 1 primitives and responsive safety rules", async () => {
  const [home, css, designSystem] = await Promise.all([read("app/page.tsx"), read("styles/home.css"), read("styles/design-system.css")]);
  for (const primitive of ["ButtonLink", "Card", "Badge", "Container", "Section", "SectionHeader", "Eyebrow", "SiteHeader", "SiteFooter"]) assert.match(home, new RegExp(primitive));
  assert.match(designSystem, /@import "\.\/home\.css"/);
  assert.match(css, /overflow: clip/);
  assert.match(css, /@media \(max-width: 390px\)/);
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("homepage work is presentation-only and preserves protected systems", async () => {
  const home = await read("app/page.tsx");
  assert.doesNotMatch(home, /firebase|firestore|api\/interest|api\/consultation|result-token|rate-limit/);
});
