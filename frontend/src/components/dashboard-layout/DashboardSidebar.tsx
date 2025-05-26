"use client";
import { useSession } from "next-auth/react";
import DashboardNavItem from "./DashboardNavItem";
import {
  Map,
  ChartNoAxesColumnIncreasing,
  FileChartColumnIncreasing,
  Users,
  Settings,
} from "lucide-react";

const DashboardSidebar = () => {
  const { data, status } = useSession();
  if (status === "loading") return null;
  return (
    <nav className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            WealthMap
          </span>
        </div>
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-4 space-y-1">
            <DashboardNavItem
              icon={<Map size={20} />}
              label="Property Map"
              href="/map"
            />
            <DashboardNavItem
              icon={<ChartNoAxesColumnIncreasing size={20} />}
              label="Wealth Analysis"
              href="/wealth-analysis"
            />
            <DashboardNavItem
              icon={<FileChartColumnIncreasing size={20} />}
              label="Reports"
              href="/reports"
            />
            {status === "authenticated" && data?.user.role !== "EMPLOYEE" && (
              <DashboardNavItem
                icon={<Users size={20} />}
                label="Manage Members"
                href="/members"
              />
            )}
            <DashboardNavItem
              icon={<Settings size={20} />}
              label="Settings"
              href="/settings"
            />
          </nav>
        </div>
      </div>
    </nav>
  );
};
export default DashboardSidebar;
