import { env } from "cloudflare:workers";

export type ManagedProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  cropX: number;
  cropY: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SiteSettings = Record<string, string>;

type D1Result<T> = { results?: T[] };
type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  run: () => Promise<unknown>;
  all: <T>() => Promise<D1Result<T>>;
  first: <T>() => Promise<T | null>;
};
type D1Like = {
  prepare: (sql: string) => D1Statement;
  batch: (statements: D1Statement[]) => Promise<unknown>;
};
type R2Like = {
  put: (key: string, value: ReadableStream | ArrayBuffer, options?: unknown) => Promise<unknown>;
  get: (key: string) => Promise<{ body: ReadableStream; httpMetadata?: { contentType?: string }; size?: number } | null>;
  delete: (key: string) => Promise<unknown>;
};

const runtimeEnv = env as unknown as {
  DB: D1Like;
  MEDIA: R2Like;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

export const db = runtimeEnv.DB;
export const mediaBucket = runtimeEnv.MEDIA;
export const adminPassword = runtimeEnv.ADMIN_PASSWORD ?? "";
export const adminSessionSecret = runtimeEnv.ADMIN_SESSION_SECRET ?? "";

const defaultProducts = [
  ["oluklu-mukavva-levha", "Oluklu Mukavva Levha", "Levha & Mukavva", "Farklı kalınlık ve dalga tiplerinde mukavva levha çözümleri.", "/media/products/corrugated-sheet.png", 67, 728],
  ["normal-kutu", "Normal Kutu", "Kutu Çözümleri", "Standart ölçülerde dayanıklı ve ekonomik kutular.", "/media/products/standard-box.png", 269, 728],
  ["kalip-kesim-kutu", "Kalıp Kesim Kutu", "Kutu Çözümleri", "Özel kesim, baskılı ve kreatif kutu çözümleri.", "/media/products/die-cut-box.png", 472, 728],
  ["teleskopik-kutu", "Teleskopik Kutu", "Kutu Çözümleri", "İç içe geçen yapısıyla ekstra koruma sağlar.", "/media/products/telescope-box.png", 675, 728],
  ["ondule", "Ondüle", "Koruyucu Ürünler", "Esnek ve koruyucu ondüle malzeme çözümleri.", "/media/products/ondule-products.png", 67, 984],
  ["demonte-mobilya-kutulari", "Demonte Mobilya Kutuları", "Demonte & Mobilya", "Mobilya ve parçalar için özel ölçü ve dayanıklılık.", "/media/products/furniture-box.png", 338, 984],
  ["ozel-tasarim-ambalaj", "Özel Tasarım Ambalaj", "Özel Tasarım", "Markanıza özel tasarım ambalaj çözümleri.", "/media/products/premium-packaging.png", 629, 984],
] as const;

export const defaultSettings: SiteSettings = {
  company_name: "KAYBAKS",
  phone: "+90 352 322 28 01",
  phone_href: "+903523222801",
  email: "info@kaybaks.com.tr",
  address: "Karpuzsekisi Mah. 22. Sk. No:22, 38070 Melikgazi / Kayseri",
  hero_eyebrow: "Kayseri’den Türkiye’ye, Dünyaya",
  hero_title: "Yeni Nesil Oluklu Mukavva ve Ambalaj Çözümleri",
  hero_description: "Kayseri’deki modern tesisimizde, ihtiyacınıza özel oluklu mukavva ve kutu üretimi yapıyoruz.",
  hero_image: "",
  customer_count: "500+",
  experience_years: "35+",
  production_area: "10.000 m²",
  project_count: "724+",
};

let initialized = false;

export async function ensureDatabase() {
  if (initialized) return;

  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY NOT NULL, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'Kutu Çözümleri', short_description TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '', image_url TEXT NOT NULL DEFAULT '', crop_x INTEGER NOT NULL DEFAULT 67, crop_y INTEGER NOT NULL DEFAULT 728, sort_order INTEGER NOT NULL DEFAULT 0, is_active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS media (id TEXT PRIMARY KEY NOT NULL, object_key TEXT NOT NULL UNIQUE, filename TEXT NOT NULL, content_type TEXT NOT NULL, size INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_products_active_sort ON products(is_active, sort_order)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at)"),
  ]);

  const now = new Date().toISOString();
  await db.batch(
    defaultProducts.map((product, index) =>
      db.prepare("INSERT OR IGNORE INTO products (id, slug, name, category, short_description, description, image_url, crop_x, crop_y, sort_order, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)")
        .bind(crypto.randomUUID(), product[0], product[1], product[2], product[3], product[3], product[4], product[5], product[6], index, now, now),
    ),
  );
  await db.batch(
    defaultProducts.map((product) =>
      db.prepare("UPDATE products SET image_url = ?, updated_at = ? WHERE slug = ? AND image_url = ''")
        .bind(product[4], now, product[0]),
    ),
  );
  await db.batch(
    Object.entries(defaultSettings).map(([key, value]) =>
      db.prepare("INSERT OR IGNORE INTO settings (key, value, updated_at) VALUES (?, ?, ?)").bind(key, value, now),
    ),
  );
  await db.prepare("PRAGMA optimize").run();
  initialized = true;
}

function mapProduct(row: Record<string, unknown>): ManagedProduct {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    category: String(row.category),
    shortDescription: String(row.short_description),
    description: String(row.description),
    imageUrl: String(row.image_url || ""),
    cropX: Number(row.crop_x),
    cropY: Number(row.crop_y),
    sortOrder: Number(row.sort_order),
    isActive: Boolean(row.is_active),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function getProducts(includeInactive = false) {
  await ensureDatabase();
  const query = includeInactive
    ? "SELECT * FROM products ORDER BY sort_order, created_at"
    : "SELECT * FROM products WHERE is_active = 1 ORDER BY sort_order, created_at";
  const result = await db.prepare(query).all<Record<string, unknown>>();
  return (result.results ?? []).map(mapProduct);
}

export async function getProduct(slug: string) {
  await ensureDatabase();
  const row = await db.prepare("SELECT * FROM products WHERE slug = ? LIMIT 1").bind(slug).first<Record<string, unknown>>();
  return row ? mapProduct(row) : null;
}

export async function getSettings() {
  await ensureDatabase();
  const result = await db.prepare("SELECT key, value FROM settings").all<{ key: string; value: string }>();
  return { ...defaultSettings, ...Object.fromEntries((result.results ?? []).map((item) => [item.key, item.value])) } as SiteSettings;
}

export async function getMedia() {
  await ensureDatabase();
  const result = await db.prepare("SELECT * FROM media ORDER BY created_at DESC").all<Record<string, unknown>>();
  return (result.results ?? []).map((row) => ({
    id: String(row.id),
    objectKey: String(row.object_key),
    filename: String(row.filename),
    contentType: String(row.content_type),
    size: Number(row.size),
    createdAt: String(row.created_at),
    url: `/api/media/${String(row.object_key).split("/").map(encodeURIComponent).join("/")}`,
  }));
}
