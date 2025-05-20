import { MapState, Property } from "@/types/types";
import { create } from "zustand";

export const useMapStore = create<MapState>((set, get) => ({
  selectedProperty: null,
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  properties: [],
  setProperties: (props) => set({ properties: props }),
  filteredProperties: [],
  mapStyle: "streets",
  toggleMapStyle: () =>
    set((state) => ({
      mapStyle: state.mapStyle === "streets" ? "satellite" : "streets",
    })),
  priceRange: [0, 100000000],
  setPriceRange: (range) => set({ priceRange: range }),
  propertyType: "all",
  setPropertyType: (type) => set({ propertyType: type }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  isLoading: false,
  filterProperties: () => {
    const { properties, priceRange, propertyType, searchQuery } = get();
    const filtered = properties.filter((property: Property) => {
      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];
      const matchesType =
        propertyType === "all" || property.type === propertyType;
      const matchesSearch =
        searchQuery === "" ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.owner.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPrice && matchesType && matchesSearch;
    });
    set({ filteredProperties: filtered });
  },
}));