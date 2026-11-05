# Tape 3M | Editorial Marketing Landing Page

Satu halaman Next.js App Router, berbahasa Indonesia, dengan desain editorial industrial, empat foto konseptual lokal, katalog dengan filter, panduan memilih tape yang interaktif, FAQ, dan tautan ke katalog resmi 3M Indonesia.

> Ini adalah **konsep pemasaran independen**. Bukan situs resmi 3M, situs toko, atau bukti adanya hubungan komersial dengan 3M. Pastikan Anda memiliki izin dan hak yang diperlukan untuk menggunakan merek terkait sebelum publikasi komersial.

## Menjalankan website

**Persyaratan:** Node.js 20.9 atau lebih baru dan npm.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Untuk mengecek build produksi:

```bash
npm run build
npm run start
```

## Cara upload ke GitHub dan deploy ke Vercel

1. Buat repository kosong di GitHub, misalnya `tape3m-landing`.
2. Ekstrak ZIP ini, buka terminal di folder `tape3m-landing` (folder yang memiliki `package.json`).
3. Jalankan perintah ini dengan mengganti URL repository Anda:

```bash
git init
git add .
git commit -m "Initial Tape 3M landing page"
git branch -M main
git remote add origin https://github.com/USERNAME/tape3m-landing.git
git push -u origin main
```

4. Buka [vercel.com/new](https://vercel.com/new), pilih **Import Git Repository**, lalu pilih repository tersebut.
5. Gunakan konfigurasi bawaan Vercel: Framework Preset **Next.js**, Build Command **npm run build**, Output Directory **default**.
6. Klik **Deploy**. Tidak memerlukan database, API key, layanan gambar eksternal, atau environment variable untuk fungsi dasar.
7. Jika sudah mempunyai custom domain, opsional tambahkan `NEXT_PUBLIC_SITE_URL=https://domainanda.com` pada Vercel Environment Variables agar metadata sosial menggunakan domain tersebut.

## Struktur proyek

```text
tape3m-landing/
  app/
    globals.css        # Seluruh visual dan breakpoint responsif
    icon.svg           # Favicon konsep
    layout.jsx         # SEO metadata dan layout utama
    page.jsx           # Seluruh konten, filter, quiz, header, FAQ
  public/
    images/
      hero.webp
      packing.webp
      craft.webp
      industrial.webp
  .gitignore
  jsconfig.json
  next.config.mjs
  package.json
  README.md
```

## Apa yang sudah berfungsi

- Navigasi anchor, tombol CTA, dan menu mobile.
- Filter produk berdasarkan Rumah, Sekolah, Kantor, atau Industri.
- Pemilih tape berdasarkan enam jenis kebutuhan, dengan kategori dan keterangan yang berganti sesuai pilihan.
- Accordion FAQ menggunakan elemen HTML native.
- Tautan ke katalog tape resmi 3M Indonesia, dengan tab baru.
- Gambar lokal `.webp` dan atribut alternatif untuk aksesibilitas.
- Breakpoint responsif hingga layar kecil, focus ring, skip link, dan dukungan reduced motion.

## Mengubah konten

- Ganti isi dan filter produk pada `PRODUCTS` dan `FILTERS` di `app/page.jsx`.
- Ubah panduan interaktif pada `GUIDE_OPTIONS` di `app/page.jsx`.
- Ubah URL katalog resmi pada `OFFICIAL_CATALOG` di bagian atas `app/page.jsx`.
- Ubah warna, font, spacing, serta komposisi pada `app/globals.css`.
- Semua foto ada di `public/images`. Gambar tersebut adalah **gambar ilustrasi konseptual yang digenerasikan khusus**, bukan hasil foto produk resmi 3M dan tidak menyatakan detail spesifik suatu SKU.
- Tautan ecommerce dan formulir kontak **tidak dibuat** karena URL toko, akun bisnis, dan data kontak pengguna belum diberikan. Jangan memasukkan kontak palsu.

## Catatan aset dan hak merek

Visual dan copy halaman ini dibuat untuk proyek ini. Varian kategori disusun berdasarkan katalog tape di https://www.3m.co.id/3M/en_ID/p/c/tapes/ . Periksa ulang spesifikasi, ketersediaan, penggunaan teknis, dan hak penggunaan merek sebelum situs digunakan untuk promosi komersial.

## Audit dan GitHub Actions

Jalankan `npm run preflight` untuk menjalankan 14 pemeriksaan statis. Lihat `AUDIT.md` untuk audit layout, hero, dan tanda baca. Workflow `.github/workflows/verify.yml` akan memeriksa sumber serta build produksi ketika kode dipush ke GitHub.

Catatan: pada saat pembuatan paket ini, `npm run build` belum dapat dijalankan karena jaringan npm registry tidak tersedia di lingkungan pembuat. Build akan diuji secara otomatis lewat GitHub Actions setelah kode dipush.
