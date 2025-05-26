import { FETCH_BOOKMARKS, FETCH_PROPERTIES } from "@/endpoints/map.endpoint";
import { getReq, delReq, postReq } from "@/lib/axios-helpers/apiClient";
import { BookMark, MapState, Property } from "@/types/types";
import { getSession } from "next-auth/react";
import { create } from "zustand";

export const useMapStore = create<MapState>((set, get) => ({
  selectedProperty: null,
  bookmarks: [],
  isBookmarking: false,
  properties: [],
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  filteredProperties: [],
  mapStyle: "streets",
  priceRange: [0, 10000000],
  propertyType: "all",
  searchQuery: "",
  showBookmarks: false,
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
        set((state) => ({
          ...state,
          properties: res.data.properties,
          filteredProperties: res.data.properties,
        }));
        get().filterProperties();
      }
    } catch (error) {
      console.error(error);
    }
  },
  toggleMapStyle: () =>
    set((state) => ({
      mapStyle: state.mapStyle === "streets" ? "satellite" : "streets",
    })),
  toggleShowBookmarks: () =>
    set((state) => ({ showBookmarks: !state.showBookmarks })),
  setPriceRange: (range) => set({ priceRange: range }),
  setPropertyType: (type) => set({ propertyType: type }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  fetchBookmarks: async () => {
    const session = await getSession();
    const token = session?.user.accessToken;
    try {
      const res = await getReq<{ bookmarks: BookMark[] }>(
        FETCH_BOOKMARKS,
        {},
        token
      );
      if (res.status === 200) {
        set({ bookmarks: res.data.bookmarks });
      }
    } catch (error) {
      console.error(error);
    }
  },
  toggleBookmark: async (propertyId: string) => {
    const session = await getSession();
    const token = session?.user.accessToken;
    const { bookmarks, selectedProperty } = get();

    set({ isBookmarking: true });
    try {
      // Check if already bookmarked
      const existingBookmark = bookmarks?.find(
        (b) => b.propertyId === propertyId
      );
      const isBookmarked = !!existingBookmark;

      if (isBookmarked) {
        // Remove bookmark
        await delReq(`property/${propertyId}/bookmark`, token);
        set({
          bookmarks: bookmarks.filter((b) => b.propertyId !== propertyId),
          isBookmarking: false,
        });
        get().fetchBookmarks();
      } else {
        // Add bookmark
        const res = await postReq(`property/${propertyId}/bookmark`, {}, token);
        if (res.status === 201 && selectedProperty) {
          const newBookmark: BookMark = {
            id: "",
            bookmarkedAt: new Date().toISOString(),
            propertyId: selectedProperty.id,
            property: selectedProperty,
          };
          set({
            bookmarks: [...bookmarks, newBookmark],
            isBookmarking: false,
          });
          get().fetchBookmarks();
        }
      }
    } catch (error) {
      console.error(error);
      set({ isBookmarking: false });
    }
  },
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