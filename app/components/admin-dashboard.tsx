"use client";

import { useEffect, useMemo, useState } from "react";
import ToolLayout from "./tool-layout";

type Row = {
  path?: string;
  country?: string;
  event?: string;
  views?: number;
  clicks?: number;
  percentage?: number;
};

type DailyRow = { utc_date: string; views: number; clicks: number };
type Report = {
  period?: string;
  from: string;
  to: string;
  total: number;
  totalClicks?: number;
  pages: Row[];
  countries: Row[];
  clicks: Row[];
  daily?: DailyRow[];
  refreshedAt: string;
};

const analyticsEndpoint =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ??
  "https://filekind-analytics.muhammadhassangul01.workers.dev/analytics";
const dataEndpoint = analyticsEndpoint.replace(/\/analytics\/?$/, "/data");

export default function AdminDashboard() {
  const [period, setPeriod] = useState("7");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    void fetchReport(period, controller.signal)
      .then((result) => {
        setReport(result);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setMessage(getErrorMessage(error));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [period, refreshVersion]);

  const dailyRows = useMemo(() => {
    if (!report?.daily) return [];
    const counts = new Map(report.daily.map((row) => [row.utc_date, row]));
    const rows: DailyRow[] = [];
    const cursor = new Date(`${report.from}T00:00:00.000Z`);
    const end = new Date(`${report.to}T00:00:00.000Z`);
    while (cursor <= end) {
      const date = cursor.toISOString().slice(0, 10);
      rows.push(counts.get(date) ?? { utc_date: date, views: 0, clicks: 0 });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return rows;
  }, [report]);

  const topPage = report?.pages[0];
  const topCountry = report?.countries[0];
  const workerNeedsUpdate = Boolean(
    report && (report.period !== period || report.totalClicks === undefined || !report.daily),
  );

  return (
    <ToolLayout active="info" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Analytics" }]}>
      <section className="analytics-page" aria-labelledby="analytics-title">
        <header className="analytics-heading">
          <div>
            <p className="eyebrow"><span className="analytics-live-dot" /> Filekind / Site analytics</p>
            <h1 id="analytics-title">Know what’s working.</h1>
            <p className="intro-copy">
              A clear view of the pages and tools people use. Counts are anonymous events, not unique visitors.
            </p>
          </div>
          <div className="analytics-controls">
            <label className="analytics-period-label" htmlFor="analytics-period">Reporting period</label>
            <select
              className="select-input"
              id="analytics-period"
              value={period}
              onChange={(event) => {
                const selectedPeriod = event.target.value;
                setPeriod(selectedPeriod);
                setLoading(true);
                setMessage("");
              }}
            >
              <option value="today">Today</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button
              className="secondary-button analytics-refresh"
              type="button"
              onClick={() => {
                setLoading(true);
                setMessage("");
                setRefreshVersion((version) => version + 1);
              }}
              disabled={loading}
            >
              {loading ? "Updating…" : "Refresh"}
            </button>
          </div>
        </header>

        {message && <p className="message error" role="alert">{message}</p>}

        {report ? (
          <>
            {workerNeedsUpdate && (
              <p className="analytics-update-note" role="status">
                The Analytics Worker is using an older report format. Deploy the updated Worker to enable full-route
                tracking, daily trends, and complete interaction totals.
              </p>
            )}
            <dl className="analytics-stats" aria-label="Summary metrics">
              <MetricCard label="Page views" value={report.total} note="Across all public pages" />
              <MetricCard
                label="Interactions"
                value={report.totalClicks ?? "—"}
                note={report.totalClicks === undefined ? "Available after Worker update" : "Clicks and control changes"}
              />
              <MetricCard label="Top page" value={topPage?.path ?? "—"} note={topPage ? `${formatNumber(topPage.views ?? 0)} views` : "No page views yet"} compact />
              <MetricCard label="Top country" value={topCountry?.country ?? "—"} note={topCountry ? `${formatNumber(topCountry.views ?? 0)} page views` : "No location data yet"} compact />
            </dl>

            <section className="analytics-panel analytics-trend" aria-labelledby="analytics-trend-title">
              <div className="analytics-panel-heading">
                <div>
                  <p className="analytics-kicker">Traffic over time</p>
                  <h2 id="analytics-trend-title">Page views</h2>
                </div>
                <p className="analytics-date-range">{report.from} — {report.to} UTC</p>
              </div>
              <TrendChart rows={dailyRows} available={Boolean(report.daily)} />
            </section>

            <div className="analytics-tables">
              <AnalyticsTable title="Most visited pages" label="Page" rows={report.pages} value="path" metric="views" />
              <AnalyticsTable title="Where visitors are" label="Country" rows={report.countries} value="country" metric="views" />
              <AnalyticsTable title="What people use" label="Page / interaction" rows={report.clicks} value="event" metric="clicks" />
            </div>
            <p className="analytics-footnote">
              Updated {new Date(report.refreshedAt).toLocaleString()} · Data is aggregated by day and country.
              No visitor profiles, cookies, file names, or file contents are collected.
            </p>
          </>
        ) : loading ? (
          <div className="analytics-loading" role="status">Loading your analytics…</div>
        ) : (
          <div className="analytics-empty">
            <h2>No report available yet</h2>
            <p>Check that the Cloudflare Analytics Worker is deployed and reachable from this site.</p>
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                setLoading(true);
                setMessage("");
                setRefreshVersion((version) => version + 1);
              }}
            >
              Try again
            </button>
          </div>
        )}
      </section>
    </ToolLayout>
  );
}

