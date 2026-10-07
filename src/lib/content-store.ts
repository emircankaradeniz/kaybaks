import { del, get, list, put } from "@vercel/blob";

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

export type ManagedMedia = {
  id: string;
  objectKey: string;
  filename: string;
  contentType: string;
  size: number;
  createdAt: string;
  url: string;
};

type ContentData = {
  products: ManagedProduct[];
  settings: SiteSettings;
  media: ManagedMedia[];
};

const CONTENT_PATH = "kaybaks/content.json";
export const adminPassword = process.env.ADMIN_PASSWORD ?? "";
export const adminSessionSecret = process.env.ADMIN_SESSION_SECRET ?? "";

const defaultProductRows = [
  ["oluklu-mukavva-levha", "Oluklu Mukavva Levha", "Levha & Ondüle", "Farklı dalga, katman ve gramaj seçeneklerinde oluklu mukavva levhalar.", "/media/enhanced/corrugated-layers-hd.jpg", 50, 50],
  ["normal-kutu", "Normal Kutu", "Kutu Çözümleri", "Taşıma, depolama ve lojistik için farklı ölçülerde standart kutular.", "/media/enhanced/normal-box-and-sheets-hd.jpg", 50, 50],
  ["kalip-kesim-kutu", "Kalıp Kesim Kutu", "Kutu Çözümleri", "Ürüne göre kesilen, tam renk baskıya uygun kutu çözümleri.", "/media/enhanced/handled-diecut-box-hd.jpg", 50, 50],
  ["teleskopik-kutu", "Teleskopik Kutu", "Kutu Çözümleri", "Kapak ve gövdeden oluşan, koruma ihtiyacı yüksek ürünlere uygun kutular.", "/media/enhanced/box-types-hd.jpg", 50, 50],
  ["ondule", "Ondüle", "Levha & Ondüle", "Sırtı açık, tek dalga, çift dalga ve üç dalga seçenekleri.", "/media/enhanced/flute-types-hd.jpg", 50, 50],
  ["demonte-mobilya-kutulari", "Demonte Mobilya Kutuları", "Mobilya", "Mobilya parçalarının düzenli ve güvenli sevkiyatı için ölçülü ambalajlar.", "/media/enhanced/box-size-variety-hd.jpg", 50, 50],
  ["ozel-olcu-kutu", "Özel Ölçü Kutu", "Özel Üretim", "Standart dışı ürünler için ölçü, gramaj ve kullanıma göre planlanan kutular.", "/media/enhanced/box-types-hd.jpg", 50, 50],
  ["ozel-tasarim-ambalaj", "Özel Tasarım Ambalaj", "Özel Üretim", "Kalıp kesim ve tam renk baskı seçenekli özel ambalajlar.", "/media/enhanced/diecut-folding-example-hd.jpg", 50, 50],
] as const;

export const defaultSettings: SiteSettings = {
  company_name: "KAYBAKS",
  phone: "+90 352 322 28 01",
  phone_href: "+903523222801",
  email: "info@kaybaks.com.tr",
  address: "1. Organize Sanayi Bölgesi, Karpuzsekisi Mah. 22. Cadde No:22, Melikgazi / Kayseri",
  hero_eyebrow: "1999’dan beri üretimde",
  hero_title: "Oluklu Mukavva ve Kutu Üretimi",
  hero_description: "KAYBAKS markasıyla 2010’dan beri ürününüze uygun oluklu mukavva, kutu ve özel ambalaj çözümleri üretiyoruz.",
  hero_image: "",
  customer_count: "500+",
  experience_years: "1999’dan beri",
  production_area: "Kayseri",
  project_count: "2010’dan beri KAYBAKS",
};

function createDefaultProducts(): ManagedProduct[] {
  const now = new Date(0).toISOString();
  return defaultProductRows.map((product, index) => ({
    id: product[0], slug: product[0], name: product[1], category: product[2],
    shortDescription: product[3], description: product[3], imageUrl: product[4],
    cropX: product[5], cropY: product[6], sortOrder: index, isActive: true,
    createdAt: now, updatedAt: now,
  }));
}

function defaults(): ContentData {
  return { products: createDefaultProducts(), settings: { ...defaultSettings }, media: [] };
}

function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID));
}

