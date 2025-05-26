"use client";
import { useMapStore } from "@/stores/mapStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MoveRight,
  Home,
  History,
  Info,
  Bookmark,
  BookmarkCheck,
  LoaderCircle,
} from "lucide-react";
import Image from "next/image";
import { PropertyDetails } from "./PropertyDetails";
import { HistoryAndTransactions } from "./HistoryAndTransactions";

const SelectedPropertyCard = () => {
  const {
    selectedProperty,
    setSelectedProperty,
    toggleBookmark,
    isBookmarking,
    bookmarks,
  } = useMapStore();
  if (!selectedProperty) return null;

  const existingBookmark = bookmarks?.find(
    (b) => b.propertyId === selectedProperty.id
  );
  const isBookmarked = !!existingBookmark;

  return (
    <div className="fixed z-40 w-full max-w-sm overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl bottom-4 right-4 md:right-8">
      <div className="relative">
        {selectedProperty.image ? (
          <div className="relative w-full h-48">
            <Image
              src={selectedProperty.image}
              alt={selectedProperty.addressLine1}
              className="absolute object-cover"
              fill
              priority
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-48 bg-gray-100">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <button
          onClick={() => toggleBookmark(selectedProperty.id)}
          disabled={isBookmarking}
          className="absolute p-2 transition-colors rounded-full top-2 right-12 bg-white/80 hover:bg-white"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarking ? (
            <LoaderCircle
              size={16}
              className="animate-spin text-blue-gradient-start"
            />
          ) : isBookmarked ? (
            <BookmarkCheck
              size={16}
              className="text-blue-gradient-start fill-blue-gradient-start"
            />
          ) : (
            <Bookmark size={16} />
          )}
        </button>
        <button
          onClick={() => setSelectedProperty(null)}
          className="absolute p-2 transition-colors rounded-full top-2 right-2 bg-white/80 hover:bg-white"
        >
          <MoveRight size={14} />
        </button>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details" className="flex items-center gap-1">
            <Info className="w-4 h-4" /> Details
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="w-4 h-4" /> History
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="details"
          className="p-4 max-h-64 overflow-y-auto scrollbar-thin"
        >
          <PropertyDetails selectedProperty={selectedProperty} />
        </TabsContent>

        <TabsContent
          value="history"
          className="p-4 max-h-64  overflow-y-auto scrollbar-thin"
        >
          <HistoryAndTransactions selectedProperty={selectedProperty} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SelectedPropertyCard;