import type { D1Database, ExecutionContext, ScheduledEvent } from "@cloudflare/workers-types";

type Env = {
  DB: D1Database;
  ADMIN_PASSWORD_HASH?: string;
  SESSION_SECRET?: string;
  ALLOWED_ORIGINS?: string;
  SESSION_TTL_SECONDS?: string;
};

type Session = { sessionHash: string; csrfHash: string; expiresAt: number };
type Period = "today" | "7" | "30";

const PUBLIC_PATHS = new Set(["/", "/compress-image", "/convert-image", "/images-to-pdf", "/pdf-to-images"]);
const encoder = new TextEncoder();
const DAY = 86_400_000;

function headers(extra: HeadersInit = {}) {
  return new Headers({ "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", ...extra });
}
function json(data: unknown, status = 200, extra: HeadersInit = {}) { return new Response(JSON.stringify(data), { status, headers: headers({ "Content-Type": "application/json; charset=utf-8", ...extra }) }); }
function html(body: string, status = 200) { return new Response(body, { status, headers: headers({ "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" }) }); }
function redirect(location: string) { return new Response(null, { status: 302, headers: headers({ Location: location, "X-Robots-Tag": "noindex, nofollow" }) }); }
function allowedOrigins(env: Env) { return new Set((env.ALLOWED_ORIGINS ?? "").split(",").map((origin) => origin.trim()).filter(Boolean)); }
function originAllowed(request: Request, env: Env) { const origin = request.headers.get("Origin"); return Boolean(origin && allowedOrigins(env).has(origin)); }
function corsHeaders(request: Request, env: Env) {
  const origin = request.headers.get("Origin");
  const result: Record<string, string> = { Vary: "Origin" };
  if (origin && allowedOrigins(env).has(origin)) { result["Access-Control-Allow-Origin"] = origin; result["Access-Control-Allow-Methods"] = "POST, OPTIONS"; result["Access-Control-Allow-Headers"] = "Content-Type"; result["Access-Control-Max-Age"] = "600"; }
  return result;
}
function base64url(bytes: ArrayBuffer | Uint8Array) { const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes); let binary = ""; for (const byte of data) binary += String.fromCharCode(byte); return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function fromBase64url(value: string) { const normalized = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "="); const binary = atob(normalized); return Uint8Array.from(binary, (character) => character.charCodeAt(0)); }
async function digest(value: string) { return base64url(await crypto.subtle.digest("SHA-256", encoder.encode(value))); }
async function hmac(secret: string, value: string) { const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]); return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(value))); }
function equal(left: string, right: string) { if (left.length !== right.length) return false; let difference = 0; for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index); return difference === 0; }
function cookie(request: Request, name: string) { return (request.headers.get("Cookie") ?? "").split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) ?? ""; }
function cookieHeader(name: string, value: string, secure: boolean, maxAge: number, httpOnly = true) { return `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Strict${secure ? "; Secure" : ""}${httpOnly ? "; HttpOnly" : ""}`; }
function clientKey(request: Request) { return (request.headers.get("CF-Connecting-IP") ?? "unknown").slice(0, 128); }
function utcDate(timestamp = Date.now()) { return new Date(timestamp).toISOString().slice(0, 10); }
function range(period: Period) { const end = new Date(`${utcDate()}T00:00:00.000Z`); const days = period === "today" ? 0 : period === "30" ? 29 : 6; return { from: utcDate(end.getTime() - days * DAY), to: utcDate(end.getTime()) }; }
function ttl(env: Env) { const parsed = Number(env.SESSION_TTL_SECONDS); return Number.isFinite(parsed) && parsed >= 900 && parsed <= 86_400 ? parsed : 28_800; }

async function verifyPassword(password: string, encoded: string) {
  const [algorithm, iterationText, saltText, hashText] = encoded.split("$");
  const iterations = Number(iterationText);
  if (algorithm !== "pbkdf2" || !Number.isInteger(iterations) || iterations < 100_000 || iterations > 2_000_000 || !saltText || !hashText) return false;
  try {
    const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
    const result = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: fromBase64url(saltText), iterations, hash: "SHA-256" }, key, 256);
    return equal(base64url(result), hashText);
  } catch { return false; }
}

