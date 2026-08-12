import { isAdminRequest } from "@/lib/admin-auth";
import { db, defaultSettings, ensureDatabase, getMedia, getProducts, getSettings, mediaBucket } from "@/lib/content-store";

function unauthorized() { return Response.json({ error: "Oturum gerekli." }, { status: 401 }); }

export async function GET(request: Request) {
  if (!await isAdminRequest(request)) return unauthorized();
  const [products, settings, media] = await Promise.all([getProducts(true), getSettings(), getMedia()]);
  return Response.json({ products, settings, media });
}

export async function POST(request: Request) {
  if (!await isAdminRequest(request)) return unauthorized();
  await ensureDatabase();
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const action = String(body.action ?? "");
  const now = new Date().toISOString();
  try {
    if (action === "saveProduct") {
      const product = body.product as Record<string, unknown>;
      const slug = String(product.slug ?? "").trim().toLocaleLowerCase("tr-TR").replaceAll("ı", "i").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const name = String(product.name ?? "").trim();
      if (!slug || !name) return Response.json({ error: "Ürün adı ve bağlantı adı zorunludur." }, { status: 400 });
      const id = String(product.id || crypto.randomUUID());
      await db.prepare(`INSERT INTO products (id, slug, name, category, short_description, description, image_url, crop_x, crop_y, sort_order, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET slug = excluded.slug, name = excluded.name, category = excluded.category, short_description = excluded.short_description, description = excluded.description, image_url = excluded.image_url, crop_x = excluded.crop_x, crop_y = excluded.crop_y, sort_order = excluded.sort_order, is_active = excluded.is_active, updated_at = excluded.updated_at`)
        .bind(id, slug, name, String(product.category ?? "Kutu Çözümleri"), String(product.shortDescription ?? ""), String(product.description ?? ""), String(product.imageUrl ?? ""), Number(product.cropX ?? 67), Number(product.cropY ?? 728), Number(product.sortOrder ?? 0), product.isActive === false ? 0 : 1, String(product.createdAt || now), now).run();
      return Response.json({ ok: true, id, slug });
    }
    if (action === "deleteProduct") {
      await db.prepare("DELETE FROM products WHERE id = ?").bind(String(body.id ?? "")).run();
      return Response.json({ ok: true });
    }
    if (action === "saveSettings") {
      const settings = body.settings as Record<string, unknown>;
      const entries = Object.keys(defaultSettings).map((key) => [key, String(settings[key] ?? "")]);
      await db.batch(entries.map(([key, value]) => db.prepare("INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").bind(key, value, now)));
      return Response.json({ ok: true });
    }
    if (action === "deleteMedia") {
      const objectKey = String(body.objectKey ?? "");
      if (objectKey) await mediaBucket.delete(objectKey);
      await db.prepare("DELETE FROM media WHERE object_key = ?").bind(objectKey).run();
      return Response.json({ ok: true });
    }
    return Response.json({ error: "Geçersiz işlem." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("UNIQUE") ? "Bu bağlantı adına sahip başka bir ürün var." : "İşlem kaydedilemedi.";
    return Response.json({ error: message }, { status: 500 });
  }
}