function MetricCard({ label, value, note, compact = false }: { label: string; value: string | number; note: string; compact?: boolean }) {
  return (
    <div className={`analytics-stat${compact ? " is-compact" : ""}`}>
      <dt>{label}</dt>
      <dd>{typeof value === "number" ? formatNumber(value) : value}</dd>
      <small>{note}</small>
    </div>
  );
}

function TrendChart({ rows, available }: { rows: DailyRow[]; available: boolean }) {
  if (!available) {
    return <p className="analytics-chart-empty">Daily trends will appear after the updated Analytics Worker is deployed.</p>;
  }
  if (!rows.length) return <p className="analytics-chart-empty">No activity in this period yet.</p>;

  const width = 720;
  const height = 220;
  const padding = { top: 16, right: 12, bottom: 32, left: 12 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maximum = Math.max(1, ...rows.map((row) => row.views));
  const points = rows.map((row, index) => {
    const x = padding.left + (rows.length === 1 ? chartWidth / 2 : (index / (rows.length - 1)) * chartWidth);
    const y = padding.top + chartHeight - (row.views / maximum) * chartHeight;
    return { x, y, row };
  });
  const line = points.map(({ x, y }) => `${x},${y}`).join(" ");
  const area = `${padding.left},${height - padding.bottom} ${line} ${width - padding.right},${height - padding.bottom}`;

  return (
    <div className="analytics-chart-wrap">
      <svg className="analytics-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Daily page views trend">
        {[0, 0.5, 1].map((fraction) => {
          const y = padding.top + chartHeight * fraction;
          return <line className="analytics-chart-grid" key={fraction} x1={padding.left} x2={width - padding.right} y1={y} y2={y} />;
        })}
        <polygon className="analytics-chart-area" points={area} />
        <polyline className="analytics-chart-line" points={line} />
        {points.map(({ x, y, row }) => (
          <circle className="analytics-chart-point" key={row.utc_date} cx={x} cy={y} r="3">
            <title>{row.utc_date}: {formatNumber(row.views)} page views</title>
          </circle>
        ))}
        <text className="analytics-chart-label" x={padding.left} y={height - 8}>{rows[0].utc_date}</text>
        <text className="analytics-chart-label" x={width - padding.right} y={height - 8} textAnchor="end">{rows[rows.length - 1].utc_date}</text>
      </svg>
      <div className="analytics-chart-legend"><span /> Daily page views</div>
    </div>
  );
}

function AnalyticsTable({
  title,
  label,
  rows,
  value,
  metric,
}: {
  title: string;
  label: string;
  rows: Row[];
  value: "path" | "country" | "event";
  metric: "views" | "clicks";
}) {
  return (
    <section className="analytics-panel analytics-table" aria-label={title}>
      <div className="analytics-panel-heading">
        <div><p className="analytics-kicker">Breakdown</p><h2>{title}</h2></div>
      </div>
      {rows.length ? (
        <div className="table-scroll">
          <table>
            <thead><tr><th>{label}</th><th>{metric === "clicks" ? "Events" : "Views"}</th></tr></thead>
            <tbody>
              {rows.map((row) => {
                const name = metric === "clicks" ? `${row.path} / ${row.event}` : row[value] ?? "Unknown";
                const count = row[metric] ?? 0;
                return (
                  <tr key={`${row.path ?? row.country ?? ""}-${row.event ?? row[value]}`}>
                    <td title={name}>{name}</td>
                    <td><strong>{formatNumber(count)}</strong><small>{row.percentage !== undefined ? `${row.percentage}%` : ""}</small></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="analytics-chart-empty">No activity in this period yet.</p>
      )}
    </section>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

async function fetchReport(period: string, signal: AbortSignal): Promise<Report> {
  const response = await fetch(`${dataEndpoint}?period=${period}`, { cache: "no-store", signal });
  if (!response.ok) throw new Error("Could not load analytics. Check the Worker URL and try again.");
  return response.json() as Promise<Report>;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Could not load analytics. Check the Worker URL and try again.";
}
