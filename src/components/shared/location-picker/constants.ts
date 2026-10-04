import type { LatLng } from './types';

/** Yazd — where the platform starts; the map opens here without a value. */
export const DEFAULT_CENTER: LatLng = { lat: 31.8974, lng: 54.3569 };
export const DEFAULT_ZOOM = 15;

export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

/** One raster tile, for static thumbnails that do not load Leaflet. */
export const osmTileUrl = (zoom: number, x: number, y: number): string =>
  `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;

/** Street-level detail that still reads at thumbnail size. */
export const THUMBNAIL_ZOOM = 15;
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const LOCATION_PICKER_COPY = {
  title: 'آدرس',
  description: 'آدرس خود را روی نقشه انتخاب کنید',
  confirm: 'تایید',
  mapLabel: 'نقشه — برای انتخاب موقعیت کلیک کنید یا نشانگر را بکشید',
  pick: 'انتخاب روی نقشه',
  change: 'تغییر موقعیت روی نقشه',
  thumbnail: 'موقعیت روی نقشه',
  search: 'جستجو و ...',
  searchLabel: 'جستجوی مکان روی نقشه',
  searching: 'در حال جستجو…',
  notFound: 'مکانی با این نام پیدا نشد',
  searchFailed: 'جستجو انجام نشد، دوباره تلاش کنید',
} as const;
