/**
 * Registry for the auth token provider.
 *
 * The fetcher (lowest layer) must not import feature stores, so the auth
 * feature registers a getter here once at module load. This keeps the
 * dependency direction one-way: features → connections.
 */
let tokenProvider: (() => string | null | undefined) | null = null;

/** Registers the getter used by the fetcher to attach `Authorization`. */
export const setAuthTokenProvider = (provider: (() => string | null | undefined) | null): void => {
  tokenProvider = provider;
};

/** Current access token (or null) — used by the fetcher for protected routes. */
export const getAuthToken = (): string | null => tokenProvider?.() ?? null;
