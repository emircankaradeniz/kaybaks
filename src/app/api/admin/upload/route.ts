import { isAdminRequest } from "@/lib/admin-auth";
import { db, ensureDatabase, mediaBucket } from "@/lib/content-store";

export async function POST(request: Request) {
  if (!await isAdminRequest(request)) return Response.json({ error: "Oturum gerekli." }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Dosya seçilmedi." }, { status: 400 });
  if (!file.type.startsWith("image/")) return Response.json({ error: "Yalnızca görsel yükleyebilirsiniz." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return Response.json({ error: "Görsel en fazla 8 MB olabilir." }, { status: 400 });
  await ensureDatabase();
  const extension = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "bin";
  const id = crypto.randomUUID();
  const objectKey = `uploads/${Date.now()}-${id}.${extension}`;
  await mediaBucket.put(objectKey, file.stream(), { httpMetadata: { contentType: file.type } });
  const now = new Date().toISOString();
  await db.prepare("INSERT INTO media (id, object_key, filename, content_type, size, created_at) VALUES (?, ?, ?, ?, ?, ?)").bind(id, objectKey, file.name, file.type, file.size, now).run();
  const url = `/api/media/${objectKey.split("/").map(encodeURIComponent).join("/")}`;
  return Response.json({ ok: true, media: { id, objectKey, filename: file.name, contentType: file.type, size: file.size, createdAt: now, url } });
}
