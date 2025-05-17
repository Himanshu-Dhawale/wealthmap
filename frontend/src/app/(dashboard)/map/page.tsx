import PropertyMap from "@/components/PropertyMap";
import SelectedPropertyCard from "@/components/SelectedPropertyCard";
import MapFilters from "@/components/MapFilters";

const MapPage = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 left-4 z-50">
        <MapFilters />
      </div>
      {/* Main Map Content */}
      <PropertyMap />
      <SelectedPropertyCard />
    </div>
  );
};
export default MapPage;