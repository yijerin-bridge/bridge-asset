import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { ceoProfile } from "@/lib/profile";
import { SectionHeading, CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "회사소개 — 대표 이재린 프로필·경력·자격",
  description:
    "브릿지자산관리 대표 이재린. 미래에셋증권 FA 출신, 투자자산운용사·AFPK 보유, 다수 개인투자조합 GP. 12년+ 금융 경력의 자산관리 전문가를 소개합니다.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "회사소개 | 브릿지자산관리",
    description:
      "한국의 피터 틸을 꿈꾸는 자산관리 전문가, 브릿지자산관리 대표 이재린을 소개합니다.",
  },
};

export default function AboutPage() {
  // public/images/ceo.png(또는 .jpg)를 추가하고 다시 빌드하면 대표 사진이 자동 표시됩니다
  const ceoPhoto = ["ceo.png", "ceo.jpg"].find((f) =>
    fs.existsSync(path.join(process.cwd(), "public", "images", f))
  );

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "회사소개", path: "/about" },
        ])}
      />

      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
                About Us
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                &ldquo;{ceoProfile.headline}&rdquo;
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
                {ceoProfile.intro}
              </p>
            </div>
            {ceoPhoto && (
              <Image
                src={`/images/${ceoPhoto}`}
                alt={`${site.name} 대표 ${ceoProfile.name}`}
                width={280}
                height={399}
                className="hidden lg:block rounded-2xl border border-white/10 bg-white object-cover object-top shadow-lg"
                priority
              />
            )}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          eyebrow="Mission & Vision"
          title="자산관리의 명가를 향해"
          description="고객의 경제적 자유와 신뢰 기반 금융, 양극화 해소에 기여합니다. 개인·기업·세계를 잇는 가교로서 '한국의 소프트뱅크'를 지향합니다."
        />
      </section>

      {/* CEO Profile */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <SectionHeading
            align="left"
            eyebrow="CEO"
            title={`대표 ${ceoProfile.name}`}
            description="투자자이자 창업자, 그리고 설계자."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-lg font-bold text-navy-950">현재 활동</h3>
              <ul className="mt-4 space-y-3">
                {ceoProfile.current.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="text-lg font-bold text-navy-950">주요 경력</h3>
              <ul className="mt-4 space-y-3">
                {ceoProfile.past.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-navy-600" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-lg font-bold text-navy-950">보유 자격</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ceoProfile.certifications.map((c) => (
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
      </section>

      {/* Lectures & Media */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          eyebrow="Activities"
          title="강의 및 방송 활동"
          description="삼성전자, KB손해보험, 지자체 등에서 재무·투자 교육을 진행해 왔습니다."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold text-navy-950">주요 강의</h3>
            <ol className="mt-4 space-y-4 border-l-2 border-navy-100 pl-6">
              {ceoProfile.lectures.map((l) => (
                <li key={l.year + l.title} className="relative">
                  <span
                    className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-gold-500"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-navy-800">{l.year}</p>
                  <p className="text-sm text-slate-600">{l.title}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy-950">방송 출연</h3>
            <ol className="mt-4 space-y-4 border-l-2 border-navy-100 pl-6">
              {ceoProfile.media.map((m) => (
                <li key={m.title} className="relative">
                  <span
                    className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-navy-600"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold text-navy-800">{m.year}</p>
                  <p className="text-sm text-slate-600">{m.title}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-navy-950">더 알아보기</h3>
              <p className="mt-2 text-sm text-slate-600">
                투자레터와 리서치는 블로그와 유튜브에서 확인하실 수 있습니다.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={site.sns.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-navy-800 hover:border-navy-600 hover:bg-navy-50 transition-colors duration-200"
                >
                  네이버 블로그
                </a>
                <a
                  href={site.sns.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-navy-800 hover:border-navy-600 hover:bg-navy-50 transition-colors duration-200"
                >
                  유튜브
                </a>
                <Link
                  href="/portfolio"
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-navy-800 hover:border-navy-600 hover:bg-navy-50 transition-colors duration-200"
                >
                  투자 포트폴리오
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
