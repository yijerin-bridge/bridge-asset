import type { Metadata } from "next";
import Image from "next/image";
import { funds, products, angelInvestments } from "@/lib/portfolio";
import { SectionHeading, CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "포트폴리오 — 투자조합 GP 운용 실적과 투자 프로그램",
  description:
    "브릿지자산관리의 투자 실적. Bridge Innovation 투자조합(IPO·MOIC 2.9x), KSAF Global AI, Black Bird 등 GP/LP 운용 현황과 S&P 500 적립식, 멀티커런시, 소득공제 투자 프로그램을 소개합니다.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "포트폴리오 | 브릿지자산관리",
    description:
      "투자조합 GP 운용과 엔젤 투자 — IPO 엑싯을 포함한 투자 실적과 프로그램.",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "포트폴리오", path: "/portfolio" },
        ])}
      />

      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Portfolio (GP / LP)
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            함께 성장한 투자 포트폴리오
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            개인투자조합 GP로서, 그리고 엔젤투자자로서 초기 스타트업부터
            Pre-IPO까지 투자해 왔습니다. 코스닥·나스닥 IPO 엑싯 경험을 보유하고
            있습니다.
          </p>
        </div>
      </section>

      {/* 투자조합 */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          align="left"
          eyebrow="Investment Funds"
          title="투자조합 운용 현황"
          description="브릿지 이노베이션 투자조합 등 GP/CO-GP/LP로 운용·참여 중인 투자 건입니다."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {funds.map((f) => (
            <li
              key={f.name}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                <Image
                  src={f.image}
                  alt={`${f.name} 투자 이미지`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {f.highlight && (
                  <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-2.5 py-1 text-xs font-bold text-navy-950 shadow">
                    {f.highlight}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-bold text-navy-950 leading-snug">{f.name}</h3>
                <p className="mt-1 text-xs font-medium text-gold-600">
                  {f.date} 투자 ({f.role})
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {f.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 투자 프로그램 */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <SectionHeading
            align="left"
            eyebrow="Investment Programs"
            title="투자 프로그램"
            description="고객 성향과 목적에 맞춰 운영하는 대표 투자 프로그램입니다."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <li
                key={p.name}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
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
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 엔젤 투자 */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          align="left"
          eyebrow="Angel & LP"
          title="개인 엔젤·LP 투자"
          description="크라우드펀딩부터 Pre-IPO 구주까지, 다양한 단계의 스타트업에 투자하고 있습니다."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {angelInvestments.map((a) => (
            <li
              key={a.name}
              className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="font-semibold text-navy-950">{a.name}</span>
              <span className="text-xs text-slate-500 text-right">{a.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-slate-500">
          이 외에도 다수의 투자 건이 있습니다. 과거의 투자 성과가 미래의 수익을
          보장하지 않습니다.
        </p>
      </section>

      <CtaSection
        title="스타트업 투자, 함께 시작하세요"
        description="개인투자조합 참여와 엔젤투자 소득공제까지, 비상장 투자의 처음부터 끝까지 안내합니다."
      />
    </>
  );
}
