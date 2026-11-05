"use client";

import Image from "next/image";
import { useState } from "react";

const OFFICIAL_CATALOG = "https://www.3m.co.id/3M/en_ID/p/c/tapes/";
const FILTERS = ["Semua", "Rumah", "Sekolah", "Kantor", "Industri"];

const PRODUCTS = [
  {
    id: "clear",
    no: "01",
    type: "TAPE TRANSPARAN",
    title: "Clear Tape",
    copy: "Untuk keperluan menempel dokumen, kemasan ringan, dan tugas sehari-hari.",
    note: "Praktis untuk hal-hal kecil.",
    tags: ["Rumah", "Sekolah", "Kantor"],
    color: "#E6C78C",
    bg: "#F6F0E5",
  },
  {
    id: "masking",
    no: "02",
    type: "MASKING TAPE",
    title: "Masking Tape",
    copy: "Membantu membatasi area saat mengecat, membuat label, dan pekerjaan kreatif.",
    note: "Beri batas, lalu berkreasi.",
    tags: ["Rumah", "Sekolah", "Industri"],
    color: "#C9AA76",
    bg: "#EFE9DC",
  },
  {
    id: "double",
    no: "03",
    type: "DOUBLE SIDED TAPE",
    title: "Double Sided",
    copy: "Perekat dua sisi untuk menempelkan material pada aplikasi yang sesuai.",
    note: "Rapi dari dua sisi.",
    tags: ["Rumah", "Sekolah", "Kantor"],
    color: "#F0E8D6",
    bg: "#EFEDE7",
  },
  {
    id: "packaging",
    no: "04",
    type: "PACKAGING TAPE",
    title: "Packaging Tape",
    copy: "Membantu menutup karton dan menyiapkan paket sebelum dikirim.",
    note: "Saatnya kirim dengan rapi.",
    tags: ["Rumah", "Kantor", "Industri"],
    color: "#C9924D",
    bg: "#F3EADF",
  },
  {
    id: "duct",
    no: "05",
    type: "DUCT TAPE",
    title: "Duct Tape",
    copy: "Untuk berbagai kebutuhan perbaikan dan pekerjaan serbaguna sesuai spesifikasi produk.",
    note: "Siap untuk proyek berikutnya.",
    tags: ["Rumah", "Industri"],
    color: "#81858A",
    bg: "#E8EAEB",
  },
  {
    id: "electrical",
    no: "06",
    type: "ELECTRICAL TAPE",
    title: "Electrical Tape",
    copy: "Pita khusus pekerjaan kelistrikan. Sesuaikan tipe dan rating dengan aplikasi.",
    note: "Gunakan sesuai standar kerja.",
    tags: ["Industri"],
    color: "#292D35",
    bg: "#E4E5E8",
  },
];

const GUIDE_OPTIONS = [
  { id: "paket", label: "Mengemas paket", product: "Packaging Tape", productId: "packaging", help: "Pilih tape kemasan sesuai jenis karton, berat paket, dan kondisi pengiriman." },
  { id: "cat", label: "Mengecat atau DIY", product: "Masking Tape", productId: "masking", help: "Pertimbangkan jenis permukaan dan lama tape menempel sebelum dilepas." },
  { id: "tugas", label: "Tugas dan dokumen", product: "Clear Tape", productId: "clear", help: "Untuk kertas, label, dan pemakaian ringan, mulai dari tape transparan." },
  { id: "menempel", label: "Menempel dua permukaan", product: "Double Sided", productId: "double", help: "Perhatikan material, kondisi permukaan, dan beban. Gunakan produk khusus bila dibutuhkan." },
  { id: "perbaikan", label: "Perbaikan serbaguna", product: "Duct Tape", productId: "duct", help: "Cek ketahanan, jenis permukaan, dan kondisi penggunaan sebelum memilih." },
  { id: "listrik", label: "Pekerjaan kelistrikan", product: "Electrical Tape", productId: "electrical", help: "Pastikan spesifikasi dan rating tape sesuai pekerjaan. Ikuti prosedur keselamatan kelistrikan." },
];

function Arrow({ diagonal = false }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M7 5h12v12" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
  );
}