async function rateLimit(env: Env, bucket: string, max: number, windowMs: number) {
  const now = Date.now(); const row = await env.DB.prepare("SELECT window_started_at AS started, attempts FROM rate_limits WHERE bucket = ?").bind(bucket).first<{ started: number; attempts: number }>();
  if (!row || now - row.started >= windowMs) { await env.DB.prepare("INSERT INTO rate_limits (bucket, window_started_at, attempts, expires_at) VALUES (?, ?, 1, ?) ON CONFLICT(bucket) DO UPDATE SET window_started_at = excluded.window_started_at, attempts = 1, expires_at = excluded.expires_at").bind(bucket, now, now + windowMs).run(); return true; }
  if (row.attempts >= max) return false;
  await env.DB.prepare("UPDATE rate_limits SET attempts = attempts + 1 WHERE bucket = ?").bind(bucket).run(); return true;
}

async function createSession(request: Request, env: Env) {
  const raw = base64url(crypto.getRandomValues(new Uint8Array(32))); const csrf = base64url(crypto.getRandomValues(new Uint8Array(24))); const sessionHash = await digest(raw); const csrfHash = await digest(csrf); const now = Date.now(); const expiresAt = now + ttl(env) * 1000;
  await env.DB.prepare("INSERT INTO sessions (session_hash, csrf_hash, created_at, last_seen_at, expires_at) VALUES (?, ?, ?, ?, ?)").bind(sessionHash, csrfHash, now, now, expiresAt).run();
  const signature = await hmac(env.SESSION_SECRET!, raw); const secure = new URL(request.url).protocol === "https:";
  return { cookie: cookieHeader("fk_session", `${raw}.${signature}`, secure, ttl(env)), csrfCookie: cookieHeader("fk_csrf", csrf, secure, ttl(env), false) };
}

async function getSession(request: Request, env: Env): Promise<Session | null> {
  if (!env.SESSION_SECRET) return null;
  const value = cookie(request, "fk_session"); const [raw, signature] = value.split("."); if (!raw || !signature) return null;
  const expected = await hmac(env.SESSION_SECRET, raw); if (!equal(expected, signature)) return null;
  const sessionHash = await digest(raw); const row = await env.DB.prepare("SELECT csrf_hash AS csrfHash, expires_at AS expiresAt FROM sessions WHERE session_hash = ?").bind(sessionHash).first<{ csrfHash: string; expiresAt: number }>();
  if (!row || row.expiresAt <= Date.now()) { if (row) await env.DB.prepare("DELETE FROM sessions WHERE session_hash = ?").bind(sessionHash).run(); return null; }
  await env.DB.prepare("UPDATE sessions SET last_seen_at = ? WHERE session_hash = ?").bind(Date.now(), sessionHash).run(); return { sessionHash, csrfHash: row.csrfHash, expiresAt: row.expiresAt };
}

async function requireSession(request: Request, env: Env) { const session = await getSession(request, env); return session ? session : json({ error: "Authentication required." }, 401); }
async function csrfValid(request: Request, session: Session) { const token = request.headers.get("X-CSRF-Token") ?? ""; return Boolean(token) && equal(await digest(token), session.csrfHash); }

