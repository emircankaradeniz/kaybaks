import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://kaybaks-awes.vercel.app";
const output = path.resolve("ihs-static");
const routes = [
  "/",
  "/kurumsal",
  "/urunler",
  "/urunler/oluklu-mukavva-levha",
  "/urunler/normal-kutu",
  "/urunler/kalip-kesim-kutu",
  "/urunler/teleskopik-kutu",
  "/urunler/ondule",
  "/urunler/demonte-mobilya-kutulari",
  "/sektorel-cozumler",
  "/uretim-kalite",
  "/iletisim",
];

const assets = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/favicon-16.png",
  "/favicon-32.png",
  "/apple-touch-icon.png",
  "/opengraph-image",
]);

function localPath(urlPath, contentType = "") {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  if (clean === "/") return path.join(output, "index.html");
  if (contentType.includes("text/html") || !path.extname(clean)) {
    return path.join(output, clean.slice(1), "index.html");
  }
  return path.join(output, clean.slice(1));
}

function collectAssets(text) {
  for (const match of text.matchAll(/(?:src|href)=["'](\/[^"'#?]+(?:\?[^"'#]*)?)["']/g)) {
    const value = match[1];
    if (!value.startsWith("/admin") && !value.startsWith("/api/")) assets.add(value);
  }
  for (const match of text.matchAll(/url\(["']?(\/[^)'"?#]+(?:\?[^)'"#]*)?)["']?\)/g)) {
    assets.add(match[1]);
  }
}

async function fetchAndSave(urlPath, destination, transformHtml = false) {
  const response = await fetch(new URL(urlPath, origin), { redirect: "follow" });
  if (!response.ok) throw new Error(`${response.status} ${urlPath}`);
  const contentType = response.headers.get("content-type") || "";
  await mkdir(path.dirname(destination), { recursive: true });
  if (contentType.includes("text/") || contentType.includes("json") || contentType.includes("javascript")) {
    let text = await response.text();
    collectAssets(text);
    if (transformHtml) {
      text = text.replace(
        "</body>",
        `<script>document.addEventListener("click",function(e){const a=e.target.closest("a[href]");if(!a||a.target||a.href.startsWith("mailto:")||a.href.startsWith("tel:")||a.origin!==location.origin)return;e.preventDefault();e.stopImmediatePropagation();location.href=a.href},true)</script></body>`,
      );
    }
    await writeFile(destination, text);
  } else {
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  }
  return contentType;
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const route of routes) {
  await fetchAndSave(route, localPath(route, "text/html"), true);
}

const completed = new Set();
while (true) {
  const pending = [...assets].filter((asset) => !completed.has(asset));
  if (!pending.length) break;
  for (const asset of pending) {
    completed.add(asset);
    const response = await fetch(new URL(asset, origin), { redirect: "follow" });
    if (!response.ok) {
      console.warn(`Atlandı: ${response.status} ${asset}`);
      continue;
    }
    const contentType = response.headers.get("content-type") || "";
    const destination = localPath(asset, contentType);
    await mkdir(path.dirname(destination), { recursive: true });
    if (contentType.includes("text/") || contentType.includes("json") || contentType.includes("javascript")) {
      const text = await response.text();
      collectAssets(text);
      await writeFile(destination, text);
    } else {
      await writeFile(destination, Buffer.from(await response.arrayBuffer()));
    }
  }
}

console.log(`IHS statik paket hazır: ${output}`);
