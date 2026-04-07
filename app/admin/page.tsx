import type { Metadata } from "next";
import AdminDashboard from "@/components/site/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin | Aydiner Construction",
  description: "Internal admin interface for project content management",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
