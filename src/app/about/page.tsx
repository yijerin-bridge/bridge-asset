import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { SectionHeading, ServiceIcon, CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "회사소개 — 글로벌 자산관리의 전문가",
  description:
    "주식회사 브릿지 자산관리는 고객의 경제적 자유와 신뢰 기반 금융을 추구하는 종합 자산관리 회사입니다. 미션·비전, 8개 사업영역, 회사 정보를 소개합니다.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "회사소개 | 브릿지자산관리",
    description:
      "고객의 경제적 자유를 향한 가교, 브릿지자산관리를 소개합니다.",
  },
};

const missions = [
  {
    title: "고객의 경제적 자유",
    desc: "단기 수익이 아닌, 고객이 스스로 선택할 수 있는 경제적 자유를 목표로 자산을 설계합니다.",
  },
  {
    title: "신뢰 기반 금융",
    desc: "판매 수수료가 아닌 고객의 성과를 기준으로, 정직하고 투명하게 제안합니다.",
  },
  {
    title: "양극화 해소 기여",
    desc: "누구나 좋은 금융 지식과 기회에 접근할 수 있도록 교육과 커뮤니티를 함께 운영합니다.",
  },
];

const principles = [
  {
    title: "문제를 피하지 않는다",
    desc: "어려운 시장과 불편한 진실도 회피하지 않고 정면으로 마주합니다.",
  },
  {
    title: "자산배분의 원칙",
    desc: "단일 상품이 아닌 자산배분으로 변동성을 관리하고 장기 성과를 추구합니다.",
  },
  {
    title: "ESG 기반 투자",
    desc: "지속가능성과 사회적 가치를 고려한 책임 있는 투자를 지향합니다.",
  },
];

const companyInfo: { label: string; value: string }[] = [
  { label: "법인명", value: site.legalName },
  { label: "대표이사", value: site.ceo },
  { label: "설립", value: `${site.founded}년` },
  { label: "사업자등록번호", value: site.bizNumber },
  { label: "주소", value: site.address.full },
  { label: "전화", value: site.phone },
  { label: "이메일", value: site.email },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "회사소개", path: "/about" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 15%, rgba(202,138,4,0.22), transparent), radial-gradient(ellipse 60% 50% at 15% 85%, rgba(44,79,124,0.5), transparent)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            About Us
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            글로벌 자산관리의 전문가,
            <br />
            <span className="text-gold-400">브릿지자산관리</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            {site.legalName}는 증권·부동산·스타트업·보험 등 다양한 금융 분야를
            아우르며, 고객 한 분 한 분의 자산을 자산배분의 원칙 위에서 설계하고
            관리하는 종합 자산관리 회사입니다.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          eyebrow="Mission"
          title="우리가 존재하는 이유"
          description="브릿지자산관리는 세 가지 미션 위에서 움직입니다."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {missions.map((m) => (
            <div
              key={m.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-navy-950">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Vision
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            자산관리의 명가를 향해
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            개인·기업·세계를 잇는 가교로서, 신뢰받는 &lsquo;자산관리의 명가&rsquo;이자
            &lsquo;한국의 소프트뱅크&rsquo;를 지향합니다.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          eyebrow="Principles"
          title="투자 원칙"
          description="브릿지자산관리가 자산을 다루는 방식입니다."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-navy-950">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Business areas */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <SectionHeading
            eyebrow="Business"
            title="8개 사업영역"
            description="자산은 따로 움직이지 않습니다. 8개 영역을 하나의 포트폴리오 관점에서 통합 관리합니다."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-navy-600 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-700 group-hover:bg-navy-950 group-hover:text-gold-400 transition-colors duration-200">
                    <ServiceIcon path={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-navy-950">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 rounded-md bg-navy-950 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors duration-200"
            >
              사업영역 자세히 보기
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
        </div>
      </section>

      {/* Company info */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            align="left"
            eyebrow="Company"
            title="회사 정보"
            description="브릿지자산관리는 서울 서초구에 위치하고 있습니다."
          />
          <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {companyInfo.map((row) => (
              <div key={row.label} className="flex gap-4 px-6 py-4">
                <dt className="w-28 shrink-0 text-sm font-semibold text-slate-500">
                  {row.label}
                </dt>
                <dd className="text-sm text-navy-900">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          대표 및 자산관리사 멤버 프로필은{" "}
          <Link href="/members" className="font-medium text-navy-700 underline hover:text-gold-600">
            멤버소개
          </Link>
          에서 확인하실 수 있습니다.
        </p>
      </section>

      <CtaSection />
    </>
  );
}
