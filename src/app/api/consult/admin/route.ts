import { NextResponse } from "next/server";
import { getRedis, redisReady } from "@/lib/redis";
import { CONSULT_KV_KEY, type ConsultSubmission } from "@/lib/consult";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function auth(pw: string) {
  const admin = process.env.ADMIN_PASSWORD;
  return Boolean(admin) && pw === admin;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const pw = String(body.password || "");
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD 환경변수가 설정되지 않았습니다." }, { status: 503 });
  }
  if (!auth(pw)) {
    return NextResponse.json({ ok: false, error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }
  if (!redisReady()) {
    return NextResponse.json({ ok: false, error: "저장소(Redis)가 아직 설정되지 않았습니다." }, { status: 503 });
  }

  const action = String(body.action || "list");

  if (action === "list") {
    const raw = await getRedis()!.lrange<string | ConsultSubmission>(CONSULT_KV_KEY, 0, 999);
    const items: ConsultSubmission[] = raw
      .map((r) => {
        if (typeof r !== "string") return r;
        try {
          return JSON.parse(r) as ConsultSubmission;
        } catch {
          return null; // 묘비값 등 파싱 불가 항목은 건너뜁니다.
        }
      })
      .filter((x): x is ConsultSubmission => Boolean(x && x.id));
    return NextResponse.json({ ok: true, items });
  }

  if (action === "setStatus") {
    const id = String(body.id || "");
    const status = body.status === "done" ? "done" : "new";
    const raw = await getRedis()!.lrange<string | ConsultSubmission>(CONSULT_KV_KEY, 0, 999);
    for (let i = 0; i < raw.length; i++) {
      const item: ConsultSubmission = typeof raw[i] === "string" ? JSON.parse(raw[i] as string) : (raw[i] as ConsultSubmission);
      if (item.id === id) {
        item.status = status;
        await getRedis()!.lset(CONSULT_KV_KEY, i, JSON.stringify(item));
        return NextResponse.json({ ok: true });
      }
    }
    return NextResponse.json({ ok: false, error: "항목을 찾을 수 없습니다." }, { status: 404 });
  }

  if (action === "delete") {
    const id = String(body.id || "");
    const raw = await getRedis()!.lrange<string | ConsultSubmission>(CONSULT_KV_KEY, 0, 999);
    for (let i = 0; i < raw.length; i++) {
      const item: ConsultSubmission = typeof raw[i] === "string" ? JSON.parse(raw[i] as string) : (raw[i] as ConsultSubmission);
      if (item.id === id) {
        // 리스트에서 인덱스로 삭제: 묘비값으로 덮어쓴 뒤 그 값을 제거합니다.
        const TOMB = "__deleted__";
        await getRedis()!.lset(CONSULT_KV_KEY, i, TOMB);
        await getRedis()!.lrem(CONSULT_KV_KEY, 1, TOMB);
        return NextResponse.json({ ok: true });
      }
    }
    return NextResponse.json({ ok: false, error: "항목을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: false, error: "알 수 없는 요청입니다." }, { status: 400 });
}
