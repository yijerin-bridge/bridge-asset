import { insights } from "@/lib/insights";
import { services } from "@/lib/services";
import { members } from "@/lib/members";

// 사이트 내부 경로를 사람이 읽는 페이지 이름으로 변환합니다.
// 상담 신청 시 "직전에 보던 페이지"를 관리자/알림 메일에 읽기 좋게 보여주기 위한 용도입니다.
const STATIC: Record<string, string> = {
  "/": "홈",
  "/about": "회사소개",
  "/services": "사업영역",
  "/members": "멤버소개",
  "/portfolio": "포트폴리오",
  "/insights": "인사이트 목록",
  "/contact": "상담문의",
};

export function pathLabel(path: string): string {
  if (!path) return "";
  const clean = path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  if (STATIC[clean]) return STATIC[clean];

  let m = clean.match(/^\/insights\/(.+)$/);
  if (m) {
    const a = insights.find((i) => i.slug === m![1]);
    return a ? `인사이트 · ${a.title}` : `인사이트 · ${m[1]}`;
  }
  m = clean.match(/^\/services\/(.+)$/);
  if (m) {
    const sv = services.find((x) => x.slug === m![1]);
    return sv ? `사업영역 · ${sv.title}` : `사업영역 · ${m[1]}`;
  }
  m = clean.match(/^\/members\/(.+)$/);
  if (m) {
    const mb = members.find((x) => x.slug === m![1]);
    return mb ? `멤버 · ${mb.name}` : `멤버 · ${m[1]}`;
  }
  return clean;
}
