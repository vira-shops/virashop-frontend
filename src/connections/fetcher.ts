import { z } from 'zod';
import {
  ApiResponse,
  ContractEntry,
  isBackendErrorEnvelope,
  mockDataWrapper,
  toFailedApiResponse,
} from './utils';
import { getAuthToken, notifyUnauthorized } from './auth-token';
import { contracts } from '@/contracts';

type ContractsMap = typeof contracts;

export type ApiInit = Omit<RequestInit, 'method' | 'body'> & {
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  useMock?: boolean;
};

/** Resolves the inferred `data` payload type from a contract's response schema. */
export type ResponseData<TResponse> =
  z.infer<TResponse> extends infer TInferred
    ? TInferred extends { status: 200; data: infer TData }
      ? TData
      : TInferred extends Array<infer TItem>
        ? TItem
        : never
    : never;

const resolvePath = (path: string, params: Record<string, string | number> = {}): string => {
  return path.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = params[key];

    if (value === undefined) {
      throw new Error(`Missing path parameter "${key}" for "${path}"`);
    }

    return encodeURIComponent(String(value));
  });
};

const buildQueryString = (query: ApiInit['query'] = {}): string => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) continue;
    search.set(key, String(value));
  }

  const result = search.toString();

  return result ? `?${result}` : '';
};

const getBaseUrl = (): string => {
  // Read directly off `process.env` — Next.js only inlines `NEXT_PUBLIC_*`
  // into the browser bundle when it sees this exact member-expression
  // pattern; indirecting through a variable defeats that replacement.
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is not set — cannot perform a network request. ' +
        'Set it in .env.local, or let the contract resolve its mockData instead.',
    );
  }

  return baseUrl;
};

const resolveMockData = (namespace: string, endpoint: string): unknown => {
  const ns = (contracts as Record<string, Record<string, ContractEntry>>)[namespace];
  const entry = ns?.[endpoint];

  if (!entry || entry.mockData === undefined) return undefined;

  const wrapped =
    (entry.mockData as { status?: number }).status === 200
      ? entry.mockData
      : mockDataWrapper(entry.mockData);

  return wrapped;
};

const buildRequestHeaders = (init: RequestInit): Record<string, string> => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    // The API translates error messages; the UI copy is Persian.
    'Accept-Language': 'fa',
  };

  const token = getAuthToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Let the browser set the multipart boundary — never set Content-Type for FormData.
  if (!(init.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  Object.assign(headers, (init.headers as Record<string, string> | undefined) ?? {});

  return headers;
};

async function performFetch<TData>(
  url: string,
  init: RequestInit,
  responseSchema: z.ZodTypeAny,
): Promise<ApiResponse<TData>> {
  const response = await fetch(url, {
    ...init,
    headers: buildRequestHeaders(init),
  });

  let payload: unknown;

  try {
    payload = await response.json();
  } catch {
    // Non-JSON body — falls through to schema validation as a FailedApiResponse.
    payload = null;
  }

  // Any 401 means the token is missing/invalid/expired/denylisted — drop the
  // session everywhere, not just wherever this particular call surfaced it.
  if (response.status === 401) {
    notifyUnauthorized();
  }

  const parsed = responseSchema.safeParse(payload);

  if (parsed.success) {
    // The backend error envelope matched the schema — flatten it so callers
    // always see a flat `FailedApiResponse` with `errorCode`.
    if (isBackendErrorEnvelope(parsed.data)) {
      return toFailedApiResponse(
        parsed.data,
        response.status,
        response.statusText || 'Request failed',
      );
    }

    return parsed.data as ApiResponse<TData>;
  }

  if (!response.ok) {
    return toFailedApiResponse(payload, response.status, response.statusText || 'Request failed');
  }

  return {
    status: 502,
    message: 'Server response did not match the contract schema.',
  };
}

export interface ApiCallOptions {
  pathParams?: Record<string, string | number>;
}

/**
 * Type-safe endpoint caller — the returned `data` is narrowed to the
 * contract's payload type.
 *
 * @example
 * const response = await api('cities', 'getList');
 * if (response.status === 200) console.log(response.data); // City[]
 */
export function api<
  TNamespace extends keyof ContractsMap,
  TEndpoint extends keyof ContractsMap[TNamespace],
>(
  namespace: TNamespace,
  endpoint: TEndpoint,
  init?: ApiInit,
  options?: ApiCallOptions,
): Promise<ApiResponse<ApiData<TNamespace, TEndpoint>>>;
export function api(
  namespace: string,
  endpoint: string,
  init: ApiInit = {},
  options: ApiCallOptions = {},
): Promise<ApiResponse<unknown>> {
  const ns = (contracts as Record<string, Record<string, ContractEntry>>)[namespace];
  const entry = ns?.[endpoint];

  if (!entry) {
    throw new Error(`Unknown contract: ${namespace}.${endpoint}`);
  }

  const useMock = init.useMock ?? !process.env.NEXT_PUBLIC_API_BASE_URL;

  if (useMock) {
    const mock = resolveMockData(namespace, endpoint);

    if (mock === undefined) {
      throw new Error(
        `No mockData for ${namespace}.${endpoint} — cannot fall back to network without NEXT_PUBLIC_API_BASE_URL.`,
      );
    }

    return Promise.resolve(mock as ApiResponse<unknown>);
  }

  const url =
    getBaseUrl() + resolvePath(entry.path, options.pathParams) + buildQueryString(init.query);

  // FormData (multipart uploads) passes through untouched — JSON otherwise.
  const body =
    init.body instanceof FormData
      ? init.body
      : init.body !== undefined
        ? JSON.stringify(init.body)
        : undefined;

  return performFetch(
    url,
    {
      method: entry.method,
      body,
    },
    entry.response,
  );
}

/** Inferred `data` type of a contract endpoint. */
export type ApiData<
  TNamespace extends keyof ContractsMap,
  TEndpoint extends keyof ContractsMap[TNamespace],
> = ContractsMap[TNamespace][TEndpoint] extends {
  response: infer TResponse;
}
  ? ResponseData<TResponse>
  : never;
