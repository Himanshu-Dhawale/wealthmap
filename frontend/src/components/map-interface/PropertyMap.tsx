"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/stores/mapStore";
import ReactDOMServer from "react-dom/server";
import { MapPin } from "lucide-react";
import { Property } from "@/types/types";
import { PropertyHoverCard } from "./PropertyHoverCard";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const PropertyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const {
    filteredProperties,
    setSelectedProperty,
    mapStyle,
    fetchProperties,
    setPropertyType,
    propertyType,
  } = useMapStore();
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>({ top: 0, left: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
      setPropertyType("all");
      mapRef.current.on("load", () => {
        setIsMapLoaded(true);
        fetchProperties();
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
    // Clear existing markers
    document.querySelectorAll(".mapboxgl-marker").forEach((el) => el.remove());
    // Add new markers and collect coordinates
    const bounds = new mapboxgl.LngLatBounds();
    const commercialCoordinates: [number, number][] = [];

    filteredProperties.forEach((property) => {
      const markerElement = document.createElement("div");
      markerElement.className = `property-marker w-6 h-6 rounded-full text-white text-xs bg-red-500 cursor-pointer flex items-center justify-center`;
      const iconElement = <MapPin size={14} />;
      const iconString = ReactDOMServer.renderToString(iconElement);
      markerElement.innerHTML = iconString;

      const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        setIsHovered(true);
        setHoveredProperty(property);
        const markerRect = markerElement.getBoundingClientRect();
        setPopupPosition({
          top: markerRect.top + window.scrollY,
          left: markerRect.left + window.scrollX + markerRect.width / 2,
        });
      };

      const handleMouseLeave = () => {
        // Add a small delay before hiding, in case of accidental quick mouse movements
        hoverTimeoutRef.current = setTimeout(() => {
          setIsHovered(false);
          setHoveredProperty(null);
        }, 100);
      };

      const handleClick = () => {
        setIsHovered(false);
        setHoveredProperty(null);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        setSelectedProperty(property);
        mapRef.current?.flyTo({
          center: [property.longitude, property.latitude],
          zoom: 14,
          essential: true,
        });
      };

      markerElement.addEventListener("mouseenter", handleMouseEnter);
      markerElement.addEventListener("mouseleave", handleMouseLeave);
      markerElement.addEventListener("click", handleClick);

      if (mapRef.current) {
        new mapboxgl.Marker({ element: markerElement })
          .setLngLat([property.longitude, property.latitude])
          .addTo(mapRef.current);
      }
      bounds.extend([property.longitude, property.latitude]);

      // Collect commercial property coordinates
      if (property.propertyType === "commercial") {
        commercialCoordinates.push([property.longitude, property.latitude]);
      }
      return () => {
        markerElement.removeEventListener("mouseenter", handleMouseEnter);
        markerElement.removeEventListener("mouseleave", handleMouseLeave);
        markerElement.removeEventListener("click", handleClick);
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
      };
    });

    if (
      propertyType === "all" ||
      (propertyType === "commercial" && commercialCoordinates.length === 0)
    ) {
      mapRef.current.flyTo({
        center: [-74.006, 40.7128],
        zoom: 11,
        essential: true,
      });
    } else if (
      propertyType === "commercial" &&
      commercialCoordinates.length > 0
    ) {
      // Fly to nearest commercial property
      const currentCenter = mapRef.current.getCenter();
      let nearestCoord = commercialCoordinates[0];
      let minDistance = Infinity;

      // Find nearest commercial property to current view
      commercialCoordinates.forEach((coord) => {
        const distance = Math.sqrt(
          Math.pow(coord[0] - currentCenter.lng, 2) +
            Math.pow(coord[1] - currentCenter.lat, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestCoord = coord;
        }
      });

      mapRef.current.flyTo({
        center: nearestCoord,
        zoom: 12,
        essential: true,
      });
    } else if (filteredProperties.length > 0) {
      // Default behavior for other filters
      mapRef.current.fitBounds(bounds, {
        padding: 100,
        maxZoom: 14,
      });
    }
  }, [filteredProperties, isMapLoaded, propertyType]);

  return (
    <>
      <div
        ref={mapContainer}
        className="h-full w-full rounded-xl shadow-lg relative"
      />
      {isHovered && hoveredProperty && (
        <PropertyHoverCard
          property={hoveredProperty}
          position={popupPosition}
          visible={isHovered}
        />
      )}
    </>
  );
};

export default PropertyMap;