import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = "http://localhost:3000";
const outputRoot = path.resolve("artifacts", "site-screenshots");
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputDir = path.join(outputRoot, timestamp);

const routes = [
  { slug: "01-ana-sayfa", url: "/" },
  { slug: "02-kurumsal", url: "/kurumsal" },
  { slug: "03-urunler", url: "/urunler" },
  { slug: "04-sektorel-cozumler", url: "/sektorel-cozumler" },
  { slug: "05-uretim-kalite", url: "/uretim-kalite" },
  { slug: "06-iletisim", url: "/iletisim" },
  { slug: "07-urun-oluklu-mukavva-levha", url: "/urunler/oluklu-mukavva-levha" },
  { slug: "08-urun-normal-kutu", url: "/urunler/normal-kutu" },
  { slug: "09-urun-teleskopik-kutu", url: "/urunler/teleskopik-kutu" },
  { slug: "10-urun-kalip-kesim-kutu", url: "/urunler/kalip-kesim-kutu" },
  { slug: "11-urun-ondule", url: "/urunler/ondule" },
  { slug: "12-urun-demonte-mobilya-kutulari", url: "/urunler/demonte-mobilya-kutulari" },
  { slug: "13-urun-ozel-olcu-kutu", url: "/urunler/ozel-olcu-kutu" },
  { slug: "14-urun-ozel-tasarim-ambalaj", url: "/urunler/ozel-tasarim-ambalaj" },
];

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 2000 },
  deviceScaleFactor: 1,
});

const page = await context.newPage();

for (const route of routes) {
  const targetUrl = new URL(route.url, baseUrl).toString();
  await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 60000 });
  await page.screenshot({
    path: path.join(outputDir, `${route.slug}.png`),
    fullPage: true,
  });
}

await browser.close();

console.log(outputDir);
