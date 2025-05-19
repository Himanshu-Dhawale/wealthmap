"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/stores/mapStore";
import { propertiesData } from "@/data/proerties";
import { Home, Building, TreeDeciduous } from "lucide-react";
import ReactDOMServer from "react-dom/server";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { filteredProperties, setSelectedProperty, mapStyle, setProperties } =
    useMapStore();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Check if the map container is empty, or the map was removed due to unmount
    const mapContainerExists =
      mapContainer.current.querySelector(".mapboxgl-canvas");
    if (!mapRef.current || !mapContainerExists) {
      // If map already exists in memory but not in DOM, recreate it
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${
          mapStyle === "satellite" ? "satellite-v9" : "streets-v12"
        }`,
        center: [-74.006, 40.7128],
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
        setProperties(propertiesData);
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setIsMapLoaded(false);
      }
    };
  }, [mapContainer.current]);

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
      const markerElement = document.createElement("div");
      markerElement.className = `property-marker w-6 h-6 rounded-full text-white text-xs bg-red-500 cursor-pointer flex items-center justify-center`;

      let iconElement;
      if (property.type === "residential") {
        iconElement = <Home size={14} />;
      } else if (property.type === "commercial") {
        iconElement = <Building size={14} />;
      } else {
        iconElement = <TreeDeciduous size={14} />;
      }
      // Render the React element to a string
      const iconString = ReactDOMServer.renderToString(iconElement);
      markerElement.innerHTML = iconString;

      markerElement.addEventListener("click", () => {
        setSelectedProperty(property);
        mapRef.current?.flyTo({
          center: [property.lng, property.lat],
          zoom: 14,
          essential: true,
        });
      });

      if (mapRef.current) {
        new mapboxgl.Marker({ element: markerElement })
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
  }, [filteredProperties, isMapLoaded, setSelectedProperty, mapRef]);

  return (
    <div
      ref={mapContainer}
      className="h-full w-full rounded-xl shadow-lg relative"
    />
  );
};

export default PropertyMap;