function Starburst() {
  return (
    <svg aria-hidden="true" className="starburst" viewBox="0 0 120 120" fill="none">
      <path d="m60 1 9 24 20-17-2 27 27-5-17 20 23 10-23 10 17 20-27-5 2 27-20-17-9 24-9-24-20 17 2-27-27 5 17-20L0 60l23-10L6 30l27 5-2-27 20 17z" fill="#F6C945" />
      <path d="M43 61h34M60 44v34" stroke="#171717" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TapeRoll({ product }) {
  return (
    <div className={`tape-art tape-art-${product.id}`} style={{ "--roll": product.color }} aria-hidden="true">
      <span className="tape-shadow" />
      <span className="tape-ring"><span className="tape-core"><span>3M</span></span></span>
      <span className="tape-loose" />
    </div>
  );
}

function SectionTop({ number, label, light = false }) {
  return <div className={`section-top ${light ? "section-top-light" : ""}`}><span>{number} / {label}</span><span className="section-top-line" /></div>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "#produk", title: "Pilihan Tape" },
    { href: "#kegunaan", title: "Kegunaan" },
    { href: "#keunggulan", title: "Kenapa 3M" },
    { href: "#panduan", title: "Cari yang Pas" },
  ];
  return (
    <header className="site-header">
      <div className="nav-container container">
        <a className="brand" href="#beranda" aria-label="Tape 3M kembali ke beranda" onClick={() => setMenuOpen(false)}><span className="brand-3m">3M</span><span className="brand-divider" /><span className="brand-tape">TAPE<br />EDITION</span></a>
        <nav id="mobile-navigation" className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Navigasi utama">
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.title}</a>)}
          <a className="mobile-nav-cta" href="#panduan" onClick={() => setMenuOpen(false)}>Mulai cari tape <Arrow /></a>
        </nav>
        <a className="nav-cta" href="#panduan">Temukan Tape <Arrow diagonal /></a>
        <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" type="button" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="beranda" aria-labelledby="hero-title">
      <div className="hero-inner container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="red-dot" />BUILT TO STICK. MADE FOR LIFE.</div>
          <h1 id="hero-title">Yang penting,<br /><em>menempel</em><br />dengan tepat<span className="period">.</span></h1>
          <p>Dari tugas sekolah sampai pekerjaan industri, temukan pilihan tape 3M untuk merekatkan, melindungi, mengemas, dan merapikan pekerjaanmu.</p>
          <div className="hero-actions">
            <a href="#produk" className="btn btn-red">Jelajahi pilihan tape <Arrow /></a>
            <a href="#panduan" className="text-link">Bantu saya memilih <Arrow diagonal /></a>
          </div>
          <div className="hero-bottom-note"><span>01 / 04</span><span>RUMAH. SEKOLAH. KANTOR. INDUSTRI.</span></div>
        </div>
        <div className="hero-media">
          <Image src="/images/hero.webp" alt="Berbagai gulungan tape bening, masking, dan tape berwarna dalam foto studio" fill priority sizes="(max-width: 860px) 100vw, 52vw" className="cover hero-image" />
          <span className="hero-photo-caption">SOLUSI YANG PAS UNTUK SETIAP PROYEK</span>
          <div className="hero-roundel"><span>SIMPLE<br />BUT<br />STRONG.</span><Arrow diagonal /></div>
        </div>
      </div>
      <div className="hero-edge-text" aria-hidden="true">STICK WITH PURPOSE / STICK WITH PURPOSE / STICK WITH PURPOSE</div>
    </section>
  );
}

