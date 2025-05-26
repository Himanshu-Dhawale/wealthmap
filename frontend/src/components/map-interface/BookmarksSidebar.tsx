"use client";
import { formatUSD } from "@/lib/utils";
import { useMapStore } from "@/stores/mapStore";
import { BookmarkCheck, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export const BookmarksSidebar = () => {
  const {
    bookmarks,
    fetchBookmarks,
    setSelectedProperty,
    toggleShowBookmarks,
  } = useMapStore();

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="fixed top-0 left-0 z-30 w-64 h-full bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
      <div className="p-4 flex justify-between items-start border-b border-gray-200">
        <div className=" ">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <BookmarkCheck className="w-5 h-5 text-yellow-500" />
            Saved Properties
          </h2>
          <p className="text-sm text-gray-500">
            {bookmarks.length}{" "}
            {bookmarks.length === 1 ? "bookmark" : "bookmarks"}
          </p>
        </div>
        <button className="mt-1" onClick={toggleShowBookmarks}>
          <X size={20} />{" "}
        </button>
      </div>

      <div className="divide-y divide-gray-200">
        {bookmarks.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No properties bookmarked yet
          </div>
        ) : (
          bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedProperty(bookmark.property)}
            >
              <div className="flex items-start gap-3">
                {bookmark.property.image && (
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    <Image
                      src={bookmark.property.image}
                      alt={bookmark.property.addressLine1}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">
                    {bookmark.property.addressLine1}
                  </h3>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="line-clamp-1">
                      {bookmark.property.formattedAddress}
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-sm font-medium">
                    {formatUSD(bookmark.property.price)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};