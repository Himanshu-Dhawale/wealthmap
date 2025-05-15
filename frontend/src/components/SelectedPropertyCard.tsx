"use client";
import { useMapStore } from "@/store/mapStore";
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
    <div className="fixed bottom-4 left-4 right-4 md:right-auto md:w-96 z-50 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      <div className="relative">
        {selectedProperty.image ? (
          <img
            src={selectedProperty.image}
            alt={selectedProperty.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <button
          onClick={() => setSelectedProperty(null)}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
        >
          <MoveRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">{selectedProperty.title}</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            {getPropertyTypeIcon(selectedProperty.type)}
            <span className="capitalize">{selectedProperty.type}</span>
          </Badge>
        </div>

        <div className="flex items-center text-sm text-gray-600 mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{selectedProperty.address}</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-semibold flex items-center">
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

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Owner</p>
          <p className="font-medium">{selectedProperty.owner}</p>
          {selectedProperty.netWorth && (
            <p className="text-sm text-gray-600">
              Net worth: ₹{selectedProperty.netWorth.toLocaleString("en-IN")}
            </p>
          )}
        </div>

        <button className="w-full mt-4 px-2 py-1 bg-blue-600 hover:bg-blue-700">
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default SelectedPropertyCard;