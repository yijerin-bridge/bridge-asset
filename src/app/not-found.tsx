import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 text-slate-600">
        주소가 변경되었거나 삭제된 페이지입니다.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-navy-950 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800 transition-colors duration-200"
      >
        홈으로 돌아가기
      </Link>
    </section>
  );
}
