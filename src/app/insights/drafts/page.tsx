import type { Metadata } from "next";
import Link from "next/link";
import { draftInsights } from "@/lib/insights";

// 초안 검토용 비공개 페이지 — 색인 안 됨, 내비/사이트맵/llms 미노출.
export const metadata: Metadata = {
  title: "초안 검토",
  robots: { index: false, follow: false },
};

export default function DraftsPage() {
  const sorted = [...draftInsights].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        비공개 초안 검토 페이지입니다. 여기 글은 검색·목록·AI에 노출되지 않습니다.
        검토 후 <b>발행 · 수정 · 삭제</b>를 요청하세요.
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-navy-950">
        초안 ({sorted.length})
      </h1>

      {sorted.length === 0 ? (
        <p className="mt-8 text-slate-500">대기 중인 초안이 없습니다.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {sorted.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/insights/${a.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-navy-600 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-700">초안</span>
                    <span className="rounded-full bg-navy-50 px-2 py-0.5 font-semibold text-navy-700">{a.category}</span>
                    <span className="text-slate-400">{a.date}</span>
                  </div>
                  <h2 className="mt-2 font-bold text-navy-950 group-hover:text-navy-700">{a.title}</h2>
                  <p className="mt-1 text-xs text-slate-500">slug: {a.slug}</p>
                </div>
                <svg className="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
