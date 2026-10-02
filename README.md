# NI FUTURE

Interactive SPMB Experience untuk SMK Nurul Iman.

> Lanjutkan Perjalanan. Siapkan Masa Depan.

## MVP

- Landing experience untuk wali dan siswa
- Presentation mode 18 slide dengan keyboard, fullscreen, dan QR dinamis
- Pemetaan minat 10 pertanyaan dengan scoring deterministik
- Halaman hasil personal
- Lead capture dan konsultasi
- Informasi program 3 tahun, karya, dan biaya
- Dashboard lead SPMB dengan WhatsApp assist
- Persistent Cloudflare D1 storage dan Drizzle migrations
- SIWC-protected admin surface pada deployment

## Menjalankan lokal

Memerlukan Node.js 22.13 atau lebih baru.

```bash
npm install
npm run dev
```

Kemudian buka `http://localhost:3000`.

## Validasi

```bash
npm run lint
npm test
npm run db:generate
```

`npm test` menjalankan production build dan pengujian untuk alur inti serta mesin scoring.

## Data dan keamanan

Data lead, konsultasi, dan hasil minat disimpan di D1. Endpoint publik melakukan validasi server-side dan pembatasan permintaan per nomor WhatsApp. Dashboard admin menggunakan identitas yang diteruskan platform Sites; deployment awal sebaiknya tetap privat sampai daftar admin dan konten resmi sekolah ditetapkan.

Galeri karya, testimonial, nominal biaya, dan program keringanan tidak diisi dengan data rekaan. Empty state ditampilkan sampai konten resmi tersedia.
