"use client";

import { useEffect } from "react";

// 상담 접수 완료를 GTM(dataLayer)에 알립니다.
// URL 조건 대신 이 이벤트로 전환 트리거를 거는 편이 더 안정적입니다.
export default function ConsultComplete() {
  useEffect(() => {
    try {
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "consult_complete",
        form_name: "상담 신청서",
        page_path: "/contact_thankyou",
      });
    } catch {
      // 추적이 실패해도 페이지 표시에는 영향을 주지 않습니다.
    }
  }, []);

  return null;
}
