import type { Metadata } from "next";
import Link from "next/link";
import { insights } from "@/lib/insights";
import { SectionHeading, CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "인사이트 — 자산관리 전문가의 투자·재무 콘텐츠",
  description:
    "역외보험·달러자산, 스타트업 투자, 상속·연금까지. 브릿지자산관리 대표 이재린이 직접 정리하는 실전 자산관리 인사이트입니다.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "인사이트 | 브릿지자산관리",
    description: "자산관리 전문가가 직접 쓰는 투자·재무 인사이트.",
  },
};

export default function InsightsPage() {
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "인사이트", path: "/insights" },
        ])}
      />
      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Insights
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            자산관리 인사이트
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            역외보험·달러자산, 스타트업 투자, 상속·연금까지. 판매가 아닌 진단의
            관점에서 자산관리 전문가가 직접 정리합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        {sorted.length === 0 ? (
          <p className="text-center text-slate-500">준비 중입니다.</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-navy-600 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-navy-50 px-2.5 py-1 font-semibold text-navy-700">
                      {a.category}
                    </span>
                    <span className="text-slate-400">{a.date}</span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold leading-snug text-navy-950 group-hover:text-navy-700">
                    {a.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {a.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-navy-700 group-hover:text-gold-600 transition-colors duration-200">
                    읽어보기
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <CtaSection />
    </>
  );
}
