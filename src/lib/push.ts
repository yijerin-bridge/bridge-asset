import webpush from "web-push";
import { getRedis, redisReady } from "@/lib/redis";

export const PUSH_SUBS_KEY = "push:subs";

export type PushSub = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

export function pushReady() {
  return Boolean(
    process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && redisReady()
  );
}

export function vapidPublicKey() {
  return process.env.VAPID_PUBLIC_KEY || "";
}

function configure() {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:bridgeasset@naver.com",
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );
}

async function loadSubs(): Promise<PushSub[]> {
  const raw = await getRedis()!.lrange<string | PushSub>(PUSH_SUBS_KEY, 0, 199);
  return raw
    .map((r) => {
      if (typeof r !== "string") return r;
      try {
        return JSON.parse(r) as PushSub;
      } catch {
        return null;
      }
    })
    .filter((x): x is PushSub => Boolean(x && x.endpoint));
}

// 저장된 모든 구독자에게 알림을 보냅니다. 실패한 구독(만료·해지)은 정리합니다.
export async function sendPushToAll(payload: {
  title: string;
  body: string;
  url?: string;
}) {
  if (!pushReady()) return { sent: 0, removed: 0 };
  configure();
  const subs = await loadSubs();
  const data = JSON.stringify(payload);
  let sent = 0;
  const dead: string[] = [];

  await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(s, data);
        sent++;
      } catch (e) {
        const code = (e as { statusCode?: number }).statusCode;
        // 404/410 = 더 이상 유효하지 않은 구독
        if (code === 404 || code === 410) dead.push(s.endpoint);
      }
    })
  );

  // 죽은 구독 제거
  if (dead.length) {
    const fresh = await loadSubs();
    const keep = fresh.filter((s) => !dead.includes(s.endpoint));
    await getRedis()!.del(PUSH_SUBS_KEY);
    for (const s of keep) await getRedis()!.rpush(PUSH_SUBS_KEY, JSON.stringify(s));
  }

  return { sent, removed: dead.length };
}
