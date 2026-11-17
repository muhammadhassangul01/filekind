import type { D1Database } from "@cloudflare/workers-types";

type Env = {
  DB: D1Database;
  ALLOWED_ORIGINS?: string;
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
};
type Period = "24h" | "7" | "30" | "90" | "all";
type EventType = "page_view" | "click" | "time";
type CloudflareRequest = Request & { cf?: { country?: string; city?: string } };

const DAY = 86_400_000;
const PRIVATE_PATHS = new Set(["/admin", "/analytics"]);

function headers(extra: HeadersInit = {}) {
  return new Headers({
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    ...extra,
  });
}

function json(data: unknown, status = 200, extra: HeadersInit = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: headers({ "Content-Type": "application/json; charset=utf-8", ...extra }),
  });
}

function allowedOrigins(env: Env) {
  return new Set((env.ALLOWED_ORIGINS ?? "").split(",").map((origin) => origin.trim()).filter(Boolean));
}

function corsHeaders(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  const result: Record<string, string> = { Vary: "Origin" };
  if (origin && allowedOrigins(env).has(origin)) {
    result["Access-Control-Allow-Origin"] = origin;
    result["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    result["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
  }
  return result;
}

function originAllowed(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  return !origin || allowedOrigins(env).has(origin);
}

function validPath(value: unknown): value is string {
  return typeof value === "string" &&
    value.length <= 256 &&
    (value === "/" || /^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(value)) &&
    !PRIVATE_PATHS.has(value);
}

function validVisitorId(value: unknown): value is string {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{16,80}$/.test(value);
}

function validEventName(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9_-]{1,80}$/.test(value);
}

function validEventType(value: unknown): value is EventType {
  return value === "page_view" || value === "click" || value === "time";
}

function periodRange(period: Period) {
  const now = Date.now();
  const from = period === "24h" ? now - DAY : period === "7" ? now - 7 * DAY : period === "30" ? now - 30 * DAY : period === "90" ? now - 90 * DAY : 0;
  return { from, to: now };
}

function readPeriod(value: string | null): Period {
  return value === "24h" || value === "30" || value === "90" || value === "all" ? value : value === "7" ? "7" : "7";
}

async function digest(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function requireSession(request: Request, env: Env) {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return false;
  const tokenHash = await digest(authorization.slice(7));
  const row = await env.DB.prepare("SELECT token_hash FROM admin_sessions WHERE token_hash = ? AND expires_at > ?")
    .bind(tokenHash, Date.now()).first();
  return Boolean(row);
}

async function login(request: Request, env: Env) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(cors) });
  if (request.method !== "POST" || !originAllowed(request, env)) return json({ error: "Invalid request." }, 400, cors);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400, cors);
  }
  const username = typeof body === "object" && body !== null && "username" in body ? body.username : "";
  const password = typeof body === "object" && body !== null && "password" in body ? body.password : "";
  if (username !== (env.ADMIN_USERNAME ?? "admin") || password !== (env.ADMIN_PASSWORD ?? "1234")) {
    return json({ error: "Incorrect username or password." }, 401, cors);
  }
  const token = crypto.randomUUID() + crypto.randomUUID();
  await env.DB.prepare("INSERT INTO admin_sessions (token_hash, expires_at) VALUES (?, ?)")
    .bind(await digest(token), Date.now() + DAY).run();
  return json({ token, expiresAt: Date.now() + DAY }, 200, cors);
}

