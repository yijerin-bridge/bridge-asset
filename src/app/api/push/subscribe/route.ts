import { NextResponse } from "next/server";
import { getRedis, redisReady } from "@/lib/redis";
import { PUSH_SUBS_KEY, type PushSub } from "@/lib/push";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const admin = process.env.ADMIN_PASSWORD;
  if (!admin || String(body.password || "") !== admin) {
    return NextResponse.json({ ok: false, error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }
  if (!redisReady()) {
    return NextResponse.json({ ok: false, error: "저장소가 설정되지 않았습니다." }, { status: 503 });
  }

  const sub = body.subscription as PushSub | undefined;
  if (!sub?.endpoint) {
    return NextResponse.json({ ok: false, error: "구독 정보가 없습니다." }, { status: 400 });
  }

  const raw = await getRedis()!.lrange<string | PushSub>(PUSH_SUBS_KEY, 0, 199);
  const list = raw
    .map((r) => {
      if (typeof r !== "string") return r;
      try { return JSON.parse(r) as PushSub; } catch { return null; }
    })
    .filter((x): x is PushSub => Boolean(x && x.endpoint));

  if (body.action === "unsubscribe") {
    const keep = list.filter((s) => s.endpoint !== sub.endpoint);
    await getRedis()!.del(PUSH_SUBS_KEY);
    for (const s of keep) await getRedis()!.rpush(PUSH_SUBS_KEY, JSON.stringify(s));
    return NextResponse.json({ ok: true, subscribed: false });
  }

  // 같은 기기(endpoint)는 중복 저장하지 않습니다.
  if (!list.some((s) => s.endpoint === sub.endpoint)) {
    await getRedis()!.rpush(PUSH_SUBS_KEY, JSON.stringify(sub));
  }
  return NextResponse.json({ ok: true, subscribed: true });
}
