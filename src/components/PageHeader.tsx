import Image from "next/image";
import type { ReactNode } from "react";

// 내부 페이지 공통 상단 영역.
// 히어로(사진)와 구분되도록 사진 대신 그라데이션 + 로고 워터마크로 깊이를 줍니다.
export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={520}
        height={209}
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-1/2 w-[260px] -translate-y-1/2 opacity-[0.07] brightness-0 invert sm:w-[400px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl break-keep text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <div className="mt-5 h-[3px] w-12 bg-gold-500" aria-hidden="true" />
        {description && (
          <p className="mt-5 max-w-2xl break-keep text-base leading-relaxed text-slate-300">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
