import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/services";
import { ServiceIcon, CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} — ${service.short}`,
    description: service.description,
    keywords: [...service.keywords],
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | 브릿지자산관리`,
      description: service.short,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd(service.slug)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "서비스", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />

      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <nav aria-label="브레드크럼" className="text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  홈
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200">
                  서비스
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-400">
                {service.title}
              </li>
            </ol>
          </nav>
          <div className="mt-8 flex items-start gap-5">
            <span className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-400">
              <ServiceIcon path={service.icon} className="h-8 w-8" />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-navy-950">이런 것을 도와드립니다</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {service.points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
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
              <span className="text-sm leading-relaxed text-slate-700">{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h2 className="text-xl font-bold text-navy-950">다른 서비스도 살펴보세요</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-navy-600 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <h3 className="font-semibold text-navy-950 group-hover:text-navy-700">
                  {o.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{o.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`${service.title}, 전문가와 상담하세요`}
        description="현재 상황을 진단하고 실행 가능한 다음 단계를 제시합니다."
      />
    </>
  );
}
