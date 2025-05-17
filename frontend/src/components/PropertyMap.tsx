"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/store/mapStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { filteredProperties, setSelectedProperty, mapStyle, setProperties } =
    useMapStore();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${
        mapStyle === "satellite" ? "satellite-v9" : "streets-v12"
      }`,
      center: [77.5946, 12.9716], // Default to Bangalore
      zoom: 11,
      maxZoom: 18,
      minZoom: 10,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());
    mapRef.current.addControl(new mapboxgl.FullscreenControl());
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    mapRef.current.on("load", () => {
      setIsMapLoaded(true);
      setProperties([
        {
          id: "1",
          title: "Luxury Apartment",
          address: "123 MG Road, Bangalore",
          lat: 12.9716,
          lng: 77.5946,
          price: 12000000,
          area: 1800,
          type: "residential",
          owner: "Rajesh Kumar",
          netWorth: 50000000,
          lastSoldPrice: 9000000,
          yearBuilt: 2018,
          image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
          id: "2",
          title: "Commercial Space",
          address: "456 Brigade Road, Bangalore",
          lat: 12.975,
          lng: 77.6,
          price: 35000000,
          area: 3500,
          type: "commercial",
          owner: "Infinity Developers",
          netWorth: 2000000000,
          yearBuilt: 2020,
          image:
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
      ]);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  // Update map style when changed
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;
    mapRef.current.setStyle(
      `mapbox://styles/mapbox/${
        mapStyle === "satellite" ? "satellite-v9" : "streets-v12"
      }`
    );
  }, [mapStyle, isMapLoaded]);

  // Add/update markers when filtered properties change
  useEffect(() => {
    if (!mapRef.current || !isMapLoaded) return;

    // Remove existing markers
    document.querySelectorAll(".mapboxgl-marker").forEach((el) => el.remove());

    // Create a bounds object to fit the map to markers
    const bounds = new mapboxgl.LngLatBounds();

    filteredProperties.forEach((property) => {
      const el = document.createElement("div");
      el.className = `property-marker w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer flex items-center justify-center text-white text-xs font-bold`;

      // Different colors for different property types
      if (property.type === "residential") {
        el.classList.add("bg-blue-500");
        el.textContent = "🏠";
      } else if (property.type === "commercial") {
        el.classList.add("bg-purple-500");
        el.textContent = "🏢";
      } else {
        el.classList.add("bg-green-500");
        el.textContent = "🌳";
      }

      el.addEventListener("click", () => {
        setSelectedProperty(property);
        mapRef.current?.flyTo({
          center: [property.lng, property.lat],
          zoom: 14,
          essential: true,
        });
      });
      if (mapRef.current) {
        new mapboxgl.Marker(el)
          .setLngLat([property.lng, property.lat])
          .addTo(mapRef.current);
      }

      // Extend the bounds to include this marker
      bounds.extend([property.lng, property.lat]);
    });

    // Fit the map to the bounds of all markers if there are any
    if (filteredProperties.length > 0) {
      mapRef.current.fitBounds(bounds, {
        padding: 100,
        maxZoom: 14,
      });
    }
  }, [filteredProperties, isMapLoaded]);

  return (
    <div
      ref={mapContainer}
      className="h-full w-full rounded-xl shadow-lg relative"
    />
  );
};

export default PropertyMap;