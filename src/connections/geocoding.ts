/**
 * Place search for the map picker — OpenStreetMap's Nominatim, a third-party
 * service (not our backend, so it is not a contract). Their usage policy
 * allows light, user-triggered lookups: call this on submit, never per
 * keystroke.
 */

const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';

export interface GeocodeResult {
  lat: number;
  lng: number;
  /** Nominatim's display name, in Persian when available. */
  label: string;
}

interface NominatimPlace {
  lat: string;
  lon: string;
  display_name: string;
}

/** Best match for `query` inside Iran, or `null` when nothing matches. */
export async function searchPlace(
  query: string,
  signal?: AbortSignal,
): Promise<GeocodeResult | null> {
  const q = query.trim();
  if (!q) return null;

  const params = new URLSearchParams({
    q,
    format: 'jsonv2',
    limit: '1',
    countrycodes: 'ir',
    'accept-language': 'fa',
  });

  const response = await fetch(`${NOMINATIM_SEARCH_URL}?${params.toString()}`, { signal });
  if (!response.ok) throw new Error(`Place search failed (${response.status})`);

  const [place] = (await response.json()) as NominatimPlace[];
  if (!place) return null;

  return { lat: Number(place.lat), lng: Number(place.lon), label: place.display_name };
}
