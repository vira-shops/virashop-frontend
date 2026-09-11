import { z } from 'zod';

export type Pagination = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type SuccessfulApiResponse<Data> = {
  status: 200;
  data: Data;
  pagination?: Pagination;
};

export type ApiErrorStatus = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 502 | 503;

export type FailedApiResponse = {
  status: ApiErrorStatus;
  message: string;
  /** Backend machine-readable error code (e.g. `INVALID_OTP`) when present. */
  errorCode?: string;
  /** Backend validation details (class-validator messages) when present. */
  details?: unknown;
};

export type ApiResponse<Data> = SuccessfulApiResponse<Data> | FailedApiResponse;

const ApiErrorStatusSchema = z.union([
  z.literal(400),
  z.literal(401),
  z.literal(403),
  z.literal(404),
  z.literal(409),
  z.literal(422),
  z.literal(429),
  z.literal(500),
  z.literal(502),
  z.literal(503),
]);

const PaginationSchema = z.object({
  total: z.coerce.number(),
  page: z.coerce.number(),
  pageSize: z.coerce.number(),
  totalPages: z.coerce.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

/** Backend error envelope: `{ status, data: { errorCode, message, details? } }`. */
const BackendErrorDataSchema = z.object({
  errorCode: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});
type BackendErrorEnvelope = {
  status: number;
  data: { errorCode: string; message: string; details?: unknown };
};

/** Detects the backend `{ status, data: { errorCode, ... } }` error envelope. */
export const isBackendErrorEnvelope = (payload: unknown): payload is BackendErrorEnvelope => {
  if (typeof payload !== 'object' || payload === null) return false;

  const candidate = payload as { status?: unknown; data?: unknown };

  return (
    typeof candidate.status === 'number' &&
    candidate.status !== 200 &&
    typeof candidate.data === 'object' &&
    candidate.data !== null &&
    'errorCode' in candidate.data
  );
};

/** Flattens any recognized error payload into a `FailedApiResponse`. */
export const toFailedApiResponse = (
  payload: unknown,
  httpStatus: number,
  fallbackMessage: string,
): FailedApiResponse => {
  const status = (
    ApiErrorStatusSchema.safeParse(httpStatus).success ? httpStatus : 500
  ) as FailedApiResponse['status'];

  if (typeof payload === 'object' && payload !== null) {
    const legacy = payload as { message?: unknown; errorCode?: unknown; details?: unknown };

    if (typeof legacy.message === 'string') {
      return {
        status,
        message: legacy.message,
        errorCode: typeof legacy.errorCode === 'string' ? legacy.errorCode : undefined,
        details: legacy.details,
      };
    }

    const backend = payload as { data?: Record<string, unknown> };

    if (backend.data && typeof backend.data === 'object') {
      const { message, errorCode, details } = backend.data;

      if (typeof message === 'string') {
        return {
          status,
          message,
          errorCode: typeof errorCode === 'string' ? errorCode : undefined,
          details,
        };
      }
    }
  }

  return { status, message: fallbackMessage };
};

/** Wraps a zod schema as a type-safe, runtime-validated API response. */
export const apiResponseWrapper = <T extends z.ZodTypeAny>(data: T) => {
  const successSchema = z.object({
    status: z.literal(200),
    data,
    pagination: PaginationSchema.optional(),
  });

  const errorSchema = z.union([
    z.object({ status: ApiErrorStatusSchema, message: z.string() }),
    z.object({ status: ApiErrorStatusSchema, data: BackendErrorDataSchema }),
  ]);

  return z.union([successSchema, errorSchema]);
};

/** Wraps raw mock data in the canonical `SuccessfulApiResponse` envelope. */
export const mockDataWrapper = <T>(data: T): SuccessfulApiResponse<T> => {
  return {
    status: 200,
    data,
  };
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ContractEntry<
  TRequest extends z.ZodTypeAny = z.ZodTypeAny,
  TResponse extends z.ZodTypeAny = z.ZodTypeAny,
  TMock = unknown,
> {
  method: HttpMethod;
  path: string;
  request?: TRequest;
  response: TResponse;
  auth?: boolean;
  mockData?: TMock;
}

/** Contracts tree grouped by namespace — declare with `satisfies Contracts`. */
export type Contracts = {
  readonly [namespace: string]: {
    readonly [endpoint: string]: ContractEntry;
  };
};

/** Extracts every `{name}` segment from a path string. */
export type PathParams<P extends string> = P extends `${string}{${infer Param}}${infer Rest}`
  ? Param | PathParams<Rest>
  : never;
