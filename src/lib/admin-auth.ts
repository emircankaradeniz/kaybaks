import { adminSessionSecret } from "@/lib/content-store";

export const ADMIN_COOKIE = "kaybaks_admin";
const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function signature(value: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(adminSessionSecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

export async function createAdminToken() {
  const expires = Date.now() + 8 * 60 * 60 * 1000;
  const payload = String(expires);
  return `${payload}.${await signature(payload)}`;
}

export async function isAdminRequest(request: Request) {
  if (!adminSessionSecret) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const token = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${ADMIN_COOKIE}=`))?.slice(ADMIN_COOKIE.length + 1);
  if (!token) return false;
  const [expires, supplied] = token.split(".");
  if (!expires || !supplied || Number(expires) < Date.now()) return false;
  return supplied === await signature(expires);
}

export function adminCookie(token: string, secure: boolean) {
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${secure ? "; Secure" : ""}`;
}

export function clearAdminCookie() {
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}
