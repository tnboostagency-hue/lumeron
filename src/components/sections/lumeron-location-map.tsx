"use client";

import { divIcon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const officeLocation: [number, number] = [26.22, 50.2];

const lumeronMarker = divIcon({
  className: "lumeron-location-marker",
  iconSize: [56, 64],
  iconAnchor: [28, 58],
  html: `
    <div class="lumeron-location-marker__halo"></div>
    <div class="lumeron-location-marker__pin">
      <img src="/lumeron-map-icon.svg" alt="" />
    </div>
    <span class="lumeron-location-marker__tip"></span>
  `,
});

export default function LumeronLocationMap({ mapsUrl }: { mapsUrl: string }) {
  return (
    <MapContainer
      center={officeLocation}
      zoom={16}
      className="lumeron-leaflet-map h-full w-full"
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl
      aria-label="Map showing Lumeron headquarters in Al Khobar"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={officeLocation}
        icon={lumeronMarker}
        alt="Lumeron headquarters"
        eventHandlers={{
          click: () => window.open(mapsUrl, "_blank", "noopener,noreferrer"),
        }}
      />
    </MapContainer>
  );
}