async function analytics(request: Request, env: Env, ctx: ExecutionContext) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: headers(corsHeaders(request, env)) });
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, corsHeaders(request, env));
  const origin = request.headers.get("Origin"); if (origin && !allowedOrigins(env).has(origin)) return json({ error: "Origin not allowed." }, 403);
  const length = Number(request.headers.get("Content-Length") ?? 0); if (length > 1024) return json({ error: "Request too large." }, 413, corsHeaders(request, env));
  let body: unknown; try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400, corsHeaders(request, env)); }
  const path = typeof body === "object" && body !== null && "path" in body && typeof body.path === "string" ? body.path : "";
  if (!PUBLIC_PATHS.has(path) || path.includes("?") || path.includes("#")) return json({ error: "Invalid path." }, 400, corsHeaders(request, env));
  const key = await digest(`${env.SESSION_SECRET ?? "analytics"}:analytics:${clientKey(request)}`); if (!(await rateLimit(env, `analytics:${key}`, 120, 60_000))) return json({ error: "Rate limit exceeded." }, 429, corsHeaders(request, env));
  const country = String((request as Request & { cf?: { country?: string } }).cf?.country ?? "Unknown").slice(0, 2).toUpperCase() || "Unknown";
  const date = utcDate();
  await env.DB.prepare("INSERT INTO daily_page_views (utc_date, path, country, views) VALUES (?, ?, ?, 1) ON CONFLICT(utc_date, path, country) DO UPDATE SET views = views + 1").bind(date, path, country).run();
  ctx.waitUntil(Promise.resolve());
  return new Response(null, { status: 204, headers: headers(corsHeaders(request, env)) });
}

function loginPage(message = "") { return html(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin login | Filekind</title><style>${ADMIN_CSS}</style></head><body><main class="auth"><h1>Filekind admin</h1><p>Sign in to view aggregate usage analytics.</p><form id="login"><label>Username<input name="username" autocomplete="username" required></label><label>Password<input name="password" type="password" autocomplete="current-password" required></label><button>Sign in</button><p id="message" role="alert">${message}</p></form></main><script>${LOGIN_SCRIPT}</script></body></html>`); }
function dashboardPage() { return html(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Analytics | Filekind</title><style>${ADMIN_CSS}</style></head><body><main class="dashboard"><header><div><p class="eyebrow">Filekind</p><h1>Usage analytics</h1></div><div class="actions"><select id="period" aria-label="Date range"><option value="7" selected>Last 7 days</option><option value="today">Today</option><option value="30">Last 30 days</option></select><button id="refresh">Refresh</button><button id="logout">Logout</button></div></header><p class="range" id="range"></p><section class="total"><span>Total page views</span><strong id="total">-</strong></section><div class="columns"><section><h2>Top pages</h2><div id="pages" class="table-wrap">Loading...</div></section><section><h2>Top countries</h2><div id="countries" class="table-wrap">Loading...</div></section></div><p class="updated" id="updated"></p><p id="error" class="error" role="alert"></p></main><script>${DASHBOARD_SCRIPT}</script></body></html>`); }

async function adminLogin(request: Request, env: Env) {
  if (request.method === "GET") return loginPage();
  if (request.method !== "POST" || !originAllowed(request, env)) return json({ error: "Invalid request." }, 400);
  if (!env.ADMIN_PASSWORD_HASH || !env.SESSION_SECRET) return json({ error: "Invalid credentials." }, 401);
  const length = Number(request.headers.get("Content-Length") ?? 0); if (length > 2048) return json({ error: "Invalid credentials." }, 401);
  let body: { username?: unknown; password?: unknown }; try { body = await request.json(); } catch { return json({ error: "Invalid credentials." }, 401); }
  const username = typeof body.username === "string" ? body.username : ""; const password = typeof body.password === "string" ? body.password : ""; const bucket = await digest(`${env.SESSION_SECRET}:login:${clientKey(request)}:${username.slice(0, 80)}`);
  const ipBucket = await digest(`${env.SESSION_SECRET}:login-ip:${clientKey(request)}`);
  if (!(await rateLimit(env, `login-ip:${ipBucket}`, 10, 15 * 60_000)) || !(await rateLimit(env, `login:${bucket}`, 10, 15 * 60_000))) return json({ error: "Invalid credentials." }, 401);
  if (username !== "admin" || !(await verifyPassword(password, env.ADMIN_PASSWORD_HASH))) return json({ error: "Invalid credentials." }, 401);
  const session = await createSession(request, env); const response = json({ ok: true }); response.headers.append("Set-Cookie", session.cookie); response.headers.append("Set-Cookie", session.csrfCookie); return response;
}

