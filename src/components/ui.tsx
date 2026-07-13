import Link from "next/link";
import type { Service } from "@/lib/services";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

export function ServiceIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg
      className={className ?? "h-6 w-6"}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-navy-600 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-700 group-hover:bg-navy-950 group-hover:text-gold-400 transition-colors duration-200">
        <ServiceIcon path={service.icon} />
      </span>
      <h3 className="mt-4 text-lg font-bold text-navy-950">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {service.short}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-navy-700 group-hover:text-gold-600 transition-colors duration-200">
        자세히 보기
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
      </span>
    </Link>
  );
}

export function CtaSection({
  title = "지금, 자산관리 전문가와 상담하세요",
  description = "첫 상담은 무료입니다. 현재 자산 구조를 진단하고 다음 단계를 함께 설계합니다.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-navy-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
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
            서비스 둘러보기
          </Link>
        </div>
      </div>
    </section>
  );
}
