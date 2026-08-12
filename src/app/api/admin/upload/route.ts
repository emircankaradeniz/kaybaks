import { isAdminRequest } from "@/lib/admin-auth";
import { uploadMedia } from "@/lib/content-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!await isAdminRequest(request)) return Response.json({ error: "Oturum gerekli." }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Dosya seçilmedi." }, { status: 400 });
  if (!file.type.startsWith("image/")) return Response.json({ error: "Yalnızca görsel yükleyebilirsiniz." }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return Response.json({ error: "Vercel yüklemelerinde görsel en fazla 4 MB olabilir." }, { status: 400 });
  try {
    const media = await uploadMedia(file);
    return Response.json({ ok: true, media });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Görsel yüklenemedi." }, { status: 500 });
  }
}
