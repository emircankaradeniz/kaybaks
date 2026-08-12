import { adminCookie, createAdminToken } from "@/lib/admin-auth";
import { adminPassword, adminSessionSecret } from "@/lib/content-store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!adminPassword || !adminSessionSecret) return Response.json({ error: "Yönetici ayarları eksik." }, { status: 503 });
  if (body.password !== adminPassword) return Response.json({ error: "Şifre hatalı." }, { status: 401 });
  const token = await createAdminToken();
  return Response.json({ ok: true }, { headers: { "Set-Cookie": adminCookie(token, new URL(request.url).protocol === "https:") } });
}
