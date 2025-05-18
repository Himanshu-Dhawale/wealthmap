"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Map,
  ChartNoAxesColumnIncreasing,
  FileChartColumnIncreasing,
  Users,
  Settings,
  Menu,
} from "lucide-react";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Map", href: "/map", icon: <Map /> },
    {
      name: "Analysis",
      href: "/wealth-analysis",
      icon: <ChartNoAxesColumnIncreasing />,
    },
    { name: "Reports", href: "/reports", icon: <FileChartColumnIncreasing /> },
    { name: "Members", href: "/members", icon: <Users /> },
    { name: "Settings", href: "/settings", icon: <Settings /> },
  ];

  return (
    <>
      <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg rounded-full p-3 border border-gray-200"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl p-4">
            <div className="grid grid-cols-5 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex flex-col items-center p-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  <div className="w-5 h-5 mb-1">{item.icon}</div>
                  <span className="text-xs">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};