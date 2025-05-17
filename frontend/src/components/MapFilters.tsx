"use client";
import { useMapStore } from "@/store/mapStore";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Search,
  Map,
  Satellite,
  Home,
  Building,
  LandPlot,
  X,
  Filter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MapFilters = () => {
  const {
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    propertyType,
    setPropertyType,
    toggleMapStyle,
    mapStyle,
    filterProperties,
  } = useMapStore();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [priceRangeLocal, setPriceRangeLocal] = useState(priceRange);

  useEffect(() => {
    filterProperties();
  }, [searchQuery, priceRange, propertyType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        priceRangeLocal[0] !== priceRange[0] ||
        priceRangeLocal[1] !== priceRange[1]
      ) {
        setPriceRange(priceRangeLocal);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [priceRangeLocal]);

  return (
    <>
      {/* Mobile filter toggle button */}
      <Button
        onClick={() => setIsMobileOpen(true)}
        className=" block md:hidden fixed top-4 left-4 z-50 bg-yellow text-gray-800 shadow-lg hover:bg-gray-50"
        size="sm"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </Button>

      {/* Sidebar */}
      <div
        onClick={() => setIsMobileOpen(false)}
        className={cn(
          "fixed md:static inset-0 md:inset-auto z-40 md:z-auto transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="w-72 h-screen  bg-white border-r border-gray-200 shadow-lg md:shadow-none flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="w-4 h-4 mr-2 text-blue-600" />
              Filters
            </h2>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  placeholder="Address, owner, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border p-2 w-full outline-none"
                />
              </div>
            </div>

            {/* Map Style */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Map Style
              </label>
              <Button
                variant="outline"
                onClick={toggleMapStyle}
                className="w-full gap-2"
              >
                {mapStyle === "streets" ? (
                  <>
                    <Satellite className="w-4 h-4" />
                    Satellite View
                  </>
                ) : (
                  <>
                    <Map className="w-4 h-4" />
                    Street View
                  </>
                )}
              </Button>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Price Range
                </label>
                <span className="text-sm text-gray-500">
                  ₹{priceRangeLocal[0].toLocaleString("en-IN")} - ₹
                  {priceRangeLocal[1].toLocaleString("en-IN")}
                </span>
              </div>
              <Slider
                min={0}
                max={100000000}
                step={1000000}
                value={priceRangeLocal}
                onValueChange={(value: any) =>
                  setPriceRangeLocal(value as [number, number])
                }
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹0</span>
                <span>₹10Cr</span>
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={propertyType === "all" ? "default" : "outline"}
                  onClick={() => setPropertyType("all")}
                  className="h-auto py-2 flex-col gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Map className="w-4 h-4" />
                  </div>
                  <span>All</span>
                </Button>
                <Button
                  variant={
                    propertyType === "residential" ? "default" : "outline"
                  }
                  onClick={() => setPropertyType("residential")}
                  className="h-auto py-2 flex-col gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Home className="w-4 h-4" />
                  </div>
                  <span>Residential</span>
                </Button>
                <Button
                  variant={
                    propertyType === "commercial" ? "default" : "outline"
                  }
                  onClick={() => setPropertyType("commercial")}
                  className="h-auto py-2 flex-col gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Building className="w-4 h-4" />
                  </div>
                  <span>Commercial</span>
                </Button>
                <Button
                  variant={propertyType === "land" ? "default" : "outline"}
                  onClick={() => setPropertyType("land")}
                  className="h-auto py-2 flex-col gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <LandPlot className="w-4 h-4" />
                  </div>
                  <span>Land</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full text-blue-600 hover:text-blue-700"
              onClick={() => {
                setSearchQuery("");
                setPriceRange([0, 100000000]);
                setPriceRangeLocal([0, 100000000]);
                setPropertyType("all");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => {
            console.log("check", isMobileOpen);
            setIsMobileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default MapFilters;