import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { insights, getInsight } from "@/lib/insights";
import { CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: {
      type: "article",
      title: `${a.title} | 브릿지자산관리`,
      description: a.description,
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const a = getInsight(slug);
  if (!a) notFound();

  const others = insights.filter((x) => x.slug !== a.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    inLanguage: "ko-KR",
    keywords: a.keywords.join(", "),
    articleSection: a.category,
    author: {
      "@type": "Person",
      name: site.ceo,
      url: `${site.url}/members/yi-jaerin`,
    },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/insights/${a.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd(a.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "인사이트", path: "/insights" },
          { name: a.title, path: `/insights/${a.slug}` },
        ])}
      />

      <article>
        {/* Hero */}
        <section className="bg-navy-950">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
            <nav aria-label="브레드크럼" className="text-sm text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="hover:text-white">홈</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/insights" className="hover:text-white">인사이트</Link></li>
              </ol>
            </nav>
            <div className="mt-6 flex items-center gap-2 text-xs">
              <span className="rounded-full bg-white/10 px-2.5 py-1 font-semibold text-gold-400">
                {a.category}
              </span>
              <span className="text-slate-400">{a.date}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {a.title}
            </h1>
            <p className="mt-4 text-sm text-slate-400">
              글 · {site.ceo} 대표 (브릿지자산관리)
            </p>
          </div>
        </section>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
          {/* 직답 */}
          <p className="border-l-4 border-gold-500 bg-navy-50 p-5 text-lg font-medium leading-relaxed text-navy-950">
            {a.lead}
          </p>

          <div className="mt-10 space-y-10">
            {a.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-bold text-navy-950">{s.heading}</h2>
                {s.paragraphs?.map((p, i) => (
                  <p key={i} className="mt-3 text-base leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
                {s.image && (
                  <figure className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image.src} alt={s.image.alt} className="w-full" loading="lazy" />
                    {s.image.caption && (
                      <figcaption className="bg-slate-50 px-4 py-2.5 text-center text-xs text-slate-500">
                        {s.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {s.cards && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {s.cards.map((c) => (
                      <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-lg font-bold text-navy-950">{c.title}</h3>
                          {c.subtitle && (
                            <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-semibold text-gold-600">
                              {c.subtitle}
                            </span>
                          )}
                        </div>
                        <ul className="mt-4 space-y-2">
                          {c.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-600" aria-hidden="true" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {s.bullets && (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* FAQ */}
          {a.faqs.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold text-navy-950">자주 묻는 질문</h2>
              <dl className="mt-6 space-y-4">
                {a.faqs.map((f) => (
                  <div key={f.q} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <dt className="font-semibold text-navy-950">{f.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <p className="mt-12 rounded-xl bg-slate-100 p-5 text-xs leading-relaxed text-slate-500">
            본 콘텐츠는 정보 제공을 목적으로 하며 투자 권유를 목적으로 하지
            않습니다. 개별 상품의 가입·투자 판단과 책임은 투자자 본인에게 있으며,
            구체적인 설계는 자산 상황에 따른 상담이 필요합니다.
          </p>

          {others.length > 0 && (
            <div className="mt-14 border-t border-slate-200 pt-10">
              <h2 className="text-lg font-bold text-navy-950">다른 인사이트</h2>
              <ul className="mt-5 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/insights/${o.slug}`} className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-navy-600 transition-colors duration-200">
                      <span className="font-semibold text-navy-950 group-hover:text-navy-700">{o.title}</span>
                      <span className="text-xs text-slate-400 shrink-0">{o.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <CtaSection
        title="내 상황엔 어떻게 적용될까요?"
        description="글로 다 담지 못한 개인별 설계는 무료 상담에서 진단해 드립니다."
      />
    </>
  );
}
