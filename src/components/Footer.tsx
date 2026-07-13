import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";

const snsLinks = [
  {
    label: "네이버 블로그",
    href: site.sns.blog,
    icon: (
      <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
    ),
    viewBox: "0 0 24 24",
  },
  {
    label: "인스타그램",
    href: site.sns.instagram,
    icon: (
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16.32a4.32 4.32 0 1 1 0-8.64 4.32 4.32 0 0 1 0 8.64zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    ),
    viewBox: "0 0 24 24",
  },
  {
    label: "유튜브",
    href: site.sns.youtube,
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
    viewBox: "0 0 24 24",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt={`${site.nameEn} 로고`}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-bold text-white text-lg">{site.name}</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {site.tagline}. 증권·부동산·스타트업·보험을 아우르는 종합 자산관리
              파트너입니다.
            </p>
            <div className="mt-5 flex gap-3">
              {snsLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white transition-colors duration-200"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox={s.viewBox}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <nav aria-label="푸터 메뉴">
              <h2 className="text-sm font-semibold text-white">메뉴</h2>
              <ul className="mt-4 space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="서비스 메뉴">
              <h2 className="text-sm font-semibold text-white">서비스</h2>
              <ul className="mt-4 space-y-2">
                {services.slice(0, 5).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <address className="not-italic">
            <h2 className="text-sm font-semibold text-white">연락처</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>{site.address.full}</li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500 space-y-1">
          <p>
            {site.legalName} | 대표이사 {site.ceo} | 사업자등록번호{" "}
            {site.bizNumber}
          </p>
          <p>
            투자에 대한 최종 판단과 책임은 투자자 본인에게 있으며, 본 사이트의
            정보는 투자 권유를 목적으로 하지 않습니다.
          </p>
          <p>
            © {new Date().getFullYear()} {site.nameEn}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