async function readContent(): Promise<ContentData> {
  if (!blobConfigured()) return defaults();
  const result = await get(CONTENT_PATH, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return defaults();
  const stored = JSON.parse(await new Response(result.stream).text()) as Partial<ContentData>;
  return {
    products: Array.isArray(stored.products) ? stored.products : createDefaultProducts(),
    settings: { ...defaultSettings, ...(stored.settings ?? {}) },
    media: Array.isArray(stored.media) ? stored.media : [],
  };
}

async function writeContent(data: ContentData) {
  if (!blobConfigured()) throw new Error("Vercel Blob bağlantısı eksik. Vercel Storage bölümünden bir Blob deposu bağlayın.");
  await put(CONTENT_PATH, JSON.stringify(data), {
    access: "private",
    contentType: "application/json; charset=utf-8",
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

export async function getProducts(includeInactive = false) {
  const products = (await readContent()).products
    .filter((product) => includeInactive || product.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt));
  return products;
}

export async function getProduct(slug: string) {
  return (await readContent()).products.find((product) => product.slug === slug) ?? null;
}

export async function getSettings() {
  return (await readContent()).settings;
}

export async function getMedia() {
  return (await readContent()).media.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveProduct(input: Partial<ManagedProduct>) {
  const data = await readContent();
  const now = new Date().toISOString();
  const id = String(input.id || crypto.randomUUID());
  const existing = data.products.find((product) => product.id === id);
  const product: ManagedProduct = {
    id,
    slug: String(input.slug ?? existing?.slug ?? ""),
    name: String(input.name ?? existing?.name ?? ""),
    category: String(input.category ?? existing?.category ?? "Kutu Çözümleri"),
    shortDescription: String(input.shortDescription ?? existing?.shortDescription ?? ""),
    description: String(input.description ?? existing?.description ?? ""),
    imageUrl: String(input.imageUrl ?? existing?.imageUrl ?? ""),
    cropX: Number(input.cropX ?? existing?.cropX ?? 67),
    cropY: Number(input.cropY ?? existing?.cropY ?? 728),
    sortOrder: Number(input.sortOrder ?? existing?.sortOrder ?? data.products.length),
    isActive: input.isActive !== false,
    createdAt: existing?.createdAt ?? String(input.createdAt || now),
    updatedAt: now,
  };
  const duplicate = data.products.some((item) => item.id !== id && item.slug === product.slug);
  if (duplicate) throw new Error("DUPLICATE_SLUG");
  data.products = existing ? data.products.map((item) => item.id === id ? product : item) : [...data.products, product];
  await writeContent(data);
  return product;
}

export async function deleteProduct(id: string) {
  const data = await readContent();
  data.products = data.products.filter((product) => product.id !== id);
  await writeContent(data);
}

export async function saveSettings(settings: SiteSettings) {
  const data = await readContent();
  data.settings = { ...defaultSettings, ...settings };
  await writeContent(data);
}

export async function addMedia(media: ManagedMedia) {
  const data = await readContent();
  data.media = [media, ...data.media.filter((item) => item.id !== media.id)];
  await writeContent(data);
}

export async function deleteMedia(objectKey: string) {
  const data = await readContent();
  const item = data.media.find((media) => media.objectKey === objectKey);
  if (item) await del(item.objectKey);
  data.media = data.media.filter((media) => media.objectKey !== objectKey);
  await writeContent(data);
}

export async function uploadMedia(file: File) {
  if (!blobConfigured()) throw new Error("Vercel Blob bağlantısı eksik.");
  const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "bin";
  const id = crypto.randomUUID();
  const pathname = `kaybaks/uploads/${Date.now()}-${id}.${extension}`;
  const blob = await put(pathname, file, { access: "private", contentType: file.type, addRandomSuffix: false });
  const media: ManagedMedia = {
    id, objectKey: blob.pathname, filename: file.name, contentType: file.type,
    size: file.size, createdAt: new Date().toISOString(),
    url: `/api/media/${blob.pathname.split("/").map(encodeURIComponent).join("/")}`,
  };
  await addMedia(media);
  return media;
}

export async function getMediaObject(objectKey: string) {
  return get(objectKey, { access: "private" });
}

export async function verifyBlobConnection() {
  if (!blobConfigured()) return false;
  await list({ prefix: "kaybaks/", limit: 1 });
  return true;
}
