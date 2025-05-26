import { FETCH_PROPERTIES } from "@/endpoints/map.endpoint";
import { getReq } from "@/lib/axios-helpers/apiClient";
import { MapState, Property } from "@/types/types";
import { getSession } from "next-auth/react";
import { create } from "zustand";

export const useMapStore = create<MapState>((set, get) => ({
  selectedProperty: null,
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  properties: [],
  fetchProperties: async () => {
    const session = await getSession();
    const token = session?.user.accessToken;
    try {
      const res = await getReq<{ properties: Property[] }>(
        FETCH_PROPERTIES,
        {},
        token
      );
      if (res.status === 200) {
        set((state) => ({ ...state, properties: res.data.properties, filteredProperties: res.data.properties }));
        get().filterProperties();
      }
    } catch (error) {
      console.error(error);
    }
  },

  filteredProperties: [],
  mapStyle: "streets",
  toggleMapStyle: () =>
    set((state) => ({
      mapStyle: state.mapStyle === "streets" ? "satellite" : "streets",
    })),
  priceRange: [0, 10000000],
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
        propertyType === "all" || property.propertyType === propertyType;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        property.addressLine1.toLowerCase().includes(searchLower) ||
        property.formattedAddress.toLowerCase().includes(searchLower) ||
        (property.owner?.names?.[0]?.toLowerCase().includes(searchLower) ??
          false);
      return matchesPrice && matchesType && matchesSearch;
    }); 
    set({ filteredProperties: filtered });
  },
}));