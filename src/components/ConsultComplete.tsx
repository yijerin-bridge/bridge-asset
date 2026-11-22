"use client";

import { useEffect } from "react";
import { NA_ADS_KEY } from "@/components/NaverAnalytics";

type NaverWcs = {
  wcs?: { trans?: (conv: { type: string }) => void };
  wcs_add?: Record<string, string>;
};

// 상담 접수 완료 페이지에서 전환을 알립니다.
//  1) GTM(dataLayer) 이벤트 consult_complete
//  2) 네이버 광고 전환추적: 신청완료(lead)
//     공통 스크립트(wcslog.js)는 레이아웃에서 비동기로 올라오므로,
//     로드될 때까지 잠시 기다렸다가 한 번만 보냅니다.
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

    let sent = false;
    let tries = 0;
    const sendNaverLead = () => {
      const w = window as unknown as NaverWcs;
      if (sent) return true;
      if (!w.wcs || typeof w.wcs.trans !== "function") return false;
      try {
        if (!w.wcs_add) w.wcs_add = {};
        w.wcs_add["wa"] = NA_ADS_KEY;
        w.wcs.trans({ type: "lead" });
        sent = true;
      } catch {
        // 전환 전송이 실패해도 페이지 표시에는 영향을 주지 않습니다.
      }
      return true;
    };

    if (sendNaverLead()) return;
    const timer = window.setInterval(() => {
      tries += 1;
      if (sendNaverLead() || tries >= 50) window.clearInterval(timer); // 최대 약 10초
    }, 200);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
