import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import DashboardShell from "@/components/dashboard-layout/DashboardShell";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}