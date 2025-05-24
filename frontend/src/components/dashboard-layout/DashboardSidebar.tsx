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
  const { data: session } = useSession();
  return (
    <nav className="hidden md:flex md:flex-shrink-0">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WealthMap
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
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
            <DashboardNavItem
              icon={<Users size={20} />}
              label="Manage Members"
              href="/members"
            />
            {session?.user.role !== "ADMIN" && (
              <DashboardNavItem
                icon={<Settings size={20} />}
                label="Settings"
                href="/settings"
              />
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};
export default DashboardSidebar;