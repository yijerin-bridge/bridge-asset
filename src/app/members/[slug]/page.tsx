import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { members, getMember } from "@/lib/members";
import { CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return {};
  return {
    title: `${m.name} ${m.role} — 멤버 소개`,
    description: `브릿지자산관리 ${m.role} ${m.name}. ${m.intro[0]}`,
    alternates: { canonical: `/members/${m.slug}` },
    openGraph: {
      title: `${m.name} ${m.role} | 브릿지자산관리`,
      description: m.quote,
      images: [{ url: m.image }],
    },
  };
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-navy-950">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((c) => (
          <li key={c} className="flex items-start gap-3 text-sm text-slate-700">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
              aria-hidden="true"
            />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function MemberDetailPage({ params }: Props) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) notFound();

  const others = members.filter((x) => x.slug !== m.slug);

  const memberJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    alternateName: m.nameEn,
    jobTitle: m.role,
    worksFor: { "@id": `${site.url}/#organization` },
    image: `${site.url}${m.image}`,
    description: m.intro.join(" "),
    url: `${site.url}/members/${m.slug}`,
    knowsAbout: ["자산관리", "재무설계", "투자"],
  };

  return (
    <>
      <JsonLd data={memberJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "멤버 소개", path: "/members" },
          { name: m.name, path: `/members/${m.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <nav aria-label="브레드크럼" className="text-sm text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  홈
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/members" className="hover:text-white transition-colors duration-200">
                  멤버 소개
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold-400">
                {m.name}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
            <Image
              src={m.image}
              alt={`브릿지자산관리 ${m.role} ${m.name}`}
              width={220}
              height={220}
              className="h-48 w-48 rounded-2xl border border-white/10 bg-white object-cover object-top shadow-lg sm:h-56 sm:w-56"
              priority
            />
            <div>
              {m.ceo && (
                <span className="inline-block rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-950">
                  CEO
                </span>
              )}
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
                {m.name}
              </h1>
              <p className="mt-1 text-sm text-slate-400">{m.nameEn}</p>
              <p className="mt-3 text-base font-semibold text-gold-400">
                {m.role}
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-200">
                &ldquo;{m.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {m.philosophy && (
              <p className="mb-6 border-l-4 border-gold-500 pl-4 text-xl font-bold leading-snug text-navy-950">
                &ldquo;{m.philosophy}&rdquo;
              </p>
            )}
            <h2 className="text-lg font-bold text-navy-950">소개</h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-slate-700">
              {m.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {m.lectures && (
              <div className="mt-10">
                <InfoBlock title="강의" items={m.lectures} />
              </div>
            )}

            {m.media && (
              <div className="mt-10">
                <h2 className="text-lg font-bold text-navy-950">방송</h2>
                <ul className="mt-4 space-y-2">
                  {m.media.map((x) => (
                    <li
                      key={x.title}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 shrink-0 font-semibold text-gold-600">
                        {x.year}
                      </span>
                      {x.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {m.sns && (
              <div className="mt-10">
                <h2 className="text-lg font-bold text-navy-950">SNS</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {m.sns.map((s) => (
                    <li key={s.label} className="flex gap-2">
                      <span className="font-semibold text-navy-800">
                        {s.label}
                      </span>
                      <span>{s.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-10">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <InfoBlock title="경력" items={m.career} />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-bold text-navy-950">자격</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {m.certifications.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-navy-100 bg-white px-3 py-1.5 text-xs font-medium text-navy-800"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Other members */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-navy-950">다른 멤버 보기</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/members/${o.slug}`}
                className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm hover:border-navy-600 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <Image
                  src={o.image}
                  alt={o.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover object-top"
                />
                <p className="mt-3 font-semibold text-navy-950">{o.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{o.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`${m.name} ${m.ceo ? "대표" : "자산관리사"}와 상담하세요`}
        description="첫 진단 상담은 무료입니다. 편하게 문의해 주세요."
      />
    </>
  );
}
