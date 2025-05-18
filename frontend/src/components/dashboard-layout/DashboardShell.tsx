import { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const DashboardShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};
export default DashboardShell;