import { createHmac, timingSafeEqual } from "node:crypto";

const RESULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function tokenSecret() {
  const value = process.env.RESULT_TOKEN_SECRET;
  if (!value) throw new Error("RESULT_TOKEN_SECRET is not configured");
  return value;
}

function signature(payload: string) {
  return createHmac("sha256", tokenSecret()).update(payload).digest("base64url");
}

function equal(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function createResultToken(id: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ id, exp: now + RESULT_TTL_MS })).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyResultToken(token: string, expectedId: string, now = Date.now()) {
  const [payload, provided] = token.split(".");
  if (!payload || !provided || !equal(provided, signature(payload))) return false;
  try {
    const value = JSON.parse(Buffer.from(payload, "base64url").toString()) as { id?: unknown; exp?: unknown };
    return value.id === expectedId && typeof value.exp === "number" && value.exp > now;
  } catch {
    return false;
  }
}
