import Image from "next/image";
import type { ReactNode } from "react";

// 내부 페이지 공통 상단 영역.
// 히어로(사진)와 구분되도록 사진 대신 그라데이션 + 로고 워터마크로 깊이를 줍니다.
// 제목 위 영문 라벨·장식 라인은 두지 않습니다 — 제목과 설명만으로 위계를 잡습니다.
export default function PageHeader({
  title,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800">
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={520}
        height={209}
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-1/2 w-[260px] -translate-y-1/2 opacity-[0.07] brightness-0 invert sm:w-[400px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
        <h1 className="max-w-3xl break-keep text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl break-keep text-base leading-relaxed text-slate-300">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