async function analytics(request: CloudflareRequest, env: Env) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(cors) });
  if (request.method !== "POST" || !originAllowed(request, env)) return json({ error: "Invalid request." }, 400, cors);
  if (Number(request.headers.get("Content-Length") ?? 0) > 2048) return json({ error: "Request too large." }, 413, cors);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400, cors);
  }
  const value = body as Record<string, unknown>;
  const path = value.path;
  const visitorId = value.visitorId;
  const eventType = value.eventType;
  const eventName = value.eventName ?? null;
  const durationSeconds = value.durationSeconds ?? null;
  if (!validPath(path) || !validVisitorId(visitorId) || !validEventType(eventType)) return json({ error: "Invalid event." }, 400, cors);
  if (eventType === "click" && !validEventName(eventName)) return json({ error: "Invalid event name." }, 400, cors);
  if (eventType === "time" && (typeof durationSeconds !== "number" || !Number.isFinite(durationSeconds) || durationSeconds < 1 || durationSeconds > 86_400)) {
    return json({ error: "Invalid duration." }, 400, cors);
  }
  const country = (request.cf?.country ?? "Unknown").slice(0, 2).toUpperCase();
  const city = (request.cf?.city ?? "Unknown").slice(0, 80);
  await env.DB.prepare(
    "INSERT INTO analytics_events (visitor_id, event_type, path, event_name, duration_seconds, country, city, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  ).bind(visitorId, eventType, path, eventName, durationSeconds, country, city, Date.now()).run();
  return new Response(null, { status: 204, headers: headers(cors) });
}

async function data(request: Request, env: Env) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(cors) });
  if (request.method !== "GET" || !originAllowed(request, env)) return json({ error: "Invalid request." }, 400, cors);
  if (!(await requireSession(request, env))) return json({ error: "Not authorized." }, 401, cors);
  const period = readPeriod(new URL(request.url).searchParams.get("period"));
  const dates = periodRange(period);
  const params = [dates.from, dates.to];
  const [summary, pages, locations, clicks, timeByPage] = await env.DB.batch([
    env.DB.prepare("SELECT COUNT(*) AS page_views, COUNT(DISTINCT visitor_id) AS unique_visitors FROM analytics_events WHERE event_type = 'page_view' AND created_at BETWEEN ? AND ?").bind(...params),
    env.DB.prepare("SELECT path, COUNT(*) AS views, COUNT(DISTINCT visitor_id) AS visitors FROM analytics_events WHERE event_type = 'page_view' AND created_at BETWEEN ? AND ? GROUP BY path ORDER BY views DESC, path ASC").bind(...params),
    env.DB.prepare("SELECT country, city, COUNT(DISTINCT visitor_id) AS visitors, COUNT(*) AS views FROM analytics_events WHERE event_type = 'page_view' AND created_at BETWEEN ? AND ? GROUP BY country, city ORDER BY visitors DESC, views DESC, country ASC, city ASC").bind(...params),
    env.DB.prepare("SELECT path, event_name, COUNT(*) AS clicks FROM analytics_events WHERE event_type = 'click' AND created_at BETWEEN ? AND ? GROUP BY path, event_name ORDER BY clicks DESC, path ASC, event_name ASC").bind(...params),
    env.DB.prepare("SELECT path, SUM(duration_seconds) AS seconds, COUNT(*) AS sessions, AVG(duration_seconds) AS average_seconds FROM analytics_events WHERE event_type = 'time' AND created_at BETWEEN ? AND ? GROUP BY path ORDER BY seconds DESC").bind(...params),
  ]);
  const totals = summary.results[0] as { page_views?: number; unique_visitors?: number } | undefined;
  const totalSeconds = Number((await env.DB.prepare("SELECT COALESCE(SUM(duration_seconds), 0) AS seconds FROM analytics_events WHERE event_type = 'time' AND created_at BETWEEN ? AND ?").bind(...params).first<{ seconds: number }>())?.seconds ?? 0);
  return json({
    period,
    from: dates.from,
    to: dates.to,
    pageViews: Number(totals?.page_views ?? 0),
    uniqueVisitors: Number(totals?.unique_visitors ?? 0),
    totalSeconds,
    pages: pages.results,
    locations: locations.results,
    clicks: clicks.results,
    timeByPage: timeByPage.results,
    refreshedAt: new Date().toISOString(),
  }, 200, cors);
}

export default {
  async fetch(request: CloudflareRequest, env: Env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === "/auth/login") return login(request, env);
    if (pathname === "/analytics") return analytics(request, env);
    if (pathname === "/data") return data(request, env);
    return new Response("Not found", { status: 404, headers: headers() });
  },
  async scheduled(_controller: ScheduledController, env: Env, context: ExecutionContext) {
    context.waitUntil(env.DB.prepare("DELETE FROM admin_sessions WHERE expires_at < ?").bind(Date.now()).run());
  },
};
