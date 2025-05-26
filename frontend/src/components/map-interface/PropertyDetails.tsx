import { formatUSD } from "@/lib/utils";
import { Property, PropertyType } from "@/types/types";
import { Building, Home, LandPlot, MapPin } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";

export const PropertyDetails = ({
  selectedProperty,
}: {
  selectedProperty: Property;
}) => {
  const { addressLine1, city, state, zipCode } =
    selectedProperty.owner.mailingAddress;
  const getPropertyTypeIcon = (type: PropertyType) => {
    switch (type) {
      case "residential":
        return <Home className="w-4 h-4" />;
      case "commercial":
        return <Building className="w-4 h-4" />;
      case "other":
        return <LandPlot className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };
  return (
    <>
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-bold">{selectedProperty.addressLine1}</h2>
        <Badge variant="outline" className="flex items-center gap-1">
          {getPropertyTypeIcon(selectedProperty.propertyType)}
          <span className="capitalize">{selectedProperty.propertyType}</span>
        </Badge>
      </div>

      <div className="flex items-center mt-1 text-sm text-gray-600">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{selectedProperty.formattedAddress}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-sm text-gray-500">Price</p>
          <p className="flex items-center text-lg font-semibold">
            {formatUSD(selectedProperty?.price)}
          </p>
        </div>

        {!!selectedProperty.squareFootage && (
          <div>
            <p className="text-sm text-gray-500">Area</p>
            <p className="text-lg font-semibold">
              {selectedProperty.squareFootage} sq.ft
            </p>
          </div>
        )}
      </div>

      {selectedProperty.yearBuilt && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Year Built</p>
          <p className="font-medium">{selectedProperty.yearBuilt}</p>
        </div>
      )}

      <div className="pt-4 mt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">Owner</p>
        <p className="font-medium">{selectedProperty.owner.names[0]}</p>
        {!!selectedProperty.networth && (
          <p className="text-sm text-gray-600">
            Net worth: ₹{selectedProperty.networth.toLocaleString("en-IN")}
          </p>
        )}
        <h5 className=" text-sm text-gray-600 mt-2">Contact</h5>
        <p className="mt-1 text-sm">Email: {selectedProperty.owner.email}</p>
        <div className="flex gap-2 items-center mt-2">
          <MapPin size={16} />
          <p className="text-sm">
            {addressLine1}, {city}, {state}, {zipCode}
          </p>
        </div>
      </div>
    </>
  );
};