async function adminLogout(request: Request, env: Env) {
  const sessionOrResponse = await requireSession(request, env); if (sessionOrResponse instanceof Response) return sessionOrResponse;
  if (request.method !== "POST" || !originAllowed(request, env) || !(await csrfValid(request, sessionOrResponse))) return json({ error: "Invalid request." }, 403);
  await env.DB.prepare("DELETE FROM sessions WHERE session_hash = ?").bind(sessionOrResponse.sessionHash).run(); const secure = new URL(request.url).protocol === "https:";
  const response = json({ ok: true }); response.headers.append("Set-Cookie", cookieHeader("fk_session", "", secure, 0)); response.headers.append("Set-Cookie", cookieHeader("fk_csrf", "", secure, 0, false)); return response;
}

async function adminData(request: Request, env: Env) {
  const session = await requireSession(request, env); if (session instanceof Response) return session;
  const value = new URL(request.url).searchParams.get("period") as Period | null; const period: Period = value === "today" || value === "30" ? value : "7"; const dates = range(period);
  const [totalRow, pages, countries] = await env.DB.batch([
    env.DB.prepare("SELECT COALESCE(SUM(views), 0) AS total FROM daily_page_views WHERE utc_date BETWEEN ? AND ?").bind(dates.from, dates.to),
    env.DB.prepare("SELECT path, SUM(views) AS views FROM daily_page_views WHERE utc_date BETWEEN ? AND ? GROUP BY path ORDER BY views DESC, path ASC LIMIT 20").bind(dates.from, dates.to),
    env.DB.prepare("SELECT country, SUM(views) AS views FROM daily_page_views WHERE utc_date BETWEEN ? AND ? GROUP BY country ORDER BY views DESC, country ASC LIMIT 20").bind(dates.from, dates.to),
  ]);
  const total = Number((totalRow.results[0] as { total?: number } | undefined)?.total ?? 0); const percent = (views: number) => total ? Math.round((views / total) * 1000) / 10 : 0;
  return json({ period, from: dates.from, to: dates.to, total, pages: (pages.results as unknown as Array<{ path: string; views: number }>).map((row) => ({ ...row, percentage: percent(Number(row.views)) })), countries: (countries.results as unknown as Array<{ country: string; views: number }>).map((row) => ({ ...row, percentage: percent(Number(row.views)) })), refreshedAt: new Date().toISOString() });
}

async function handle(request: Request, env: Env, ctx: ExecutionContext) {
  const url = new URL(request.url);
  if (url.pathname === "/analytics") return analytics(request, env, ctx);
  if (url.pathname === "/admin/login") return adminLogin(request, env);
  if (url.pathname === "/admin/logout") return adminLogout(request, env);
  if (url.pathname === "/admin/data") return request.method === "GET" ? adminData(request, env) : json({ error: "Method not allowed." }, 405);
  if (url.pathname === "/admin") { const session = await getSession(request, env); return session ? dashboardPage() : redirect("/admin/login"); }
  return new Response("Not found", { status: 404, headers: headers() });
}

