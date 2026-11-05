# Step 3 | Audit Website Tape 3M

Audit dilakukan pada sumber kode proyek. File `scripts/preflight.mjs` menjalankan 14 pemeriksaan statis dan menghentikan proses apabila ada FAIL. Semua pemeriksaan di bawah telah lulus.

## A. Em-dash audit

**PASS**. Tidak ada U+2014 (em dash) dan U+2013 (en dash) pada halaman, CSS, layout, favicon, konfigurasi, atau dokumentasi proyek. Tanda hubung ASCII biasa pada kode tetap diperbolehkan.

## B. Pre-Flight Check | Section 14

| No. | Status | Pemeriksaan | Justifikasi |
| --- | --- | --- | --- |
| 01 | PASS | App Router | `app/page.jsx` dan `app/layout.jsx` tersedia. |
| 02 | PASS | Dependencies | Next.js, React, dan React DOM tercantum dalam `package.json`. |
| 03 | PASS | Deployment scripts | `next build` dan `next start` tersedia untuk Vercel. |
| 04 | PASS | Jumlah section | Terdapat 11 section utama, melebihi minimum 8. |
| 05 | PASS | Variasi layout | Ada lebih dari 4 layout families dalam CSS. |
| 06 | PASS | Gambar | Empat gambar WebP tersedia di folder `public/images`. |
| 07 | PASS | Aksesibilitas foto | Foto utama dan foto pada kartu kegunaan memiliki teks alternatif. |
| 08 | PASS | Navigasi | Tombol menu mobile memiliki state dan atribut ARIA. |
| 09 | PASS | Link internal | Semua tautan anchor dalam kode memiliki target ID. |
| 10 | PASS | Filter produk | Status filter terkoneksi dengan React state dan `aria-pressed`. |
| 11 | PASS | Product matcher | Opsi diproses dalam state dan hasilnya diumumkan dengan `aria-live`. |
| 12 | PASS | FAQ | FAQ dibuat dengan elemen HTML native `details` dan `summary`. |
| 13 | PASS | Responsivitas | Ada breakpoint mobile, fokus keyboard, dan dukungan reduced motion. |
| 14 | PASS | Tanda baca | Tidak ada U+2014 atau U+2013 dalam sumber yang diaudit. |

**Hasil otomatis:** 14 PASS, 0 FAIL. Jalankan ulang dengan `npm run preflight`.

## C. Section Layout Repetition Audit

| Section | Layout family |
| --- | --- |
| 01 Hero | Asymmetric 2-column split plus large imagery |
| 02 Benefit strip | Four-column compact information band |
| 03 Manifesto | Editorial typography with offset introduction |
| 04 Product catalog | Filter controls plus 3-column product grid |
| 05 Daily usage story | Full-height photographic and dark editorial split |
| 06 Four use cases | Asymmetric two-column photography mosaic |
| 07 Why choose | Typographic split with numbered vertical list |
| 08 Tape matcher | Two-column interactive selection panel |
| 09 How to choose | Image and numbered process list |
| 10 FAQ | Introductory copy paired with native accordion |
| 11 Final CTA | Full-bleed red typographic campaign panel |

**PASS.** Tidak ada dua section berurutan dengan layout family identik. Grid, split, editorial text, strip, mosaic, list, interaction panel, accordion, dan full-bleed CTA memberi ritme visual yang bervariasi.

## D. Hero Discipline Audit

- **PASS: Headline** terdiri dari tepat 3 baris eksplisit pada desktop. Teks: `Yang penting,` / `menempel` / `dengan tepat.`
- **PASS: Subtext** terdiri dari 17 kata, cukup ringkas untuk dipindai.
- **PASS: CTA visibility** tombol utama `Jelajahi pilihan tape` diletakkan langsung setelah subtext, di dalam hero tanpa perlu mengunjungi section lain. Tombol kedua `Bantu saya memilih` menuju matcher.
- **PASS: Hierarki** label kecil, judul utama, subtext, dan CTA ditata berurutan.
- **PASS: Foto** hero menggunakan WebP lokal tanpa dependensi gambar eksternal.

## E. Batas pemeriksaan teknis

Pemeriksaan JSX menggunakan transpiler TypeScript selesai tanpa diagnostic error. Pemeriksaan statis juga berhasil dijalankan langsung melalui Node.js.

**Build produksi Next.js belum diverifikasi dalam lingkungan pembuatan file** karena koneksi npm registry tidak tersedia untuk menginstal paket `next`, `react`, dan `react-dom`. Kondisi ini bukan bukti bahwa aplikasi gagal build. GitHub Actions di `.github/workflows/verify.yml` telah disertakan agar `npm install`, `npm run preflight`, dan `npm run build` dijalankan otomatis saat repository dipush.

**Deployment Vercel belum dilakukan** karena tidak ada repository dan akun Vercel pengguna yang dituju. Ikuti README untuk proses deploy. Jangan menganggap sumber kode saja sebagai bukti website sudah live.
