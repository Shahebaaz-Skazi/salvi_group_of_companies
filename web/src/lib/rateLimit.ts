/**
 * In-memory IP rate limiter.
 *
 * ⚠ PRODUCTION NOTE: This store is per-process and resets on each deploy or
 * serverless cold-start. Replace with Redis for multi-instance deployments:
 *
 *   import { Redis } from "@upstash/redis";
 *   const redis = new Redis({ url: process.env.REDIS_URL! });
 *   async function increment(ip: string): Promise<number> {
 *     const key = `rl:enquiry:${ip}`;
 *     const count = await redis.incr(key);
 *     if (count === 1) await redis.expire(key, WINDOW_S);
 *     return count;
 *   }
 */

const LIMIT   = 5;          // max requests
const WINDOW  = 10 * 60_000; // 10 minutes in ms

interface Bucket { count: number; resetAt: number }

// Module-level map persists across requests within one process.
const store = new Map<string, Bucket>();

/** Returns true when the IP is within the allowed rate. */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = store.get(ip);

  // Prune expired entries every 1000 calls to prevent unbounded growth
  if (store.size > 1000) {
    for (const [k, v] of store) { if (now >= v.resetAt) store.delete(k); }
  }

  if (!bucket || now >= bucket.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW });
    return true;
  }

  if (bucket.count >= LIMIT) return false;

  bucket.count++;
  return true;
}
