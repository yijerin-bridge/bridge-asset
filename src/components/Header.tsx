"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label={`${site.name} 홈으로`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={112}
              height={45}
              className="h-9 w-auto"
              priority
            />
            <span className="font-bold text-lg text-navy-950 tracking-tight">
              브릿지<span className="text-gold-600">자산관리</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="주 메뉴">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-navy-950 bg-navy-50"
                      : "text-slate-600 hover:text-navy-950 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-3 rounded-md bg-navy-950 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 transition-colors duration-200"
            >
              무료 상담 신청
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-md text-navy-950 hover:bg-slate-100 cursor-pointer"
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
          className="md:hidden border-t border-slate-200 bg-white px-4 pb-4 pt-2"
          aria-label="모바일 메뉴"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-navy-950"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 block rounded-md bg-navy-950 px-3 py-3 text-center text-base font-medium text-white hover:bg-navy-800"
            onClick={() => setOpen(false)}
          >
            무료 상담 신청
          </Link>
        </nav>
      )}
    </header>
  );
}
