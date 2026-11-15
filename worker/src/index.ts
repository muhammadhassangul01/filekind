import type { D1Database } from "@cloudflare/workers-types";

type Env = { DB: D1Database; ALLOWED_ORIGINS?: string; ANALYTICS_RESET_TOKEN?: string };
type Period = "today" | "7" | "30" | "90";

const DAY = 86_400_000;
const PRIVATE_PATHS = new Set(["/admin", "/analytics"]);

function headers(extra: HeadersInit = {}) {
  return new Headers({ "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow, noarchive", ...extra });
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
    result["Access-Control-Allow-Headers"] = "Content-Type, X-Analytics-Reset-Token";
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
  const days = period === "today" ? 0 : period === "30" ? 29 : period === "90" ? 89 : 6;
  return { from: utcDate(end.getTime() - days * DAY), to: utcDate(end.getTime()) };
}

function validPath(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 256 &&
    (value === "/" || /^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(value)) &&
    !PRIVATE_PATHS.has(value)
  );
}

function validEvent(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9_-]{1,64}$/.test(value);
}

async function analytics(request: Request, env: Env) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(cors) });
  if (request.method !== "POST" || !originAllowed(request, env)) return json({ error: "Invalid request." }, 400, cors);
  if (Number(request.headers.get("Content-Length") ?? 0) > 1024) return json({ error: "Request too large." }, 413, cors);
  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400, cors); }
  const path = typeof body === "object" && body !== null && "path" in body ? body.path : "";
  if (!validPath(path)) return json({ error: "Invalid path." }, 400, cors);
  const rawCountry = (request as Request & { cf?: { country?: string } }).cf?.country;
  const country = rawCountry ? rawCountry.slice(0, 2).toUpperCase() : "Unknown";
  const event = typeof body === "object" && body !== null && "event" in body ? body.event : null;
  if (event === null) {
    await env.DB.prepare("INSERT INTO daily_page_views (utc_date, path, country, views) VALUES (?, ?, ?, 1) ON CONFLICT(utc_date, path, country) DO UPDATE SET views = views + 1").bind(utcDate(), path, country).run();
  } else {
    if (!validEvent(event)) return json({ error: "Invalid event." }, 400, cors);
    await env.DB.prepare("INSERT INTO daily_clicks (utc_date, path, event, clicks) VALUES (?, ?, ?, 1) ON CONFLICT(utc_date, path, event) DO UPDATE SET clicks = clicks + 1").bind(utcDate(), path, event).run();
  }
  return new Response(null, { status: 204, headers: headers(cors) });
}

async function data(request: Request, env: Env) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(cors) });
  if (request.method !== "GET" || !originAllowed(request, env)) return json({ error: "Invalid request." }, 400, cors);
  const value = new URL(request.url).searchParams.get("period");
  const period: Period = value === "today" || value === "30" || value === "90" ? value : "7";
  const dates = range(period);
  const [totalRow, clickTotalRow, pages, countries, clicks, daily] = await env.DB.batch([
    env.DB.prepare("SELECT COALESCE(SUM(views), 0) AS total FROM daily_page_views WHERE utc_date BETWEEN ? AND ?").bind(dates.from, dates.to),
    env.DB.prepare("SELECT COALESCE(SUM(clicks), 0) AS total FROM daily_clicks WHERE utc_date BETWEEN ? AND ?").bind(dates.from, dates.to),
    env.DB.prepare("SELECT path, SUM(views) AS views FROM daily_page_views WHERE utc_date BETWEEN ? AND ? GROUP BY path ORDER BY views DESC, path ASC LIMIT 10").bind(dates.from, dates.to),
    env.DB.prepare("SELECT country, SUM(views) AS views FROM daily_page_views WHERE utc_date BETWEEN ? AND ? GROUP BY country ORDER BY views DESC, country ASC LIMIT 10").bind(dates.from, dates.to),
    env.DB.prepare("SELECT path, event, SUM(clicks) AS clicks FROM daily_clicks WHERE utc_date BETWEEN ? AND ? GROUP BY path, event ORDER BY clicks DESC, path ASC, event ASC LIMIT 100").bind(dates.from, dates.to),
    env.DB.prepare(
      "SELECT dates.utc_date, COALESCE(views.views, 0) AS views, COALESCE(clicks.clicks, 0) AS clicks " +
      "FROM (SELECT utc_date FROM daily_page_views WHERE utc_date BETWEEN ? AND ? UNION SELECT utc_date FROM daily_clicks WHERE utc_date BETWEEN ? AND ?) AS dates " +
      "LEFT JOIN (SELECT utc_date, SUM(views) AS views FROM daily_page_views WHERE utc_date BETWEEN ? AND ? GROUP BY utc_date) AS views ON views.utc_date = dates.utc_date " +
      "LEFT JOIN (SELECT utc_date, SUM(clicks) AS clicks FROM daily_clicks WHERE utc_date BETWEEN ? AND ? GROUP BY utc_date) AS clicks ON clicks.utc_date = dates.utc_date " +
      "ORDER BY dates.utc_date ASC",
    ).bind(dates.from, dates.to, dates.from, dates.to, dates.from, dates.to, dates.from, dates.to),
  ]);
  const total = Number((totalRow.results[0] as { total?: number } | undefined)?.total ?? 0);
  const totalClicks = Number((clickTotalRow.results[0] as { total?: number } | undefined)?.total ?? 0);
  const percentage = (views: number) => total ? Math.round((views / total) * 1000) / 10 : 0;
  return json({
    period,
    from: dates.from,
    to: dates.to,
    total,
    totalClicks,
    pages: (pages.results as unknown as Array<{ path: string; views: number }>).map((row) => ({ ...row, percentage: percentage(Number(row.views)) })),
    countries: (countries.results as unknown as Array<{ country: string; views: number }>).map((row) => ({ ...row, percentage: percentage(Number(row.views)) })),
    clicks: clicks.results,
    daily: daily.results,
    refreshedAt: new Date().toISOString(),
  }, 200, cors);
}

async function reset(request: Request, env: Env) {
  const cors = corsHeaders(request, env);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(cors) });
  const token = request.headers.get("X-Analytics-Reset-Token");
  if (request.method !== "POST" || !env.ANALYTICS_RESET_TOKEN || token !== env.ANALYTICS_RESET_TOKEN || !originAllowed(request, env)) return json({ error: "Not authorized." }, 403, cors);
  await env.DB.batch([env.DB.prepare("DELETE FROM daily_page_views"), env.DB.prepare("DELETE FROM daily_clicks")]);
  return json({ reset: true }, 200, cors);
}

export default {
  async fetch(request: Request, env: Env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === "/analytics") return analytics(request, env);
    if (pathname === "/data") return data(request, env);
    if (pathname === "/reset") return reset(request, env);
    return new Response("Not found", { status: 404, headers: headers() });
  },
  async scheduled(_controller: ScheduledController, env: Env, context: ExecutionContext) {
    const cutoff = utcDate(Date.now() - 89 * DAY);
    context.waitUntil(env.DB.batch([
      env.DB.prepare("DELETE FROM daily_page_views WHERE utc_date < ?").bind(cutoff),
      env.DB.prepare("DELETE FROM daily_clicks WHERE utc_date < ?").bind(cutoff),
    ]));
  },
};
