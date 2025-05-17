import PropertyMap from "@/components/PropertyMap";
import SelectedPropertyCard from "@/components/SelectedPropertyCard";
import MapFilters from "@/components/MapFilters";

const MapPage = () => {
  return (
    <div className="flex h-full">
      <div className="block">
        <MapFilters />
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Property Explorer</h1>
        </div>
        <div className=" relative h-full">
          <PropertyMap />
          <SelectedPropertyCard />
        </div>
      </div>
    </div>
  );
};

export default MapPage;