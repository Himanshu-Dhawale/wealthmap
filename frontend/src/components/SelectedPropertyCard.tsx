"use client";
import { useMapStore } from "@/stores/mapStore";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  MoveRight,
  Home,
  Building,
  LandPlot,
  IndianRupee,
} from "lucide-react";
import { PropertyType } from "@/types/types";
import Image from "next/image";

const getPropertyTypeIcon = (type: PropertyType) => {
  switch (type) {
    case "residential":
      return <Home className="w-4 h-4" />;
    case "commercial":
      return <Building className="w-4 h-4" />;
    case "land":
      return <LandPlot className="w-4 h-4" />;
    default:
      return <Home className="w-4 h-4" />;
  }
};

const SelectedPropertyCard = () => {
  const { selectedProperty, setSelectedProperty } = useMapStore();

  if (!selectedProperty) return null;

  return (
    <div className="fixed z-50 w-full max-w-sm overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl bottom-4 right-4 md:right-8">
      <div className="relative">
        {selectedProperty.image ? (
          <div className="relative w-full h-48">
          <Image
            src={selectedProperty.image}
            alt={selectedProperty.title}
            className="absolute object-cover"
            fill
          />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-48 bg-gray-100">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <button
          onClick={() => setSelectedProperty(null)}
          className="absolute p-2 transition-colors rounded-full top-2 right-2 bg-white/80 hover:bg-white"
        >
          <MoveRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold">{selectedProperty.title}</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            {getPropertyTypeIcon(selectedProperty.type)}
            <span className="capitalize">{selectedProperty.type}</span>
          </Badge>
        </div>

        <div className="flex items-center mt-1 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{selectedProperty.address}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="flex items-center text-lg font-semibold">
              <IndianRupee className="w-4 h-4 mr-1" />
              {selectedProperty.price.toLocaleString("en-IN")}
            </p>
          </div>

          {!!selectedProperty.area && (
            <div>
              <p className="text-sm text-gray-500">Area</p>
              <p className="text-lg font-semibold">
                {selectedProperty.area} sq.ft
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Owner</p>
          <p className="font-medium">{selectedProperty.owner}</p>
          {selectedProperty.netWorth && (
            <p className="text-sm text-gray-600">
              Net worth: ₹{selectedProperty.netWorth.toLocaleString("en-IN")}
            </p>
          )}
        </div>

        <button className="w-full px-2 py-1 mt-4 bg-blue-600 hover:bg-blue-700">
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default SelectedPropertyCard;