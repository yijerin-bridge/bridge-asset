import { NextResponse } from "next/server";
import { getRedis, redisReady } from "@/lib/redis";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { CONSULT_KV_KEY, sourceLabel, type ConsultSubmission } from "@/lib/consult";
import { pathLabel } from "@/lib/pathLabel";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 알림 받을 이메일 (env로 덮어쓰기 가능)
const NOTIFY = (process.env.CONSULT_NOTIFY_EMAILS ||
  "yijerin@hanmail.net,bridgeasset@naver.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);


export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 허니팟 (봇 차단)
  if (body.company) return NextResponse.json({ ok: true });

  const req_fields = ["name", "phone", "callTime", "region", "message"];
  for (const f of req_fields) {
    if (!body[f] || !String(body[f]).trim()) {
      return NextResponse.json({ ok: false, error: "필수 항목을 모두 입력해주세요." }, { status: 400 });
    }
  }
  if (body.consent !== "true" && body.consent !== "on" && body.consent !== "1") {
    return NextResponse.json({ ok: false, error: "개인정보 수집에 동의해주세요." }, { status: 400 });
  }

  const sub: ConsultSubmission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    name: String(body.name).slice(0, 40),
    gender: (body.gender === "남" || body.gender === "여" ? body.gender : "") as ConsultSubmission["gender"],
    birth: String(body.birth || "").slice(0, 20),
    phone: String(body.phone).slice(0, 30),
    callTime: String(body.callTime).slice(0, 80),
    region: String(body.region).slice(0, 80),
    message: String(body.message).slice(0, 2000),
    source: String(body.source || "").slice(0, 120),
    referrer: String(body.referrer || "").slice(0, 300),
    referrerLabel: pathLabel(String(body.referrer || "")).slice(0, 200),
    status: "new",
  };

  // 1) 저장 (Upstash Redis)
  if (redisReady()) {
    try {
      await getRedis()!.lpush(CONSULT_KV_KEY, JSON.stringify(sub));
    } catch (e) {
      console.error("Redis 저장 실패", e);
      return NextResponse.json({ ok: false, error: "저장 중 오류가 발생했습니다. 전화로 문의해주세요." }, { status: 500 });
    }
  } else {
    console.error("Redis 미설정 — 신청을 저장하지 못했습니다:", sub);
    // 저장소가 없어도 최소한 이메일은 시도
  }

  // 2) 이메일 알림 (Resend, best-effort)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.CONSULT_FROM_EMAIL || "브릿지자산관리 <noreply@bridgeasset.kr>";
      const rows: [string, string][] = [
        ["이름", sub.name],
        ["성별", sub.gender],
        ["생년월일", sub.birth],
        ["연락처", sub.phone],
        ["통화 가능시간", sub.callTime],
        ["희망 상담지역", sub.region],
        ["요청사항/관심분야", sub.message],
        ["유입 경로", sourceLabel(sub.source)],
        ["직전에 보던 페이지", sub.referrerLabel || "-"],
        ["접수시각", new Date(sub.createdAt).toLocaleString("ko-KR")],
      ];
      const html = `<h2>새 상담 신청</h2><table cellpadding="8" style="border-collapse:collapse">${rows
        .map(
          ([k, v]) =>
            `<tr><td style="background:#f1f5f9;font-weight:600">${k}</td><td>${(v || "-")
              .toString()
              .replace(/</g, "&lt;")}</td></tr>`
        )
        .join("")}</table><p><a href="${site.url}/admin">관리자 페이지에서 보기</a></p>`;
      await resend.emails.send({
        from,
        to: NOTIFY,
        subject: `[상담신청] ${sub.name} (${sub.phone}) · ${sourceLabel(sub.source)}`,
        html,
      });
    } catch (e) {
      console.error("이메일 발송 실패", e);
      // 저장은 됐으니 성공으로 처리
    }
  }

  return NextResponse.json({ ok: true });
}
