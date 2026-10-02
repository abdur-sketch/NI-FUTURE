import { createHmac } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { getDb } from "../db/firebase.ts";

type WindowState = { count?: number; windowStartedAt?: string };

function rateLimitSecret() {
  const value = process.env.RATE_LIMIT_SECRET;
  if (value) return value;
  if (process.env.NODE_ENV !== "production") return "ni-future-local-rate-limit-secret";
  throw new Error("RATE_LIMIT_SECRET is not configured");
}

function digest(value: string) {
  return createHmac("sha256", rateLimitSecret()).update(value).digest("hex");
}

export function requestIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (request.headers.get("x-appengine-user-ip") ?? request.headers.get("x-real-ip") ?? forwarded ?? "unknown").slice(0, 80);
}

export function evaluateFixedWindow(state: WindowState | undefined, limit: number, windowMs: number, now = Date.now()) {
  const startedAt = state?.windowStartedAt ? Date.parse(state.windowStartedAt) : Number.NaN;
  const reset = !Number.isFinite(startedAt) || startedAt + windowMs <= now;
  const count = reset ? 0 : Math.max(0, state?.count ?? 0);
  return {
    allowed: count < limit,
    nextCount: count < limit ? count + 1 : count,
    windowStartedAt: new Date(reset ? now : startedAt).toISOString(),
    retryAfterSeconds: count < limit ? 0 : Math.max(1, Math.ceil((startedAt + windowMs - now) / 1000)),
  };
}

export async function consumeRateLimit(input: {
  request: Request;
  scope: string;
  limit: number;
  windowSeconds: number;
  identifier?: string;
  now?: number;
}) {
  const now = input.now ?? Date.now();
  const identity = `${input.scope}|${requestIp(input.request)}|${input.identifier?.toLowerCase() ?? ""}`;
  const ref = getDb().collection("securityRateLimits").doc(digest(identity));
  return getDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const result = evaluateFixedWindow(snapshot.data() as WindowState | undefined, input.limit, input.windowSeconds * 1000, now);
    transaction.set(ref, {
      kind: "FIXED_WINDOW",
      scope: input.scope,
      count: result.nextCount,
      windowStartedAt: result.windowStartedAt,
      updatedAt: new Date(now).toISOString(),
      expiresAt: Timestamp.fromMillis(now + input.windowSeconds * 1000 * 2),
    }, { merge: true });
    return { allowed: result.allowed, retryAfterSeconds: result.retryAfterSeconds };
  });
}

export function loginCooldownSeconds(failureCount: number) {
  if (failureCount >= 12) return 30 * 60;
  if (failureCount >= 8) return 5 * 60;
  if (failureCount >= 5) return 60;
  return 0;
}

function loginRef(request: Request, email: string) {
  return getDb().collection("securityRateLimits").doc(digest(`ADMIN_LOGIN|${requestIp(request)}|${email.toLowerCase()}`));
}

export async function checkLoginCooldown(request: Request, email: string, now = Date.now()) {
  const snapshot = await loginRef(request, email).get();
  const blockedUntil = snapshot.data()?.blockedUntil as string | undefined;
  const blockedUntilMs = blockedUntil ? Date.parse(blockedUntil) : Number.NaN;
  return {
    allowed: !Number.isFinite(blockedUntilMs) || blockedUntilMs <= now,
    retryAfterSeconds: Number.isFinite(blockedUntilMs) ? Math.max(0, Math.ceil((blockedUntilMs - now) / 1000)) : 0,
  };
}

export async function recordLoginFailure(request: Request, email: string, now = Date.now()) {
  const ref = loginRef(request, email);
  return getDb().runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const previous = snapshot.data();
    const lastFailureMs = previous?.updatedAt ? Date.parse(previous.updatedAt as string) : Number.NaN;
    const stale = !Number.isFinite(lastFailureMs) || lastFailureMs + 24 * 60 * 60 * 1000 <= now;
    const failureCount = (stale ? 0 : Number(previous?.failureCount ?? 0)) + 1;
    const cooldownSeconds = loginCooldownSeconds(failureCount);
    transaction.set(ref, {
      kind: "LOGIN_FAILURE",
      scope: "admin-login",
      failureCount,
      blockedUntil: cooldownSeconds ? new Date(now + cooldownSeconds * 1000).toISOString() : null,
      updatedAt: new Date(now).toISOString(),
      expiresAt: Timestamp.fromMillis(now + 48 * 60 * 60 * 1000),
    });
    return { failureCount, cooldownSeconds };
  });
}

export async function clearLoginFailures(request: Request, email: string) {
  await loginRef(request, email).delete();
}
