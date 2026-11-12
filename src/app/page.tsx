import type { Metadata } from "next";
import { YouTubeEmbed } from "@next/third-parties/google";
import { videos } from "@/lib/videos";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { products } from "@/lib/portfolio";
import { stats, ceoProfile } from "@/lib/profile";
import { SectionHeading, ServiceCard, CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqs = [
  {
    q: "상담은 어떻게 진행되나요?",
    a: "전화, 이메일 또는 카카오톡으로 상담을 신청하시면 일정을 조율해 대면 또는 화상으로 진행합니다. 첫 상담에서는 현재 자산 구조와 재무 목표를 진단합니다.",
  },
  {
    q: "상담 비용이 있나요?",
    a: "자산관리 상담은 20만원이며, 만 30세 이하 사회초년생은 5만원입니다. 상담에서 현재 자산 구조를 진단한 뒤, 포트폴리오 설계와 지속 관리 범위에 따라 서비스 방식을 안내드립니다.",
  },
  {
    q: "어떤 자산까지 관리해 주나요?",
    a: "주식·펀드, 역외투자, 퇴직연금·개인연금, 채권·P2P, 벤처·스타트업, 비트코인, 부동산, 보험까지 8개 영역을 종합적으로 다룹니다.",
  },
  {
    q: "소액 투자자도 상담이 가능한가요?",
    a: "가능합니다. 자산 규모보다 재무 목표와 실행 의지가 중요합니다. 사회초년생부터 은퇴자, 법인 CEO까지 맞춤형으로 설계합니다.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero — 시안 C: 화면을 채운 야경 위에 큰 제목 */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 text-white">
        <Image
          src="/images/hero-skyline.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[center_58%]"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,11,12,0.55)_0%,rgba(11,11,12,0.15)_35%,rgba(11,11,12,0.8)_72%,#0b0b0c_100%)]"
          aria-hidden="true"
        />

        <div className="mx-auto flex w-full max-w-6xl flex-1 items-end px-4 pb-12 pt-32 sm:px-6 sm:pb-16">
          <div className="w-full">
            <h1 className="max-w-4xl break-keep text-[2.75rem] font-bold leading-[1.06] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
              평생 함께하는
              <br />
              자산관리 파트너
            </h1>
            <p className="mt-6 max-w-2xl break-keep text-base leading-relaxed text-white/80 sm:text-xl">
              판매가 아닌 성과로, 고객의 자산을 오랜 시간 곁에서 관리합니다.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center bg-white px-7 text-base font-semibold text-ink-950 transition-colors duration-200 hover:bg-ink-100"
              >
                상담 신청
              </Link>
              <Link
                href="/services"
                className="inline-flex h-13 items-center border border-white/50 px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                사업영역 보기
              </Link>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-y-6 border-t border-white/25 sm:mt-16 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse pt-5">
                  <dt className="mt-1 text-sm text-white/65">{s.label}</dt>
                  <dd className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          title="우리가 일하는 방식"
          description="고객의 경제적 자유와 신뢰 기반의 금융이 브릿지자산관리가 존재하는 이유입니다."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "자산배분 원칙",
              desc: "단일 상품이 아닌 자산배분의 원칙으로 시장의 변동성을 관리합니다.",
            },
            {
              title: "신뢰 기반 금융",
              desc: "판매 수수료가 아닌 고객의 성과를 기준으로 정직하게 제안합니다.",
            },
            {
              title: "개인·기업·세계의 가교",
              desc: "개인 투자자와 기업, 글로벌 시장을 연결하는 다리가 됩니다.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-ink-950">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <SectionHeading
            title="8개 자산 영역을 하나의 전략으로"
            description="자산은 따로 움직이지 않습니다. 8개 영역을 하나의 포트폴리오 관점에서 통합 설계합니다."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Investment programs */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          title="대표 투자 프로그램"
          description="장기 적립식부터 소득공제, 멀티커런시까지 목적에 맞는 프로그램을 운영합니다."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.name}>
              <Link
                href="/portfolio"
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                  <Image
                    src={p.image}
                    alt={`${p.name} 프로그램 이미지`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold text-ink-950 leading-snug">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-point-600">
                    {p.period}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {p.desc}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* YouTube */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <SectionHeading
            title="영상으로 보는 자산관리"
            description="강의와 상담에서 자주 다루는 주제를 영상으로 풀었습니다."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {videos.map((v) => (
              <div key={v.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="aspect-video bg-slate-100 [&_lite-youtube]:max-w-none">
                  <YouTubeEmbed videoid={v.id} params="rel=0" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium text-slate-500">
                    {v.topic}
                  </p>
                  <h3 className="mt-2 break-keep text-base font-bold leading-snug text-ink-950">
                    {v.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={site.sns.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-ink-950 hover:bg-slate-100 transition-colors duration-200"
            >
              유튜브 채널 전체 보기
            </a>
          </div>
        </div>
      </section>
      {/* CEO teaser */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              title={`"${ceoProfile.headline}"`}
              description={ceoProfile.intro}
            />
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {ceoProfile.current.slice(0, 4).map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-point-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
            <Link
              href="/members/yi-jaerin"
              className="mt-8 inline-flex items-center gap-1 rounded-md bg-ink-950 px-5 py-3 text-sm font-semibold text-white hover:bg-ink-800 transition-colors duration-200"
            >
              대표 프로필 전체 보기
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-base font-bold text-ink-950">
              보유 자격
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ceoProfile.certifications.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-800"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-20">
          <SectionHeading title="자주 묻는 질문" />
          <dl className="mt-10 space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6"
              >
                <dt className="font-semibold text-ink-950">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
