import type { LatLng } from './types';

export interface TileBlock {
  zoom: number;
  /** Top-left tile of the 2×2 block. */
  x0: number;
  y0: number;
  /**
   * Point position inside the block, in tile units (each in `[0.5, 1.5]`),
   * so the point always sits in the block's middle half — shifting the block
   * to center the point never exposes an edge.
   */
  offsetX: number;
  offsetY: number;
}

/** Fractional Web-Mercator tile coordinates of a point (the OSM slippy-map scheme). */
export const toTileCoords = ({ lat, lng }: LatLng, zoom: number): { x: number; y: number } => {
  const n = 2 ** zoom;
  const latRad = (lat * Math.PI) / 180;

  return {
    x: ((lng + 180) / 360) * n,
    y: ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n,
  };
};

/** The 2×2 tile block a static thumbnail draws, centered on `point`. */
export const tileBlockFor = (point: LatLng, zoom: number): TileBlock => {
  const { x, y } = toTileCoords(point, zoom);
  const x0 = Math.round(x) - 1;
  const y0 = Math.round(y) - 1;

  return { zoom, x0, y0, offsetX: x - x0, offsetY: y - y0 };
};
