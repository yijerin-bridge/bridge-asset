"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // 홈에서는 첫 화면 사진 위에 투명하게 얹혔다가, 스크롤하면 흰 헤더로 바뀝니다.
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const overlay = isHome && !scrolled && !open;
  const position = isHome ? "fixed inset-x-0 top-0" : "sticky top-0";
  const surface = overlay
    ? "border-b border-white/15 bg-transparent"
    : "border-b border-slate-200 bg-white/95 backdrop-blur";

  return (
    <header className={`${position} z-50 transition-colors duration-300 ${surface}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5"
            aria-label={`${site.name} 홈으로`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={112}
              height={45}
              className={`h-8 w-auto shrink-0 sm:h-9 ${overlay ? "brightness-0 invert" : ""}`}
              priority
            />
            <span
              className={`min-w-0 truncate text-[13px] font-bold leading-tight tracking-tight sm:text-base ${
                overlay ? "text-white" : "text-ink-950"
              }`}
            >
              Bridge Asset Management Inc.
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="주 메뉴">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const tone = overlay
                ? active
                  ? "text-white bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/10"
                : active
                  ? "text-ink-950 bg-ink-50"
                  : "text-slate-600 hover:text-ink-950 hover:bg-slate-100";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${tone}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-md cursor-pointer ${
              overlay ? "text-white hover:bg-white/10" : "text-ink-950 hover:bg-slate-100"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="lg:hidden border-t border-slate-200 bg-white px-4 pb-4 pt-2"
          aria-label="모바일 메뉴"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-ink-950"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
