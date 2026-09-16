"use client";

import { FormEvent, useState } from "react";
import ToolLayout from "./tool-layout";

type Row = { path?: string; country?: string; views: number; percentage: number };
type Report = { from: string; to: string; total: number; pages: Row[]; countries: Row[]; refreshedAt: string };

const USERNAME = "admin";
const PASSWORD = "123_AbC#";
const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ?? "https://filekind-analytics.muhammadhassangul01.workers.dev/analytics";
const dataEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_DATA_ENDPOINT ?? analyticsEndpoint.replace(/\/analytics\/?$/, "/data");

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [period, setPeriod] = useState("7");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadReport(selectedPeriod = period) {
    if (!dataEndpoint) { setMessage("Set NEXT_PUBLIC_ANALYTICS_ENDPOINT before building the site."); return; }
    setLoading(true); setMessage("");
    try {
      const response = await fetch(`${dataEndpoint}?period=${selectedPeriod}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load analytics");
      setReport(await response.json() as Report);
    } catch { setMessage("Could not load analytics. Check the Worker URL and try again."); }
    finally { setLoading(false); }
  }

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username === USERNAME && password === PASSWORD) { setLoggedIn(true); setPassword(""); void loadReport(); }
    else setMessage("Invalid username or password.");
  }

  return <ToolLayout active="home"><section className="admin-page">
    {!loggedIn ? <div className="admin-login"><p className="eyebrow">Filekind</p><h1>Admin analytics</h1><p className="intro-copy">See which tools people use and where visitors are coming from.</p><form className="tool-panel admin-form" onSubmit={signIn}><label className="field-label" htmlFor="admin-username">Username</label><input className="text-input" id="admin-username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /><label className="field-label" htmlFor="admin-password">Password</label><input className="text-input" id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /><button className="primary-button" type="submit">View analytics</button>{message && <p className="message error" role="alert">{message}</p>}</form></div> : <>
      <div className="admin-heading"><div><p className="eyebrow">Filekind / Admin</p><h1>Usage analytics</h1><p className="intro-copy">Aggregate page views for the selected period.</p></div><div className="admin-actions"><select className="select-input" value={period} onChange={(event) => { const selectedPeriod = event.target.value; setPeriod(selectedPeriod); void loadReport(selectedPeriod); }} aria-label="Date range"><option value="today">Today</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select><button className="secondary-button" type="button" onClick={() => void loadReport()} disabled={loading}>Refresh</button><button className="secondary-button" type="button" onClick={() => { setLoggedIn(false); setReport(null); }}>Log out</button></div></div>
      {message && <p className="message error" role="alert">{message}</p>}{report && <><section className="admin-total"><span>Total page views</span><strong>{report.total}</strong><small>UTC {report.from} through {report.to}</small></section><div className="admin-tables"><AnalyticsTable title="Top pages" label="Page" rows={report.pages} value="path" /><AnalyticsTable title="Top countries" label="Country" rows={report.countries} value="country" /></div><p className="small-note">Last refreshed {new Date(report.refreshedAt).toLocaleString()}</p></>}
    </>}
  </section></ToolLayout>;
}

function AnalyticsTable({ title, label, rows, value }: { title: string; label: string; rows: Row[]; value: "path" | "country" }) {
  return <section className="admin-table"><h2>{title}</h2><div className="table-scroll"><table><thead><tr><th>{label}</th><th>Views</th><th>Share</th></tr></thead><tbody>{rows.map((row) => <tr key={row[value]}><td>{row[value]}</td><td>{row.views}</td><td><div className="share-bar"><i style={{ width: `${Math.min(row.percentage, 100)}%` }} /></div>{row.percentage}%</td></tr>)}</tbody></table></div>{rows.length === 0 && <p className="small-note">No views in this period.</p>}</section>;
}
