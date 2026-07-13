import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { members, recruit } from "@/lib/members";
import { SectionHeading, CtaSection } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "멤버 소개 — 브릿지자산관리 자산관리사",
  description:
    "브릿지자산관리 멤버를 소개합니다. 대표이사 이재린을 비롯한 자산관리사(WM)들이 고객의 더 나은 삶을 위해 함께합니다.",
  alternates: { canonical: "/members" },
  openGraph: {
    title: "멤버 소개 | 브릿지자산관리",
    description:
      "대표이사 이재린과 브릿지자산관리 자산관리사(WM)들을 소개합니다.",
  },
};

function MemberCard({
  slug,
  name,
  role,
  quote,
  image,
  ceo,
}: {
  slug: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  ceo?: boolean;
}) {
  return (
    <Link
      href={`/members/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-navy-600 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={`브릿지자산관리 ${role} ${name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
        {ceo && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-950 shadow">
            CEO
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
          {role}
        </p>
        <h3 className="mt-1 text-xl font-bold text-navy-950">{name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          &ldquo;{quote}&rdquo;
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-navy-700 group-hover:text-gold-600 transition-colors duration-200">
          상세 프로필
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
      </div>
    </Link>
  );
}

export default function MembersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "멤버 소개", path: "/members" },
        ])}
      />

      <section className="bg-navy-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            Members
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            브릿지자산관리 멤버
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            고객의 더 나은 삶의 가능성을 함께 열어가는 자산관리 전문가들을
            소개합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <MemberCard key={m.name} {...m} />
          ))}

          {/* 채용 카드 */}
          <Link
            href="/contact"
            className="group flex flex-col overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 shadow-sm hover:border-navy-600 hover:bg-white transition-all duration-200 cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <Image
                src={recruit.image}
                alt="자산관리사 채용"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top opacity-70 transition-opacity duration-200 group-hover:opacity-100"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                {recruit.role}
              </p>
              <h3 className="mt-1 text-xl font-bold text-navy-950">
                자산관리사 지원하기
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{recruit.quote}&rdquo;
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-navy-700 group-hover:text-gold-600 transition-colors duration-200">
                지원 문의하기
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
            </div>
          </Link>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          더 자세한 대표 프로필과 경력은{" "}
          <Link href="/about" className="font-medium text-navy-700 underline hover:text-gold-600">
            회사소개
          </Link>
          에서 확인하실 수 있습니다.
        </p>
      </section>

      <CtaSection
        title="브릿지자산관리와 함께하세요"
        description={`${site.name} 멤버가 고객 한 분 한 분의 자산을 책임지고 관리합니다.`}
      />
    </>
  );
}
