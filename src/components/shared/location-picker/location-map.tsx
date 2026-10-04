'use client';

import 'leaflet/dist/leaflet.css';
import * as React from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { OSM_ATTRIBUTION, OSM_TILE_URL } from './constants';
import type { LatLng, LocationPickerProps } from './types';

/** CSS pin (see location-picker.css) — themed by `--primary-500`, no image assets. */
const PIN_ICON = L.divIcon({
  className: 'location-pin-anchor',
  html: '<span class="location-pin"></span>',
  iconSize: [32, 40],
  iconAnchor: [16, 40],
});

const ClickToPlace: React.FC<{ onPick: (value: LatLng) => void }> = ({ onPick }) => {
  useMapEvents({
    click: (event) => onPick({ lat: event.latlng.lat, lng: event.latlng.lng }),
  });

  return null;
};

/**
 * Re-centers on the pin when it lands outside the map's middle area (a place
 * search, or a click right at the edge); clicks well inside stay put.
 */
const FollowValue: React.FC<{ value: LatLng | null; zoom: number }> = ({ value, zoom }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!value) return;
    const target = L.latLng(value.lat, value.lng);
    if (!map.getBounds().pad(-0.2).contains(target)) {
      map.flyTo(target, Math.max(map.getZoom(), zoom));
    }
  }, [map, value, zoom]);

  return null;
};

/**
 * The Leaflet map itself. Browser-only (Leaflet touches `window` on import),
 * so `LocationPicker` loads it through `next/dynamic` with `ssr: false`.
 */
const LocationMap: React.FC<Required<Omit<LocationPickerProps, 'className'>>> = ({
  value,
  onChange,
  defaultCenter,
  zoom,
}) => {
  const center = value ?? defaultCenter;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom
      className="size-full"
    >
      <TileLayer url={OSM_TILE_URL} attribution={OSM_ATTRIBUTION} />
      <ClickToPlace onPick={onChange} />
      <FollowValue value={value} zoom={zoom} />
      {value && (
        <Marker
          position={[value.lat, value.lng]}
          icon={PIN_ICON}
          draggable
          eventHandlers={{
            dragend: (event) => {
              const point = (event.target as L.Marker).getLatLng();
              onChange({ lat: point.lat, lng: point.lng });
            },
          }}
        />
      )}
    </MapContainer>
  );
};

export default LocationMap;
