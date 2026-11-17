"use client";

import { FormEvent, useEffect, useState } from "react";
import ToolLayout from "./tool-layout";

type Period = "24h" | "7" | "30" | "90" | "all";
type Report = {
  from: number;
  to: number;
  pageViews: number;
  uniqueVisitors: number;
  totalSeconds: number;
  pages: Array<{ path: string; views: number; visitors: number }>;
  locations: Array<{ country: string; city: string; visitors: number; views: number }>;
  clicks: Array<{ path: string; event_name: string; clicks: number }>;
  timeByPage: Array<{ path: string; seconds: number; sessions: number; average_seconds: number }>;
  refreshedAt: string;
};

const analyticsEndpoint =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ??
  "https://filekind-analytics.muhammadhassangul01.workers.dev/analytics";
const workerEndpoint = analyticsEndpoint.replace(/\/analytics\/?$/, "");

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("7");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    // sessionStorage is only available after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(window.sessionStorage.getItem("filekind-analytics-token"));
  }, []);

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    void fetch(`${workerEndpoint}/data?period=${period}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (response.status === 401) {
          window.sessionStorage.removeItem("filekind-analytics-token");
          setToken(null);
          throw new Error("Your session expired. Please sign in again.");
        }
        if (!response.ok) throw new Error("Could not load analytics from the Worker.");
        return response.json() as Promise<Report>;
      })
      .then(setReport)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setMessage(error instanceof Error ? error.message : "Could not load analytics.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [period, refreshVersion, token]);

  if (!token) {
    return <Login onLogin={(nextToken) => {
      window.sessionStorage.setItem("filekind-analytics-token", nextToken);
      setLoading(true);
      setToken(nextToken);
    }} />;
  }

  return (
    <ToolLayout active="info" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Analytics" }]}>
      <section className="analytics-page" aria-labelledby="analytics-title">
        <header className="analytics-heading">
          <div>
            <p className="eyebrow"><span className="analytics-live-dot" /> Filekind / Private analytics</p>
            <h1 id="analytics-title">See what visitors do.</h1>
            <p className="intro-copy">Anonymous page views, visitors, locations, time on page, and interactions.</p>
          </div>
          <div className="analytics-controls">
            <label className="analytics-period-label" htmlFor="analytics-period">Reporting period</label>
            <select className="select-input" id="analytics-period" value={period} onChange={(event) => {
              setLoading(true);
              setMessage("");
              setPeriod(event.target.value as Period);
            }}>
              <option value="24h">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <button className="secondary-button analytics-refresh" type="button" onClick={() => {
              setLoading(true);
              setMessage("");
              setRefreshVersion((version) => version + 1);
            }} disabled={loading}>
              {loading ? "Updating..." : "Refresh"}
            </button>
            <button className="secondary-button" type="button" onClick={() => {
              window.sessionStorage.removeItem("filekind-analytics-token");
              setToken(null);
            }}>Sign out</button>
          </div>
        </header>
        {message && <p className="message error" role="alert">{message}</p>}
        {report ? (
          <>
            <dl className="analytics-stats" aria-label="Summary metrics">
              <MetricCard label="Page views" value={report.pageViews} note="Total visits to public pages" />
              <MetricCard label="Unique visitors" value={report.uniqueVisitors} note="Anonymous browser visitors" />
              <MetricCard label="Time spent" value={formatDuration(report.totalSeconds)} note="Combined tracked time" compact />
              <MetricCard label="Interactions" value={report.clicks.reduce((sum, row) => sum + Number(row.clicks), 0)} note="Button, link, and control clicks" />
            </dl>
            <div className="analytics-tables analytics-tables-wide">
              <AnalyticsTable title="Pages" headers={["Page", "Views", "Visitors"]} rows={report.pages.map((row) => [row.path, row.views, row.visitors])} />
              <AnalyticsTable title="Time on page" headers={["Page", "Total", "Average"]} rows={report.timeByPage.map((row) => [row.path, formatDuration(row.seconds), formatDuration(row.average_seconds)])} />
              <AnalyticsTable title="Cities and countries" headers={["Location", "Visitors", "Views"]} rows={report.locations.map((row) => [`${row.city}, ${row.country}`, row.visitors, row.views])} />
              <AnalyticsTable title="Buttons and links" headers={["Page / action", "Clicks"]} rows={report.clicks.map((row) => [`${row.path} / ${row.event_name}`, row.clicks])} />
            </div>
            <p className="analytics-footnote">Updated {new Date(report.refreshedAt).toLocaleString()} · Range: {formatDate(report.from)} - {formatDate(report.to)}. Visitor IDs are random anonymous browser identifiers.</p>
          </>
        ) : loading ? (
          <div className="analytics-loading" role="status">Loading analytics...</div>
        ) : (
          <div className="analytics-empty"><h2>No report available</h2><p>{message || "Check that the Analytics Worker is deployed and reachable."}</p></div>
        )}
      </section>
    </ToolLayout>
  );
}

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${workerEndpoint}/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const body = await response.json() as { token?: string; error?: string };
      if (!response.ok || !body.token) throw new Error(body.error ?? "Could not sign in.");
      onLogin(body.token);
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page analytics-login-page">
      <section className="analytics-login" aria-labelledby="analytics-login-title">
        <p className="eyebrow">Filekind / Private analytics</p>
        <h1 id="analytics-login-title">Sign in to analytics.</h1>
        <p className="intro-copy">This dashboard is private and separate from the public tools.</p>
        <form onSubmit={submit}>
          <label className="field-label" htmlFor="analytics-username">Username</label>
          <input className="text-input" id="analytics-username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
          <label className="field-label" htmlFor="analytics-password">Password</label>
          <input className="text-input" id="analytics-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          {message && <p className="message error" role="alert">{message}</p>}
          <button className="primary-button" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        </form>
      </section>
    </main>
  );
}

function MetricCard({ label, value, note, compact = false }: { label: string; value: string | number; note: string; compact?: boolean }) {
  return <div className={`analytics-stat${compact ? " is-compact" : ""}`}><dt>{label}</dt><dd>{typeof value === "number" ? value.toLocaleString("en-US") : value}</dd><small>{note}</small></div>;
}

function AnalyticsTable({ title, headers, rows }: { title: string; headers: string[]; rows: Array<Array<string | number>> }) {
  return (
    <section className="analytics-panel analytics-table" aria-label={title}>
      <div className="analytics-panel-heading"><div><p className="analytics-kicker">Breakdown</p><h2>{title}</h2></div></div>
      {rows.length ? <div className="table-scroll"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${title}-${index}`}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cellIndex === 0 ? cell : <strong>{cell}</strong>}</td>)}</tr>)}</tbody></table></div> : <p className="analytics-chart-empty">No activity in this period yet.</p>}
    </section>
  );
}

function formatDuration(seconds: number) {
  const value = Math.max(0, Math.round(Number(seconds) || 0));
  if (value < 60) return `${value}s`;
  return `${Math.floor(value / 60)}m ${value % 60}s`;
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString();
}
