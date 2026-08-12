import { isAdminRequest } from "@/lib/admin-auth";
import { defaultSettings, deleteMedia, deleteProduct, getMedia, getProducts, getSettings, saveProduct, saveSettings } from "@/lib/content-store";

function unauthorized() { return Response.json({ error: "Oturum gerekli." }, { status: 401 }); }

export async function GET(request: Request) {
  if (!await isAdminRequest(request)) return unauthorized();
  const [products, settings, media] = await Promise.all([getProducts(true), getSettings(), getMedia()]);
  return Response.json({ products, settings, media });
}

export async function POST(request: Request) {
  if (!await isAdminRequest(request)) return unauthorized();
  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const action = String(body.action ?? "");
  try {
    if (action === "saveProduct") {
      const input = body.product as Record<string, unknown>;
      const slug = String(input.slug ?? "").trim().toLocaleLowerCase("tr-TR").replaceAll("ı", "i").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const name = String(input.name ?? "").trim();
      if (!slug || !name) return Response.json({ error: "Ürün adı ve bağlantı adı zorunludur." }, { status: 400 });
      const product = await saveProduct({ ...input, slug, name });
      return Response.json({ ok: true, id: product.id, slug: product.slug });
    }
    if (action === "deleteProduct") {
      await deleteProduct(String(body.id ?? ""));
      return Response.json({ ok: true });
    }
    if (action === "saveSettings") {
      const input = body.settings as Record<string, unknown>;
      await saveSettings(Object.fromEntries(Object.keys(defaultSettings).map((key) => [key, String(input[key] ?? "")])));
      return Response.json({ ok: true });
    }
    if (action === "deleteMedia") {
      await deleteMedia(String(body.objectKey ?? ""));
      return Response.json({ ok: true });
    }
    return Response.json({ error: "Geçersiz işlem." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error && error.message === "DUPLICATE_SLUG"
      ? "Bu bağlantı adına sahip başka bir ürün var."
      : error instanceof Error && error.message.includes("Blob")
        ? error.message
        : "İşlem kaydedilemedi.";
    return Response.json({ error: message }, { status: 500 });
  }
}
