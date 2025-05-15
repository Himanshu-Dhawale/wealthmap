// // app/(dashboard)/map/page.tsx
// import PropertyMap from '@/components/PropertyMap';
// import SelectedPropertyCard from '@/components/SelectedPropertyCard';
// const MapPage = () => {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-4">Explore Properties</h1>
//       <PropertyMap />
//       <SelectedPropertyCard />
//     </div>
//   );
// }
// export default MapPage;






import PropertyMap from '@/components/PropertyMap';
import SelectedPropertyCard from '@/components/SelectedPropertyCard';
import MapFilters from '@/components/MapFilters';

const MapPage = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Explore Properties</h1>
      </div>
      
      <MapFilters />
        <div className="relative">
          <PropertyMap />
          <SelectedPropertyCard />
        </div>
    </div>
  );
};

export default MapPage;