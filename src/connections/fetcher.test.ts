import { api } from './fetcher';

const setFetchResponse = (response: {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<unknown>;
}) => {
  global.fetch = jest.fn().mockResolvedValue(response) as unknown as typeof fetch;
};

describe('api()', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  });

  it('resolves contract mockData when NEXT_PUBLIC_API_BASE_URL is unset', async () => {
    const response = await api('cities', 'getList');

    expect(response.status).toBe(200);

    if (response.status === 200) {
      expect(response.data).toHaveLength(6);
      expect(response.data[0]).toEqual({ value: 'tehran', label: 'تهران' });
    }
  });

  it('performs a network request against the base URL and returns the validated payload', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://test.local';
    setFetchResponse({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({
        status: 200,
        data: [
          { value: 'tehran', label: 'تهران' },
          { value: 'esfahan', label: 'اصفهان' },
        ],
      }),
    });

    const response = await api('cities', 'getList');

    expect(global.fetch).toHaveBeenCalledWith(
      'http://test.local/cities',
      expect.objectContaining({ method: 'GET' }),
    );
    expect(response.status).toBe(200);

    if (response.status === 200) {
      expect(response.data).toHaveLength(2);
    }
  });

  it('returns 502 when a 200 response does not match the contract schema', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://test.local';
    setFetchResponse({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ status: 200, data: [{ value: 123, label: 456 }] }),
    });

    const response = await api('cities', 'getList');

    expect(response.status).toBe(502);
  });

  it('returns a well-formed error envelope from the server as-is', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://test.local';
    setFetchResponse({
      ok: false,
      status: 422,
      statusText: 'Unprocessable Entity',
      json: async () => ({ status: 422, message: 'خطای اعتبارسنجی' }),
    });

    const response = await api('cities', 'getList');

    expect(response.status).toBe(422);

    if (response.status !== 200) {
      expect(response.message).toBe('خطای اعتبارسنجی');
    }
  });

  it('maps a non-ok response with a non-JSON body to its HTTP status', async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://test.local';
    setFetchResponse({
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
      json: async () => {
        throw new Error('not json');
      },
    });

    const response = await api('cities', 'getList');

    expect(response.status).toBe(503);

    if (response.status !== 200) {
      expect(response.message).toBe('Service Unavailable');
    }
  });

  it('throws when useMock is explicitly false without a base URL', () => {
    expect(() => api('cities', 'getList', { useMock: false })).toThrow(/NEXT_PUBLIC_API_BASE_URL/);
  });
});
