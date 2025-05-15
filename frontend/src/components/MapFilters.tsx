'use client';
import { useMapStore } from '@/store/mapStore';
import { Slider } from '@/components/ui/slider';
import { Building, Home, LandPlot, Map, Satellite } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from './ui/button';


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

  // Apply filters when any filter changes
  useEffect(() => {
    filterProperties();
    // debouncedFilter();
    // return () => debouncedFilter.cancel();
  }, [searchQuery, priceRange, propertyType]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <input type='text' className='p-2 outline-none border'
            placeholder="Search properties, addresses, owners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Price Range Slider */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Price Range: ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
          </label>
          <Slider
            min={0}
            max={100000000}
            step={1000000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
          />
        </div>
        
        {/* View Toggle and Map Style */}
        <div className="flex items-center justify-end space-x-2">         
          <Button 
            variant="outline" 
            onClick={toggleMapStyle}
            className="flex items-center gap-2"
          >
            {mapStyle === 'streets' ? (
              <>
                <Satellite className="w-4 h-4" />
                <span>Satellite</span>
              </>
            ) : (
              <>
                <Map className="w-4 h-4" />
                <span>Map</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Property Type Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant={propertyType === 'all' ? 'default' : 'outline'}
          onClick={() => setPropertyType('all')}
        >
          All Properties
        </Button>
        <Button
          variant={propertyType === 'residential' ? 'default' : 'outline'}
          onClick={() => setPropertyType('residential')}
          className="flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Residential
        </Button>
        <Button
          variant={propertyType === 'commercial' ? 'default' : 'outline'}
          onClick={() => setPropertyType('commercial')}
          className="flex items-center gap-2"
        >
          <Building className="w-4 h-4" />
          Commercial
        </Button>
        <Button
          variant={propertyType === 'land' ? 'default' : 'outline'}
          onClick={() => setPropertyType('land')}
          className="flex items-center gap-2"
        >
          <LandPlot className="w-4 h-4" />
          Land
        </Button>
      </div>
    </div>
  );
};

export default MapFilters;