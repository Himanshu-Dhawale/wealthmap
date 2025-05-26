import Image from "next/image";
import { Property } from "@/types/types";
import { Home } from "lucide-react";

interface PropertyHoverCardProps {
  property: Property | null;
  position: { top: number; left: number } | null;
  visible: boolean;
}

export const PropertyHoverCard = ({
  property,
  position,
  visible,
}: PropertyHoverCardProps) => {
  if (!visible || !property) return null;
  return (
    <div
      className="absolute z-50 w-64 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-200"
      style={{
        top: `${position?.top}px`,
        left: `${position?.left}px`,
        transform: "translate(-100%, -100%)",
      }}
    >
      <div className="relative">
        {/* Property Image */}
        <div className="h-32 w-full bg-gray-100 rounded-t-lg overflow-hidden">
          {property.image ? (
            <Image
              src={property.image}
              alt={property.addressLine1}
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Home className="h-12 w-12" />
            </div>
          )}
        </div>
        {/* Property Details */}
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{property.addressLine1}</h3>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {property.formattedAddress}
          </p>
          <div className="flex justify-between mt-2 text-xs">
            <div>
              <span className="text-gray-500">Value:</span>
              <span className="ml-1 font-medium">
                ${property.price?.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Size:</span>
              <span className="ml-1 font-medium">{property.squareFootage} sqft</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white" />
      </div>
    </div>
  );
};