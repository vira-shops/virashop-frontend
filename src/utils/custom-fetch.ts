import { env } from '@/config/env';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function getApiUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${env.API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

type CustomFetchOptions = RequestInit & { requiresAuth?: boolean };

export async function customFetch<T>(url: string, options: CustomFetchOptions = {}): Promise<T> {
  const { headers, body, ...rest } = options;

  const isPlainBody =
    body !== undefined &&
    typeof body === 'object' &&
    body !== null &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams);

  const response = await fetch(getApiUrl(url), {
    ...rest,
    headers: {
      ...(isPlainBody ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: isPlainBody ? JSON.stringify(body) : (body as BodyInit | null | undefined),
    credentials: 'include',
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      (data as { message?: string } | null)?.message || 'خطا در ارتباط با سرور',
      data,
    );
  }

  return data as T;
}