function BenefitsStrip() {
  return (
    <section className="benefits-strip" aria-label="Nilai utama tape 3M">
      <div className="container benefits-grid">
        {[
          ["01", "Kuat", "Pilihan untuk beragam kebutuhan rekat"],
          ["02", "Praktis", "Mudah dipakai di banyak kegiatan"],
          ["03", "Serbaguna", "Dari proyek kecil sampai pekerjaan besar"],
          ["04", "Berkualitas", "Berbagai varian untuk kebutuhan berbeda"],
        ].map(([num, title, caption]) => <div className="benefit" key={num}><span className="benefit-num">{num}.</span><div><strong>{title}</strong><p>{caption}</p></div></div>)}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto section-padding" id="cerita">
      <div className="container manifesto-layout">
        <SectionTop number="01" label="SESUATU YANG SERING TERLUPAKAN" />
        <div className="manifesto-body">
          <p className="manifesto-kicker">Kadang yang kecil justru menyelesaikan banyak hal.</p>
          <h2>Satu gulung.<br />Ribuan <span className="underline-swoosh">kemungkinan.</span></h2>
          <div className="manifesto-bottom"><span className="mini-asterisk">✳</span><p>Menyambungkan ide, menjaga paket tetap tertutup, atau membantu proyek jadi lebih rapi. Tape yang tepat punya peran di setiap prosesnya.</p></div>
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  const [filter, setFilter] = useState("Semua");
  const filtered = PRODUCTS.filter((product) => filter === "Semua" || product.tags.includes(filter));
  return (
    <section className="catalog section-padding" id="produk" aria-labelledby="catalog-title">
      <div className="container">
        <SectionTop number="02" label="KENALI PILIHANNYA" />
        <div className="section-header catalog-header"><div><p className="section-kicker">THE TAPE LINEUP</p><h2 id="catalog-title">Beda tugas.<br /><span>Beda tape.</span></h2></div><p>Setiap pekerjaan punya detailnya sendiri. Cari jenis tape yang mendekati kebutuhanmu, lalu periksa spesifikasi produk sebelum dipakai.</p></div>
        <div className="filter-row" aria-label="Filter kategori berdasarkan kebutuhan">
          <span className="filter-label">FILTER BERDASARKAN</span>
          <div className="filter-buttons">{FILTERS.map((name) => <button type="button" key={name} className={`filter-button ${filter === name ? "active" : ""}`} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div>
          <span className="filter-count" aria-live="polite">{String(filtered.length).padStart(2, "0")} PRODUK</span>
        </div>
        <div className="products-grid">
          {filtered.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-visual" style={{ "--product-bg": product.bg }}><div className="product-card-top"><span>{product.no} / 06</span><span>3M TAPE GUIDE</span></div><TapeRoll product={product} /><span className="visual-caption">ILUSTRASI JENIS TAPE</span></div>
              <div className="product-info"><span className="product-type">{product.type}</span><h3>{product.title}</h3><p>{product.copy}</p><div className="product-bottom"><span>{product.note}</span><a href={OFFICIAL_CATALOG} target="_blank" rel="noopener noreferrer" aria-label={`Lihat pilihan ${product.title} pada katalog resmi 3M`}><Arrow diagonal /></a></div></div>
            </article>
          ))}
        </div>
        <p className="catalog-note">* Visual gulungan merupakan ilustrasi kategori, bukan foto SKU tertentu. Spesifikasi, ukuran, dan ketersediaan mengikuti produk 3M yang dipilih.</p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story" id="kegunaan">
      <div className="story-image"><Image src="/images/packing.webp" alt="Tangan merekatkan tape bening pada kotak kardus di meja kerja" fill sizes="(max-width: 860px) 100vw, 55vw" className="cover" /><div className="story-image-label">KERJA KECIL. HASIL BERARTI.</div></div>
      <div className="story-content"><SectionTop number="03" label="PAKAI SETIAP HARI" light /><Starburst /><h2>Bukan cuma<br /><i>menempel.</i><br />Ini soal<br />menyelesaikan.</h2><p>Dari packing pesanan pertama sampai memperbaiki sesuatu di rumah, tape yang tepat membantu pekerjaan terasa lebih sederhana.</p><a className="story-link" href="#panduan">Temukan kegunaannya <Arrow /></a></div>
    </section>
  );
}

function UseCases() {
  const items = [
    { title: "Untuk si penuh ide.", type: "PELAJAR & KREATOR", body: "Bikin proyek, menata catatan, dan memberi ruang untuk bereksperimen.", image: "/images/craft.webp", alt: "Tangan membuat kolase dan menempel masking tape di meja kreatif", cls: "case-large" },
    { title: "Untuk yang serba cepat.", type: "KERJA & KANTOR", body: "Merapikan dokumen, perlengkapan, dan paket kecil.", image: "/images/packing.webp", alt: "Proses menyegel kardus dengan tape bening", cls: "case-small" },
    { title: "Untuk rumah yang aktif.", type: "RUMAH TANGGA", body: "Membantu beres-beres, kreasi, dan kebutuhan sehari-hari.", image: "/images/hero.webp", alt: "Berbagai gulungan tape tersedia di meja", cls: "case-small" },
    { title: "Untuk pekerjaan serius.", type: "INDUSTRI & OPERASIONAL", body: "Membantu pengemasan, penandaan, dan pekerjaan sesuai standar.", image: "/images/industrial.webp", alt: "Pekerja memakai duct tape untuk menutup kotak di gudang", cls: "case-large" },
  ];
  return (
    <section className="usecases section-padding" aria-labelledby="usecase-title">
      <div className="container"><SectionTop number="04" label="SATU HARI, BANYAK CERITA" /><div className="section-header usecase-header"><h2 id="usecase-title">Ada di balik<br /><em>banyak hal.</em></h2><p>Empat dunia, beragam kebutuhan. Dari kelas sampai lantai produksi, selalu ada pekerjaan yang membutuhkan perekat yang tepat.</p></div>
        <div className="case-grid">{items.map((item, index) => <article className={`case-card ${item.cls}`} key={item.type}><Image src={item.image} alt={item.alt} fill sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 60vw" className="cover" /><div className="case-overlay" /><span className="case-number">{String(index + 1).padStart(2, "0")} / 04</span><div className="case-copy"><p>{item.type}</p><h3>{item.title}</h3><span>{item.body}</span></div></article>)}</div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="why section-padding" id="keunggulan" aria-labelledby="why-title">
      <div className="container"><SectionTop number="05" label="BICARA SOAL KEBUTUHAN" /><div className="why-layout"><div className="why-title"><span className="why-decor">✳</span><h2 id="why-title">Pilih tepat.<br /><span>Kerja mantap.</span></h2><p>Bukan mencari satu tape untuk semua hal. Kuncinya adalah memilih jenis perekat yang memang sesuai dengan pekerjaan.</p><a className="text-link dark-link" href="#panduan">Cari yang cocok <Arrow diagonal /></a></div><div className="why-list">{[
        ["01", "Ragam pilihan", "Tape bening, masking, dua sisi, kemasan, dan opsi khusus untuk kebutuhan berbeda."],
        ["02", "Penggunaan praktis", "Pilih ukuran dan bentuk yang sesuai agar pekerjaan terasa lebih efisien."],
        ["03", "Pilihan yang terarah", "Pertimbangkan permukaan, kondisi, dan tujuan penggunaan sebelum membeli."],
      ].map(([num, title, body]) => <div className="why-item" key={num}><span>{num}</span><div><h3>{title}</h3><p>{body}</p></div><Arrow diagonal /></div>)}</div></div></div>
    </section>
  );
}

function Guide() {
  const [selected, setSelected] = useState("paket");
  const chosen = GUIDE_OPTIONS.find((item) => item.id === selected);
  return (
    <section className="guide section-padding" id="panduan" aria-labelledby="guide-title">
      <div className="container"><SectionTop number="06" label="PILIHAN YANG LEBIH MUDAH" /><div className="guide-layout"><div className="guide-intro"><span className="guide-tag"><span className="small-star">✳</span> TAPE MATCHER</span><h2 id="guide-title">Lagi butuh<br />tape buat <i>apa?</i></h2><p>Pilih aktivitasmu. Kami bantu mengarahkan ke kategori tape yang bisa kamu pelajari lebih lanjut.</p><div className="guide-pattern" aria-hidden="true"><span /><span /><span /></div></div><div className="guide-panel"><p className="panel-label">PILIH SATU KEBUTUHAN</p><div className="choice-grid" role="group" aria-label="Jenis pekerjaan">{GUIDE_OPTIONS.map((option) => <button type="button" className={`choice ${selected === option.id ? "selected" : ""}`} onClick={() => setSelected(option.id)} aria-pressed={selected === option.id} key={option.id}><span className="choice-radio" /><span>{option.label}</span><Arrow diagonal /></button>)}</div><div className="result" aria-live="polite"><p>REKOMENDASI KATEGORI</p><h3>{chosen.product}</h3><span>{chosen.help}</span><a href={OFFICIAL_CATALOG} target="_blank" rel="noopener noreferrer" className="result-link">Lihat katalog resmi 3M <Arrow diagonal /></a></div></div></div><p className="guide-disclaimer">Hasil panduan bersifat informasi umum, bukan verifikasi kompatibilitas atau rekomendasi teknis untuk SKU tertentu.</p></div>
    </section>
  );
}

function Steps() {
  return (
    <section className="steps section-padding" aria-labelledby="steps-title"><div className="container"><SectionTop number="07" label="CARA PILIH YANG BIJAK" /><div className="steps-layout"><div className="steps-title"><h2 id="steps-title">Tiga cek.<br /><em>Sebelum rekat.</em></h2><div className="steps-image"><Image src="/images/craft.webp" alt="Masking tape digunakan pada proyek kerajinan" fill sizes="(max-width: 860px) 100vw, 42vw" className="cover" /></div></div><ol className="steps-list"><li><span>01</span><div><h3>Kenali permukaannya.</h3><p>Kertas, karton, plastik, logam, atau dinding bisa membutuhkan tipe tape yang berbeda.</p></div></li><li><span>02</span><div><h3>Pikirkan situasinya.</h3><p>Apakah untuk sementara, jangka panjang, di dalam ruangan, atau kondisi khusus?</p></div></li><li><span>03</span><div><h3>Cek spesifikasi produknya.</h3><p>Pastikan ukuran, daya rekat, batas suhu, dan petunjuk penggunaan cocok dengan pekerjaanmu.</p></div></li></ol></div></div></section>
  );
}

function FAQ() {
  const questions = [
    ["Apa semua tape 3M bisa dipakai untuk semua permukaan?", "Tidak. Setiap jenis tape memiliki karakteristik dan penggunaan yang berbeda. Periksa spesifikasi tipe yang dipilih, kondisi permukaan, serta petunjuk aplikasi sebelum digunakan."],
    ["Apa bedanya masking tape dengan clear tape?", "Masking tape umumnya dipakai pada pekerjaan seperti pengecatan, penandaan, dan aktivitas kreatif. Clear tape cocok untuk berbagai keperluan ringan seperti kertas dan kemasan tertentu. Hasil akhir tergantung produk spesifik."],
    ["Jenis tape apa yang cocok untuk mengemas paket?", "Mulailah dengan kategori packaging atau box sealing tape. Sesuaikan pilihan dengan bahan kardus, berat, lama penyimpanan, dan kondisi pengiriman."],
    ["Apakah ukuran dan varian tape selalu sama?", "Tidak. Ukuran, ketebalan, bahan, dan spesifikasi dapat berbeda antar varian. Lihat katalog resmi 3M atau kemasan produknya untuk informasi yang sesuai."],
    ["Apakah ini toko atau website resmi 3M?", "Bukan. Halaman ini adalah konsep marketing dan panduan kategori yang dibuat secara independen. Untuk informasi resmi dan pilihan produk terkini, kunjungi situs resmi 3M Indonesia."],
  ];
  return (
    <section className="faq section-padding" id="faq" aria-labelledby="faq-title"><div className="container"><SectionTop number="08" label="PERTANYAAN YANG SERING MUNCUL" /><div className="faq-layout"><div><h2 id="faq-title">Masih ada<br /><em>yang mengganjal?</em></h2><p>Jawaban singkat untuk hal-hal yang sering ditanyakan sebelum memilih tape.</p></div><div className="faq-items">{questions.map(([question, answer], i) => <details key={question} className="faq-item"><summary><span className="faq-id">{String(i + 1).padStart(2, "0")}</span><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></div></section>
  );
}

function Finale() {
  return (
    <section className="finale" aria-labelledby="finale-title"><div className="container finale-content"><div className="finale-heading"><p>SEKARANG GILIRAN PROYEKMU.</p><h2 id="finale-title">Good ideas<br /><i>stick.</i></h2></div><div className="finale-action"><p>Sesederhana memilih tape yang sesuai, lalu mulai mengerjakan apa yang ada di depanmu.</p><a className="btn btn-cream" href="#panduan">Temukan tape yang pas <Arrow /></a><a className="finale-secondary" href={OFFICIAL_CATALOG} target="_blank" rel="noopener noreferrer">Katalog resmi 3M <Arrow diagonal /></a></div><span className="finale-decoration" aria-hidden="true">3M</span></div></section>
  );
}

function Footer() {
  return (
    <footer className="footer"><div className="container"><div className="footer-top"><a href="#beranda" className="footer-brand" aria-label="Kembali ke beranda">3M<span> / TAPE EDITION</span></a><p>Pilihan kecil yang bisa membuat<br />pekerjaan berjalan lebih baik.</p><a href="#beranda" className="back-top">Kembali ke atas <span>↑</span></a></div><div className="footer-links"><div><span>JELAJAHI</span><a href="#produk">Jenis tape</a><a href="#kegunaan">Kegunaan</a><a href="#panduan">Panduan memilih</a><a href="#faq">FAQ</a></div><div><span>SUMBER RESMI</span><a href={OFFICIAL_CATALOG} target="_blank" rel="noopener noreferrer">3M Indonesia <Arrow diagonal /></a><a href="https://www.3m.co.id/" target="_blank" rel="noopener noreferrer">Website 3M <Arrow diagonal /></a></div><div className="footer-legal"><span>TENTANG HALAMAN INI</span><p>Ini adalah konsep situs marketing independen, bukan situs resmi, perwakilan, atau toko 3M. Nama 3M, Scotch, dan merek terkait adalah milik pemegang haknya. Foto merupakan ilustrasi konseptual, bukan foto produk resmi.</p></div></div><div className="footer-bottom"><span>© 2026 TAPE EDITION. CONCEPT WEBSITE.</span><span>MADE FOR THE EVERYDAY FIX.</span></div></div></footer>
  );
}

export default function Home() {
  return <><a className="skip-link" href="#konten">Lewati navigasi</a><Header /><main id="konten"><Hero /><BenefitsStrip /><Manifesto /><Catalog /><Story /><UseCases /><WhyChoose /><Guide /><Steps /><FAQ /><Finale /></main><Footer /></>;
}