const LOGIN_SCRIPT = `const form=document.querySelector('#login'),message=document.querySelector('#message');form.addEventListener('submit',async event=>{event.preventDefault();message.textContent='';const data=Object.fromEntries(new FormData(form));const response=await fetch('/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});if(response.ok){location.href='/admin';}else{message.textContent='Invalid username or password.';}});`;
const DASHBOARD_SCRIPT = `const period=document.querySelector('#period'),refresh=document.querySelector('#refresh'),logout=document.querySelector('#logout'),total=document.querySelector('#total'),pages=document.querySelector('#pages'),countries=document.querySelector('#countries'),rangeText=document.querySelector('#range'),updated=document.querySelector('#updated'),error=document.querySelector('#error');const escapeHTML=value=>String(value).replace(/[&<>\"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));const csrf=()=>decodeURIComponent((document.cookie.match(/(?:^|; )fk_csrf=([^;]*)/)||[])[1]||'');const table=(rows,key)=>rows.length?'<table><thead><tr><th>'+ (key==='path'?'Path':'Country')+'</th><th>Views</th><th>Share</th></tr></thead><tbody>'+rows.map(row=>'<tr><td>'+escapeHTML(row[key])+'</td><td>'+row.views+'</td><td><div class="bar"><i style="width:'+Math.min(row.percentage,100)+'%"></i></div>'+row.percentage+'%</td></tr>').join('')+'</tbody></table>':'<p class="empty">No page views in this period.</p>';async function load(){error.textContent='';pages.textContent='Loading...';countries.textContent='Loading...';try{const response=await fetch('/admin/data?period='+encodeURIComponent(period.value),{cache:'no-store'});if(response.status===401){location.href='/admin/login';return;}if(!response.ok)throw new Error();const data=await response.json();total.textContent=data.total;rangeText.textContent='UTC '+data.from+' through '+data.to;pages.innerHTML=table(data.pages,'path');countries.innerHTML=table(data.countries,'country');updated.textContent='Last refreshed '+new Date(data.refreshedAt).toLocaleString();}catch{error.textContent='Could not load analytics. Try refreshing.';}}period.addEventListener('change',load);refresh.addEventListener('click',load);logout.addEventListener('click',async()=>{await fetch('/admin/logout',{method:'POST',headers:{'X-CSRF-Token':csrf()}});location.href='/admin/login';});load();`;
const ADMIN_CSS = `:root{font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#172033;background:#fff}*{box-sizing:border-box}body{margin:0}.auth,.dashboard{margin:0 auto;max-width:1080px;padding:48px 24px}.auth{max-width:440px}.auth h1,.dashboard h1{margin:0 0 8px}.auth p{color:#647089}.auth form{border:1px solid #dfe5ee;border-radius:8px;display:grid;gap:16px;margin-top:24px;padding:20px}.auth label{display:grid;gap:6px;font-weight:700}.auth input,.actions select,button{border:1px solid #c9d2df;border-radius:5px;font:inherit;min-height:42px;padding:0 11px}.auth input{width:100%}.auth button,button{background:#2166e5;color:#fff;cursor:pointer;font-weight:700}.auth #message,.error{color:#a7352c;min-height:20px}.dashboard header{align-items:start;display:flex;gap:20px;justify-content:space-between}.eyebrow{color:#2166e5;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.actions{display:flex;flex-wrap:wrap;gap:8px}.actions select,.actions button{background:#fff;color:#172033}.range,.updated{color:#647089;font-size:14px}.total{border:1px solid #dfe5ee;border-radius:8px;margin:24px 0;padding:20px}.total span{color:#647089;display:block;font-size:14px}.total strong{display:block;font-size:34px;margin-top:4px}.columns{display:grid;gap:20px;grid-template-columns:repeat(2,minmax(0,1fr))}.columns section{border-top:1px solid #dfe5ee}.columns h2{font-size:18px}.table-wrap{overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{border-bottom:1px solid #dfe5ee;padding:11px 8px;text-align:left;font-size:14px;vertical-align:middle}th{color:#647089;font-size:12px;text-transform:uppercase}td:first-child{max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar{background:#eef1f6;height:6px;margin-bottom:4px;min-width:70px}.bar i{background:#2166e5;display:block;height:100%}.empty{color:#647089}@media(max-width:700px){.auth,.dashboard{padding:28px 16px}.dashboard header{display:block}.actions{margin-top:18px}.columns{grid-template-columns:1fr}}
`;

const worker = { fetch: handle, async scheduled(_event: ScheduledEvent, env: Env) { const cutoff = Date.now() - 90 * DAY; const cutoffDate = utcDate(cutoff); await env.DB.batch([env.DB.prepare("DELETE FROM daily_page_views WHERE utc_date < ?").bind(cutoffDate), env.DB.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(Date.now()), env.DB.prepare("DELETE FROM rate_limits WHERE expires_at < ?").bind(Date.now())]); } };

export default worker;
