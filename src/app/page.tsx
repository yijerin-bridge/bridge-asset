import type { Metadata } from "next";
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
    a: "첫 진단 상담은 무료입니다. 이후 포트폴리오 설계와 지속 관리 범위에 따라 서비스 방식을 안내드립니다.",
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(202,138,4,0.25), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(44,79,124,0.5), transparent)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 sm:py-32">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-gold-400">
            <Image
              src="/images/logo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            {site.nameEn}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            글로벌 자산관리의 전문가,
            <br />
            <span className="text-gold-400">브릿지자산관리</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            주식·펀드부터 역외투자, 퇴직연금, 스타트업, 부동산, 보험까지.
            고객의 경제적 자유를 향한 가교가 되겠습니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-gold-500 px-6 py-3 text-base font-semibold text-navy-950 hover:bg-gold-400 transition-colors duration-200"
            >
              무료 상담 신청
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors duration-200"
            >
              사업영역 보기
            </Link>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <dd className="text-2xl font-bold text-white">{s.value}</dd>
                <dt className="mt-1 block text-sm text-slate-400">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          eyebrow="Our Mission"
          title="문제를 피하지 않는 자산관리"
          description="고객의 경제적 자유, 신뢰 기반의 금융, 그리고 양극화 해소에 기여하는 것. 브릿지자산관리가 존재하는 이유입니다."
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
              <h3 className="text-lg font-bold text-navy-950">{v.title}</h3>
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
            eyebrow="Services"
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
          eyebrow="Programs"
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
                  <h3 className="font-bold text-navy-950 leading-snug">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-gold-600">
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

      {/* CEO teaser */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About"
              title={`"${ceoProfile.headline}"`}
              description={ceoProfile.intro}
            />
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {ceoProfile.current.slice(0, 4).map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold-600"
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
              href="/members/lee-jaerin"
              className="mt-8 inline-flex items-center gap-1 rounded-md bg-navy-950 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors duration-200"
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
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-600">
              보유 자격
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ceoProfile.certifications.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-navy-100 bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy-800"
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
          <SectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
          <dl className="mt-10 space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6"
              >
                <dt className="font-semibold text-navy-950">{f.q}</dt>
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
