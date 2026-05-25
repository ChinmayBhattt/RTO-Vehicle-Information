/**
 * In-Memory Rate Limiter
 *
 * Sliding window rate limiter with automatic cleanup.
 * Upgradable to Redis for production multi-instance deployments.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // milliseconds
}

const store = new Map<string, RateLimitEntry>();

// Periodically clean expired entries
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000); // Every 5 minutes

/**
 * Checks if a request is within rate limits.
 *
 * @param key - Unique identifier (e.g., IP address, user ID)
 * @param limit - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  // No existing entry or window expired → create new entry
  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: windowMs };
  }

  // Within window
  if (entry.count < limit) {
    entry.count++;
    return {
      allowed: true,
      remaining: limit - entry.count,
      resetIn: entry.resetAt - now,
    };
  }

  // Rate limited
  return {
    allowed: false,
    remaining: 0,
    resetIn: entry.resetAt - now,
  };
}
