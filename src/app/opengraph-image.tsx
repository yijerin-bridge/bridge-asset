import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — 글로벌 자산관리의 전문가`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a1628 0%, #16304f 60%, #1e3a5f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.1)",
              color: "#d9a406",
              fontSize: "44px",
              fontWeight: 700,
            }}
          >
            B
          </div>
          <div style={{ fontSize: "36px", fontWeight: 700 }}>{site.name}</div>
        </div>
        <div
          style={{
            marginTop: "48px",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          글로벌 자산관리의 전문가
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "28px",
            color: "#cbd5e1",
          }}
        >
          주식 · 역외투자 · 연금 · 채권 · 스타트업 · 비트코인 · 부동산 · 보험
        </div>
        <div
          style={{
            marginTop: "56px",
            width: "120px",
            height: "6px",
            background: "#ca8a04",
            borderRadius: "3px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
