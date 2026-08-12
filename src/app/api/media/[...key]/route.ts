import { getMediaObject } from "@/lib/content-store";

export const runtime = "nodejs";

export async function GET(_: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const object = await getMediaObject(key.join("/"));
  if (!object || object.statusCode !== 200) return new Response("Not found", { status: 404 });
  return new Response(object.stream, {
    headers: {
      "Content-Type": object.blob.contentType || "application/octet-stream",
      "Content-Length": String(object.blob.size),
      "ETag": object.blob.etag,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
