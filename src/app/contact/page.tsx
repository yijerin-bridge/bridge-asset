import type { Metadata } from "next";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "상담문의 — 무료 자산관리 상담 신청",
  description:
    "브릿지자산관리 무료 상담 신청. 전화 0507-1432-6765, 이메일, 네이버 블로그로 문의하세요. 서울 서초구 방문 상담 및 화상 상담 가능.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "상담문의 | 브릿지자산관리",
    description: "첫 진단 상담은 무료입니다. 지금 신청하세요.",
  },
};

const channels = [
  {
    title: "전화 상담",
    desc: "평일 09:00 ~ 18:00",
    value: site.phone,
    href: `tel:${site.phone}`,
    action: "전화 걸기",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    ),
  },
  {
    title: "이메일 문의",
    desc: "24시간 접수, 영업일 기준 회신",
    value: site.email,
    href: `mailto:${site.email}?subject=${encodeURIComponent("[상담신청] 자산관리 상담을 신청합니다")}`,
    action: "메일 보내기",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    ),
  },
  {
    title: "네이버 블로그",
    desc: "투자레터·리서치 확인 및 댓글 문의",
    value: "blog.naver.com/yijerin",
    href: site.sns.blog,
    action: "블로그 방문",
    external: true,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
      />
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "상담문의", path: "/contact" },
        ])}
      />

      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            무료 상담 신청
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            첫 진단 상담은 무료입니다. 현재 자산 구조와 재무 목표를 정리하고,
            실행 가능한 다음 단계를 제시합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-700">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {c.icon}
                </svg>
              </span>
              <h2 className="mt-4 text-lg font-bold text-navy-950">{c.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
              <p className="mt-2 flex-1 text-sm font-medium text-navy-800 break-all">
                {c.value}
              </p>
              <a
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-5 inline-flex justify-center rounded-md bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 transition-colors duration-200"
              >
                {c.action}
              </a>
            </div>
          ))}
        </div>

        {/* Office info */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-bold text-navy-950">오시는 길</h2>
            <address className="mt-4 not-italic text-sm leading-relaxed text-slate-600">
              <p className="font-medium text-navy-800">{site.legalName}</p>
              <p className="mt-1">{site.address.full}</p>
            </address>
            <a
              href={`https://map.naver.com/p/search/${encodeURIComponent(site.address.full)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-navy-800 hover:border-navy-600 hover:bg-navy-50 transition-colors duration-200"
            >
              네이버 지도에서 보기
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
          <div className="rounded-xl border border-slate-200 bg-navy-50 p-8">
            <h2 className="text-lg font-bold text-navy-950">상담 전 준비하면 좋아요</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {[
                "현재 보유 자산 현황 (예금·주식·연금·보험·부동산 등)",
                "월 수입·지출 규모",
                "재무 목표 (내집마련, 은퇴, 자녀교육, 법인 자금 등)",
                "기존 보험 증권 (보장분석을 원하시는 경우)",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-gold-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
