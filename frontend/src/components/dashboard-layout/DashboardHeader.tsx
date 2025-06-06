"use client";
import { signOut, useSession } from "next-auth/react";
import { Bookmark } from "lucide-react";
import { generateRandomColor } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMapStore } from "@/stores/mapStore";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
  const { data: session } = useSession();
  const [avatarColor, setAvatarColor] = useState<string | null>(null);
  const { showBookmarks, toggleShowBookmarks } = useMapStore();
  const pathName = usePathname();

  useEffect(() => {
    if (session?.user?.email) {
      const userEmail = session.user.email;
      const localStorageKey = `user_avatar_color_${userEmail}`;

      const storedColor = localStorage.getItem(localStorageKey);
      if (storedColor) {
        setAvatarColor(storedColor);
      } else {
        const newColor = generateRandomColor();
        setAvatarColor(newColor);
        localStorage.setItem(localStorageKey, newColor);
      }
    } else {
      setAvatarColor(null);
    }
  }, [session]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        {pathName === "/map" && (
          <button
            onClick={toggleShowBookmarks}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              showBookmarks && "text-blue-gradient-start"
            }`}
          >
            <Bookmark size={18} />
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {session?.user.accessToken && avatarColor && (
          <div className="flex items-center">
            <div
              style={{ backgroundColor: avatarColor }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
            >
              {session?.user.email?.slice(0, 1).toUpperCase()}
            </div>
            <Button
              variant={"ghost"}
              className="text-purple-gradient-end px-2 ml-1"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
export default DashboardHeader;