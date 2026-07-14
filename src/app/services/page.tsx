import type { Metadata } from "next";
import { services } from "@/lib/services";
import { SectionHeading, ServiceCard, CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "사업영역 — 8개 자산 영역 통합 자산관리",
  description:
    "주식·펀드, 역외투자·해외금융, 퇴직연금, 채권·P2P, 스타트업, 비트코인, 부동산, 보험. 브릿지자산관리의 8개 사업영역 통합 컨설팅 서비스를 확인하세요.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "사업영역 — 8개 자산 영역 통합 자산관리 | 브릿지자산관리",
    description:
      "주식부터 보험까지 8개 자산 영역을 하나의 포트폴리오 관점에서 통합 설계합니다.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "서비스", path: "/services" },
        ])}
      />
      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Services
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            8개 자산 영역, 하나의 전략
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            자산관리는 상품 판매가 아니라 설계입니다. 고객의 재무 목표에서
            출발해 8개 자산 영역을 하나의 포트폴리오로 통합합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <CtaSection
        title="어떤 자산부터 시작해야 할지 모르겠다면"
        description="현재 자산 구조를 무료로 진단해 드립니다. 우선순위부터 함께 정리하세요."
      />
    </>
  );
}
