import { Redis } from "@upstash/redis";

// Vercel KV는 2024년 종료되어 Marketplace의 Upstash Redis로 대체되었습니다.
// Upstash 연동은 KV_REST_API_* 또는 UPSTASH_REDIS_REST_* 중 하나를 주입하므로 둘 다 지원합니다.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export function redisReady() {
  return Boolean(url && token);
}

export function getRedis(): Redis | null {
  if (!url || !token) return null;
  return new Redis({ url, token });
}
