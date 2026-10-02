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
- Persistent Cloud Firestore storage
- Dashboard admin dengan signed, HTTP-only session cookie

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
```

`npm test` menjalankan production build dan pengujian untuk alur inti serta mesin scoring.

## Deployment Firebase

Konfigurasi Firebase App Hosting, Firestore, dan runtime tersedia di `firebase.json`, `firestore.rules`, serta `apphosting.yaml`. Deploy dari root proyek dengan:

```bash
npx firebase-tools deploy --only firestore:rules,apphosting:ni-future
```

## Data dan keamanan

Data lead, konsultasi, dan hasil minat disimpan di Cloud Firestore region Singapura. Endpoint publik melakukan validasi server-side dan pembatasan permintaan per nomor WhatsApp. Dashboard admin dilindungi oleh kredensial server-side dan cookie sesi HTTP-only. Firestore Security Rules menolak akses langsung dari browser; operasi data hanya berjalan melalui server aplikasi.

Galeri karya, testimonial, nominal biaya, dan program keringanan tidak diisi dengan data rekaan. Empty state ditampilkan sampai konten resmi tersedia.

Dokumentasi operasional:

- [Current data contract](docs/DATA_CONTRACT.md)
- [Backup and recovery](docs/RECOVERY.md)
- [Environment isolation](docs/ENVIRONMENTS.md)
