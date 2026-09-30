import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "상담 신청이 접수되었습니다",
  description: "브릿지자산관리 상담 신청이 정상적으로 접수되었습니다. 담당자가 순차적으로 연락드립니다.",
  alternates: { canonical: "/contact_thankyou" },
  // 접수 완료 페이지는 검색 노출 대상이 아닙니다.
  robots: { index: false, follow: false },
};

export default function ContactThankYouPage() {
  return (
    <>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-gold-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            상담 신청이 접수되었습니다
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300">
            소중한 시간을 내어 신청해 주셔서 감사합니다. 담당자가 입력하신
            연락처로 순차적으로 연락드리겠습니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight text-navy-950">
          이렇게 진행됩니다
        </h2>
        <ol className="mt-8 space-y-4">
          {[
            {
              step: "1",
              title: "연락 드립니다",
              desc: "남겨주신 통화 가능 시간에 맞춰 담당자가 연락드립니다.",
            },
            {
              step: "2",
              title: "상담 일정을 잡습니다",
              desc: "방문 상담과 화상 상담 중 편하신 방식으로 정합니다.",
            },
            {
              step: "3",
              title: "현재 자산 구조를 진단합니다",
              desc: "자산 구조와 재무 목표를 정리하고 실행 가능한 다음 단계를 제시합니다.",
            },
          ].map((x) => (
            <li
              key={x.step}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-white">
                {x.step}
              </span>
              <div>
                <h3 className="font-bold text-navy-950">{x.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{x.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-navy-950">급하게 문의하실 일이 있으면</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
            <a href={`tel:${site.phone.replace(/-/g, "")}`} className="hover:text-navy-950">
              전화 {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-navy-950">
              이메일 {site.email}
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600">기다리시는 동안 읽어보세요</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/insights"
              className="rounded-md bg-navy-950 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors duration-200"
            >
              인사이트 보기
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-slate-100 transition-colors duration-200"
            >
              사업영역 둘러보기
            </Link>
            <Link
              href="/"
              className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-slate-100 transition-colors duration-200"
            >
              홈으로
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
