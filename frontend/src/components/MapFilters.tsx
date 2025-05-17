"use client";
import { useMapStore } from "@/store/mapStore";
import { Slider } from "@/components/ui/slider";
import {
  Building,
  Home,
  LandPlot,
  Map,
  Satellite,
  Filter,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const MapFilters = () => {
  const {
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    propertyType,
    setPropertyType,
    filterProperties,
    mapStyle,
    toggleMapStyle,
  } = useMapStore();

  const [isOpen, setIsOpen] = useState(false);
  const [priceRangeLocal, setPriceRangeLocal] = useState(priceRange);

  useEffect(() => {
    filterProperties();
  }, [searchQuery, priceRange, propertyType]);

  // Debounce price range updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        priceRangeLocal[0] !== priceRange[0] ||
        priceRangeLocal[1] !== priceRange[1]
      ) {
        setPriceRange(priceRangeLocal);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [priceRangeLocal]);

  return (
    <>
      {/* Floating Filter Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-50 shadow-lg transition-all",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <Filter className="w-4 h-4" />
        Filters
      </Button>

      {/* Filters Panel */}
      {isOpen && (
        <div className="absolute top-0 left-0 bg-white rounded-lg shadow-xl border border-gray-200 w-72 z-50">
          {/* Panel Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Map Filters</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="p-4 space-y-5">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 outline-none rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Properties, addresses, owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Map Style Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Map Style
              </label>
              <div className="flex gap-2">
                <Button
                  variant={mapStyle === "streets" ? "default" : "outline"}
                  onClick={() => toggleMapStyle()}
                  className="flex-1"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Map
                </Button>
                <Button
                  variant={mapStyle === "satellite" ? "default" : "outline"}
                  onClick={() => toggleMapStyle()}
                  className="flex-1"
                >
                  <Satellite className="w-4 h-4 mr-2" />
                  Satellite
                </Button>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price: ₹{priceRangeLocal[0].toLocaleString("en-IN")} - ₹
                {priceRangeLocal[1].toLocaleString("en-IN")}
              </label>
              <Slider
                min={0}
                max={100000000}
                step={1000000}
                value={priceRangeLocal}
                onValueChange={(value) =>
                  setPriceRangeLocal(value as [number, number])
                }
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹10Cr</span>
              </div>
            </div>

            {/* Property Type - Improved Design */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={propertyType === "all" ? "default" : "outline"}
                  onClick={() => setPropertyType("all")}
                  size="sm"
                  className="h-8"
                >
                  All
                </Button>
                <Button
                  variant={
                    propertyType === "residential" ? "default" : "outline"
                  }
                  onClick={() => setPropertyType("residential")}
                  size="sm"
                  className="h-8"
                >
                  <Home className="w-3.5 h-3.5 mr-1" />
                  Res
                </Button>
                <Button
                  variant={
                    propertyType === "commercial" ? "default" : "outline"
                  }
                  onClick={() => setPropertyType("commercial")}
                  size="sm"
                  className="h-8"
                >
                  <Building className="w-3.5 h-3.5 mr-1" />
                  Com
                </Button>
                <Button
                  variant={propertyType === "land" ? "default" : "outline"}
                  onClick={() => setPropertyType("land")}
                  size="sm"
                  className="h-8 "
                >
                  <LandPlot className="w-3.5 h-3.5 mr-1" />
                  Land
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapFilters;