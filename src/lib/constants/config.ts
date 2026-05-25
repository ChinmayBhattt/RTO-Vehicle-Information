/**
 * Application Configuration Constants
 *
 * Centralized configuration for rate limits, caching, pagination, and app metadata.
 * Override these via environment variables where noted.
 */

// ─── Rate Limiting ───────────────────────────────────────────────────────────

export const RATE_LIMIT = {
  /** Max vehicle searches per minute per IP (unauthenticated) */
  SEARCH_PER_MINUTE: 10,
  /** Max vehicle searches per minute per authenticated user */
  SEARCH_PER_MINUTE_AUTH: 30,
  /** Max signup attempts per hour per IP */
  SIGNUP_PER_HOUR: 5,
  /** Max login attempts per 15 minutes per IP */
  LOGIN_PER_15MIN: 10,
  /** Max general API calls per minute per IP */
  API_PER_MINUTE: 60,
  /** Sliding window duration in milliseconds (1 minute) */
  WINDOW_MS: 60 * 1000,
  /** Cleanup interval for expired rate-limit entries (5 minutes) */
  CLEANUP_INTERVAL_MS: 5 * 60 * 1000,
} as const;

// ─── Caching ─────────────────────────────────────────────────────────────────

export const CACHE = {
  /** Default TTL for cached vehicle data in seconds (1 hour) */
  VEHICLE_TTL_SECONDS: 3600,
  /** Maximum age before a cached entry is considered stale (24 hours) */
  MAX_STALE_SECONDS: 86400,
  /** TTL index field name in MongoDB */
  TTL_FIELD: "expiresAt",
} as const;

// ─── Pagination ──────────────────────────────────────────────────────────────

export const PAGINATION = {
  /** Default page size for list endpoints */
  DEFAULT_PAGE_SIZE: 10,
  /** Maximum allowed page size */
  MAX_PAGE_SIZE: 50,
  /** Default page number */
  DEFAULT_PAGE: 1,
} as const;

// ─── User Plans & Limits ─────────────────────────────────────────────────────

export const PLAN_LIMITS = {
  free: {
    searchesPerDay: 10,
    savedVehicles: 5,
    historyRetentionDays: 7,
  },
  pro: {
    searchesPerDay: 100,
    savedVehicles: 50,
    historyRetentionDays: 90,
  },
  enterprise: {
    searchesPerDay: Infinity,
    savedVehicles: Infinity,
    historyRetentionDays: 365,
  },
} as const;

// ─── Auth ────────────────────────────────────────────────────────────────────

export const AUTH = {
  /** Minimum password length */
  MIN_PASSWORD_LENGTH: 8,
  /** Maximum password length */
  MAX_PASSWORD_LENGTH: 128,
  /** bcrypt salt rounds */
  SALT_ROUNDS: 12,
  /** JWT max age in seconds (30 days) */
  JWT_MAX_AGE: 30 * 24 * 60 * 60,
  /** Session max age in seconds (30 days) */
  SESSION_MAX_AGE: 30 * 24 * 60 * 60,
} as const;

// ─── App Metadata ────────────────────────────────────────────────────────────

export const APP = {
  NAME: "RTO Vehicle Finder",
  VERSION: "1.0.0",
  DESCRIPTION: "Indian Vehicle Registration Information Lookup",
  /** Default data provider: 'mock' or 'api' */
  DEFAULT_PROVIDER: "mock",
} as const;

// ─── HTTP Status Codes ───────────────────────────────────────────────────────

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// ─── Security Headers ───────────────────────────────────────────────────────

export const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
} as const;
