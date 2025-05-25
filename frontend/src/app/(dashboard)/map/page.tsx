import PropertyMap from "@/components/map-interface/PropertyMap";
import SelectedPropertyCard from "@/components/map-interface/SelectedPropertyCard";
import MapFilters from "@/components/map-interface/MapFilters";

const MapPage = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-3 left-4 z-50">
        <MapFilters />
      </div>
      {/* Main Map Content */}
      <PropertyMap />
      <SelectedPropertyCard />
    </div>
  );
};
export default MapPage;