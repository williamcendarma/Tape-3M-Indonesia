import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const page = read("app/page.jsx");
const css = read("app/globals.css");
const layout = read("app/layout.jsx");
const pkg = JSON.parse(read("package.json"));
const docs = read("README.md");
const sourceFiles = ["app/page.jsx", "app/globals.css", "app/layout.jsx", "app/icon.svg", "README.md", "package.json", "next.config.mjs", "jsconfig.json"];
const sections = [...page.matchAll(/<section\s/g)];
const heroBlock = page.match(/<h1 id="hero-title">([\s\S]*?)<\/h1>\s*<p>([\s\S]*?)<\/p>/);
const heroLines = heroBlock ? (heroBlock[1].match(/<br\s*\/>/g) || []).length + 1 : 0;
const heroWords = heroBlock ? heroBlock[2].replace(/<[^>]*>/g, "").trim().split(/\s+/).length : 0;
const ids = new Set([...page.matchAll(/\bid="([a-zA-Z][a-zA-Z0-9-]*)"/g)].map((m) => m[1]));
const anchors = [...page.matchAll(/\bhref="#([a-zA-Z][a-zA-Z0-9-]*)"/g)].map((m) => m[1]);
const imageFolder = path.join(root, "public/images");
const imageFiles = fs.readdirSync(imageFolder).filter((name) => name.endsWith(".webp"));
const forbiddenDashes = sourceFiles.flatMap((file) => {
  const content = read(file);
  return /[\u2013\u2014]/.test(content) ? [file] : [];
});
const layouts = ["hero-inner", "benefits-grid", "manifesto-layout", "products-grid", "story", "case-grid", "why-layout", "guide-layout", "steps-layout", "faq-layout", "finale-content"];
const checks = [
  ["01 App Router files", fs.existsSync(path.join(root, "app/page.jsx")) && fs.existsSync(path.join(root, "app/layout.jsx")), "Page dan root layout tersedia."],
  ["02 Dependencies", !!pkg.dependencies.next && !!pkg.dependencies.react && !!pkg.dependencies["react-dom"], "Next.js, React, dan React DOM terdefinisi."],
  ["03 Deployment scripts", pkg.scripts.build === "next build" && pkg.scripts.start === "next start", "Script build dan start kompatibel dengan Vercel."],
  ["04 Minimum sections", sections.length >= 8, `Ada ${sections.length} section utama.`],
  ["05 Layout variety", layouts.every((cls) => css.includes(`.${cls}`)), "Sedikitnya 4 keluarga layout ada di CSS."],
  ["06 Local visual assets", imageFiles.length >= 4 && imageFiles.every((name) => fs.statSync(path.join(imageFolder, name)).size > 1000), `Ada ${imageFiles.length} foto WebP lokal.`],
  ["07 Image accessibility", page.includes('alt="Berbagai gulungan tape') && page.includes('alt="Tangan merekatkan tape') && page.includes('alt={item.alt}'), "Image utama dan loop use case memiliki alt text."],
  ["08 Interactive navigation", page.includes('aria-expanded={menuOpen}') && page.includes('aria-controls="mobile-navigation"') && page.includes('id="mobile-navigation"'), "Menu mobile terhubung dengan kontrol semantik."],
  ["09 CTA target anchors", anchors.every((anchor) => ids.has(anchor)), "Semua anchor internal punya target ID."],
  ["10 Product filters", page.includes('setFilter(name)') && page.includes('aria-pressed={filter === name}'), "Filter dikontrol state dan memiliki status aksesibel."],
  ["11 Tape matcher", page.includes('setSelected(option.id)') && page.includes('aria-live="polite"'), "Pilihan rekomendasi diperbarui lewat state."],
  ["12 Native FAQ", page.includes('<details key={question}') && page.includes('<summary>'), "FAQ menggunakan details dan summary native."],
  ["13 Responsive and motion", css.includes('@media (max-width: 600px)') && css.includes('prefers-reduced-motion') && css.includes(':focus-visible'), "Ada breakpoint mobile, fokus keyboard, dan reduced motion."],
  ["14 Punctuation audit", forbiddenDashes.length === 0, forbiddenDashes.length ? `Tanda baca terlarang ditemukan di ${forbiddenDashes.join(', ')}` : "Nol em dash atau en dash di sumber."],
];
const longest = Math.max(...checks.map(([name]) => name.length));
console.log("TAPE 3M | PREFLIGHT 14 CHECKS\n");
for (const [name, pass, reason] of checks) console.log(`[${pass ? "PASS" : "FAIL"}] ${name.padEnd(longest)} | ${reason}`);
console.log(`\nHERO AUDIT: ${heroLines} headline lines, ${heroWords} subtext words; CTA in hero: ${page.includes('hero-actions') ? 'YES' : 'NO'}.`);
console.log(`LAYOUT AUDIT: ${layouts.length} CSS layout groups, ${sections.length} sections.`);
if(checks.some(([, pass]) => !pass)) process.exitCode = 1;
