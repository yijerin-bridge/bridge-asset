"use client";

import Script from "next/script";

// 네이버 애널리틱스 (wcslog) — wcslog.js 로드 완료 후 wcs_do 실행
export default function NaverAnalytics() {
  return (
    <Script
      src="//wcs.pstatic.net/wcslog.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as unknown as {
          wcs_add?: Record<string, string>;
          wcs?: unknown;
          wcs_do?: () => void;
        };
        if (!w.wcs_add) w.wcs_add = {};
        w.wcs_add["wa"] = "1c5afd7caa619c0";
        if (w.wcs && typeof w.wcs_do === "function") w.wcs_do();
      }}
    />
  );
}
