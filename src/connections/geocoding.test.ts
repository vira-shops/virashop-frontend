import { searchPlace } from './geocoding';

describe('searchPlace', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it('asks Nominatim for one Persian result inside Iran and maps it', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => [{ lat: '31.89', lon: '54.36', display_name: 'یزد، ایران' }],
    });

    await expect(searchPlace(' میدان امیرچخماق ')).resolves.toEqual({
      lat: 31.89,
      lng: 54.36,
      label: 'یزد، ایران',
    });

    const url = new URL(fetchMock.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe('https://nominatim.openstreetmap.org/search');
    expect(url.searchParams.get('q')).toBe('میدان امیرچخماق');
    expect(url.searchParams.get('countrycodes')).toBe('ir');
    expect(url.searchParams.get('accept-language')).toBe('fa');
    expect(url.searchParams.get('limit')).toBe('1');
  });

  it('returns null for no match and skips blank queries', async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => [] });

    await expect(searchPlace('ناکجاآباد')).resolves.toBeNull();
    await expect(searchPlace('   ')).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('throws on an HTTP error', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 503 });

    await expect(searchPlace('یزد')).rejects.toThrow('Place search failed (503)');
  });
});
