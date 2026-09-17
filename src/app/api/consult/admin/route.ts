import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { CONSULT_KV_KEY, type ConsultSubmission } from "@/lib/consult";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function auth(pw: string) {
  const admin = process.env.ADMIN_PASSWORD;
  return Boolean(admin) && pw === admin;
}
function kvReady() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
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
  if (!kvReady()) {
    return NextResponse.json({ ok: false, error: "저장소(KV)가 아직 설정되지 않았습니다." }, { status: 503 });
  }

  const action = String(body.action || "list");

  if (action === "list") {
    const raw = await kv.lrange<string | ConsultSubmission>(CONSULT_KV_KEY, 0, 999);
    const items: ConsultSubmission[] = raw.map((r) =>
      typeof r === "string" ? (JSON.parse(r) as ConsultSubmission) : r
    );
    return NextResponse.json({ ok: true, items });
  }

  if (action === "setStatus") {
    const id = String(body.id || "");
    const status = body.status === "done" ? "done" : "new";
    const raw = await kv.lrange<string | ConsultSubmission>(CONSULT_KV_KEY, 0, 999);
    for (let i = 0; i < raw.length; i++) {
      const item: ConsultSubmission = typeof raw[i] === "string" ? JSON.parse(raw[i] as string) : (raw[i] as ConsultSubmission);
      if (item.id === id) {
        item.status = status;
        await kv.lset(CONSULT_KV_KEY, i, JSON.stringify(item));
        return NextResponse.json({ ok: true });
      }
    }
    return NextResponse.json({ ok: false, error: "항목을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: false, error: "알 수 없는 요청입니다." }, { status: 400 });
}
