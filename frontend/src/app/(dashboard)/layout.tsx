import type { ReactNode } from "react";
import "../globals.css";
import DashboardShell from "@/components/dashboard-layout/DashboardShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
