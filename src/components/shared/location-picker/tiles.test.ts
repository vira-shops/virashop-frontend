import { tileBlockFor, toTileCoords } from './tiles';

describe('tile math', () => {
  it('maps lat/lng onto OSM tile coordinates', () => {
    // Null Island sits on the corner of the four central tiles.
    expect(toTileCoords({ lat: 0, lng: 0 }, 1)).toEqual({ x: 1, y: 1 });

    // The antimeridian is x = 0; Web Mercator's top edge (85.0511°) is y = 0.
    const corner = toTileCoords({ lat: 85.0511287798, lng: -180 }, 15);
    expect(corner.x).toBe(0);
    expect(corner.y).toBeCloseTo(0, 3);

    // East of Greenwich and north of the equator → right half, top half.
    const yazd = toTileCoords({ lat: 31.8974, lng: 54.3569 }, 15);
    expect(yazd.x).toBeGreaterThan(2 ** 14);
    expect(yazd.y).toBeLessThan(2 ** 14);
  });

  it('keeps the point in the middle half of its 2x2 block', () => {
    const block = tileBlockFor({ lat: 31.8974, lng: 54.3569 }, 15);

    expect(block.zoom).toBe(15);
    for (const offset of [block.offsetX, block.offsetY]) {
      expect(offset).toBeGreaterThanOrEqual(0.5);
      expect(offset).toBeLessThanOrEqual(1.5);
    }
  });
});
