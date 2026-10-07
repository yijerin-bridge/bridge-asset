"use client";

import Script from "next/script";

// 네이버 수집 스크립트 (wcslog)
//  - 네이버 애널리틱스 (wa: 1c5afd7caa619c0)
//  - 네이버 검색광고 전환추적 공통 스크립트 (wa: s_520476d6c412)
//
// 두 서비스가 전역 wcs_add["wa"] 를 공유하므로 라이브러리는 한 번만 올리고,
// wa 값을 바꿔가며 순서대로 발화시킵니다. 함께 넣으면 뒤에 설정한 값이
// 앞의 값을 덮어써서 한쪽이 수집되지 않습니다.
const NA_ANALYTICS_KEY = "1c5afd7caa619c0";
const NA_ADS_KEY = "s_520476d6c412";
const INFLOW_DOMAIN = "bridgeasset.kr";

type Wcs = {
  wcs_add?: Record<string, string>;
  wcs?: { inflow?: (domain?: string) => void };
  wcs_do?: (nasa?: unknown) => void;
  _nasa?: Record<string, unknown>;
};

export default function NaverAnalytics() {
  return (
    <Script
      src="//wcs.naver.net/wcslog.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as unknown as Wcs;
        if (!w.wcs || typeof w.wcs_do !== "function") return;
        if (!w.wcs_add) w.wcs_add = {};
        if (!w._nasa) w._nasa = {};

        // 1) 네이버 애널리틱스
        w.wcs_add["wa"] = NA_ANALYTICS_KEY;
        w.wcs_do();

        // 2) 네이버 검색광고 전환추적 (유입 정보 저장 후 페이지뷰 수집)
        w.wcs_add["wa"] = NA_ADS_KEY;
        if (typeof w.wcs.inflow === "function") w.wcs.inflow(INFLOW_DOMAIN);
        w.wcs_do(w._nasa);
      }}
    />
  );
}
