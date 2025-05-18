import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import DashboardShell from "@/components/dashboard-layout/DashboardShell";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <DashboardShell>{children}</DashboardShell>
    </body>
  );
}