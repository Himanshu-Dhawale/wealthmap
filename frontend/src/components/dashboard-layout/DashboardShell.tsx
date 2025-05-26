"use client";
import { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useMapStore } from "@/stores/mapStore";
import { BookmarksSidebar } from "../map-interface/BookmarksSidebar";

const DashboardShell = ({ children }: { children: ReactNode }) => {
  const { showBookmarks } = useMapStore();
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        {showBookmarks && <BookmarksSidebar />}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};
export default DashboardShell;