"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNavItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        pathName === href
          ? "bg-blue-50 text-blue-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span
        className={`mr-3 ${
          pathName === href ? "text-blue-600" : "text-gray-400"
        }`}
      >
        {icon}
      </span>
      {label}
    </Link>
  );
};
export default DashboardNavItem;