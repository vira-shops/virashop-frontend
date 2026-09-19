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

/**
 * Registry for the "session is no longer valid" callback — same
 * feature-decoupling pattern as the token provider above. The fetcher calls
 * this on any `401 UNAUTHORIZED` response so a denylisted/expired token is
 * dropped everywhere, not just wherever the 401 happened to surface.
 */
let unauthorizedHandler: (() => void) | null = null;

/** Registers the callback invoked when the fetcher sees a `401`. */
export const setUnauthorizedHandler = (handler: (() => void) | null): void => {
  unauthorizedHandler = handler;
};

/** Called by the fetcher after any `401 UNAUTHORIZED` response. */
export const notifyUnauthorized = (): void => {
  unauthorizedHandler?.();
};
