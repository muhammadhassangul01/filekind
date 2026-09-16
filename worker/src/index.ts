import type { D1Database } from "@cloudflare/workers-types";

type Env = { DB: D1Database; ALLOWED_ORIGINS?: string };
type Period = "today" | "7" | "30";

const PUBLIC_PATHS = new Set(["/", "/compress-image", "/convert-image", "/images-to-pdf", "/pdf-to-images"]);
const DAY = 86_400_000;

function headers(extra: HeadersInit = {}) {
  return new Headers({ "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", ...extra });
}
function json(data: unknown, status = 200, extra: HeadersInit = {}) {
  return new Response(JSON.stringify(data), { status, headers: headers({ "Content-Type": "application/json; charset=utf-8", ...extra }) });
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
    result["Access-Control-Allow-Headers"] = "Content-Type";
  }
  return result;
}
function originAllowed(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  return !origin || allowedOrigins(env).has(origin);
}
function utcDate(timestamp = Date.now()) {
  return new Date(timestamp).toISOString().slice(0, 10);
}
function range(period: Period) {
  const end = new Date(`${utcDate()}T00:00:00.000Z`);
  const days = period === "today" ? 0 : period === "30" ? 29 : 6;
  return { from: utcDate(end.getTime() - days * DAY), to: utcDate(end.getTime()) };
}

async function analytics(request: Request, env: Env) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(cors) });
  if (request.method !== "POST" || !originAllowed(request, env)) return json({ error: "Invalid request." }, 400, cors);
  if (Number(request.headers.get("Content-Length") ?? 0) > 1024) return json({ error: "Request too large." }, 413, cors);
  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400, cors); }
  const path = typeof body === "object" && body !== null && "path" in body && typeof body.path === "string" ? body.path : "";
  if (!PUBLIC_PATHS.has(path)) return json({ error: "Invalid path." }, 400, cors);
  const country = String((request as Request & { cf?: { country?: string } }).cf?.country ?? "Unknown").slice(0, 2).toUpperCase() || "Unknown";
  await env.DB.prepare("INSERT INTO daily_page_views (utc_date, path, country, views) VALUES (?, ?, ?, 1) ON CONFLICT(utc_date, path, country) DO UPDATE SET views = views + 1").bind(utcDate(), path, country).run();
  return new Response(null, { status: 204, headers: headers(cors) });
}

async function data(request: Request, env: Env) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(cors) });
  if (request.method !== "GET" || !originAllowed(request, env)) return json({ error: "Invalid request." }, 400, cors);
  const value = new URL(request.url).searchParams.get("period");
  const period: Period = value === "today" || value === "30" ? value : "7";
  const dates = range(period);
  const [totalRow, pages, countries] = await env.DB.batch([
    env.DB.prepare("SELECT COALESCE(SUM(views), 0) AS total FROM daily_page_views WHERE utc_date BETWEEN ? AND ?").bind(dates.from, dates.to),
    env.DB.prepare("SELECT path, SUM(views) AS views FROM daily_page_views WHERE utc_date BETWEEN ? AND ? GROUP BY path ORDER BY views DESC, path ASC LIMIT 10").bind(dates.from, dates.to),
    env.DB.prepare("SELECT country, SUM(views) AS views FROM daily_page_views WHERE utc_date BETWEEN ? AND ? GROUP BY country ORDER BY views DESC, country ASC LIMIT 10").bind(dates.from, dates.to),
  ]);
  const total = Number((totalRow.results[0] as { total?: number } | undefined)?.total ?? 0);
  const percentage = (views: number) => total ? Math.round((views / total) * 1000) / 10 : 0;
  return json({ period, from: dates.from, to: dates.to, total, pages: (pages.results as unknown as Array<{ path: string; views: number }>).map((row) => ({ ...row, percentage: percentage(Number(row.views)) })), countries: (countries.results as unknown as Array<{ country: string; views: number }>).map((row) => ({ ...row, percentage: percentage(Number(row.views)) })), refreshedAt: new Date().toISOString() }, 200, cors);
}

export default {
  async fetch(request: Request, env: Env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === "/analytics") return analytics(request, env);
    if (pathname === "/data") return data(request, env);
    return new Response("Not found", { status: 404, headers: headers() });
  },
};
