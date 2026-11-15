import type { Metadata } from "next";
import AdminDashboard from "../components/admin-dashboard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Site Analytics",
  description: "An aggregate overview of Filekind page views and tool interactions.",
  path: "/analytics",
  noindex: true,
});

export default function AnalyticsPage() {
  return <AdminDashboard />;
}
