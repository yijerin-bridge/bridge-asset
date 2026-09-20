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

  // 한글이 전송 구간에서 깨지지 않도록 UTF-8 바이트를 base64로 인코딩해 보냅니다.
  // 전송되는 문자열이 순수 ASCII가 되므로 인코딩 처리와 무관하게 안전합니다.
  const data = Buffer.from(JSON.stringify(payload), "utf8").toString("base64");

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

  if (dead.length) {
    const fresh = await loadSubs();
    const keep = fresh.filter((s) => !dead.includes(s.endpoint));
    await getRedis()!.del(PUSH_SUBS_KEY);
    for (const s of keep) await getRedis()!.rpush(PUSH_SUBS_KEY, JSON.stringify(s));
  }

  return { sent, removed: dead.length };
}
