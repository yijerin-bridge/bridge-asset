// 상담 신청 데이터 모델 + 소스 태그 유틸

export type ConsultSubmission = {
  id: string;
  createdAt: string; // ISO
  name: string;
  gender: "남" | "여" | "";
  birth: string; // ex 900110
  phone: string;
  callTime: string; // 통화 가능시간
  region: string; // 희망 상담지역
  message: string; // 상담 전 요청사항/관심분야
  source: string; // 소스 태그 (어느 콘텐츠/메뉴에서 왔는지)
  status?: "new" | "done"; // 관리자 처리 상태
};

export const CONSULT_KV_KEY = "consult:list";

// 소스 태그를 사람이 읽기 좋은 라벨로
export function sourceLabel(source: string): string {
  if (!source) return "직접 방문 (상담문의)";
  const [kind, ...rest] = source.split(":");
  const val = rest.join(":");
  switch (kind) {
    case "insight":
      return `인사이트 · ${val}`;
    case "service":
      return `사업영역 · ${val}`;
    case "member":
      return `멤버 · ${val}`;
    case "page":
      return val || "홈페이지";
    default:
      return source;
  }
}
