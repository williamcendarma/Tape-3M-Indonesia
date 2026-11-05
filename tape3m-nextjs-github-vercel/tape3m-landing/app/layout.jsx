import "./globals.css";

const title = "Tape 3M | Solusi Perekat untuk Setiap Ide";
const description =
  "Eksplorasi berbagai jenis tape 3M untuk rumah, sekolah, kantor, dan industri. Temukan pilihan yang sesuai dengan kebutuhan Anda.";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title,
  description,
  applicationName: "Tape 3M Editorial Catalog",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "id_ID",
    images: [
      { url: "/images/hero.webp", width: 1536, height: 1024, alt: "Koleksi tape dalam foto studio" },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
