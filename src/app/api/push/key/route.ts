import { NextResponse } from "next/server";
import { vapidPublicKey } from "@/lib/push";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const key = vapidPublicKey();
  if (!key) {
    return NextResponse.json(
      { ok: false, error: "푸시 설정(VAPID 키)이 아직 등록되지 않았습니다." },
      { status: 503 }
    );
  }
  return NextResponse.json({ ok: true, key });
}
