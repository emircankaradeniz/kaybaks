import { mediaBucket } from "@/lib/content-store";

export async function GET(_: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const object = await mediaBucket.get(key.join("/"));
  if (!object) return new Response("Not found", { status: 404 });
  return new Response(object.body, { headers: { "Content-Type": object.httpMetadata?.contentType ?? "application/octet-stream", "Cache-Control": "public, max-age=31536000, immutable" } });
}
