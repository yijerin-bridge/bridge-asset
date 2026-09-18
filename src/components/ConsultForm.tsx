"use client";

import { useEffect, useState } from "react";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-navy-950 placeholder-slate-400 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600";

export default function ConsultForm() {
  const [source, setSource] = useState("");
  const [referrer, setReferrer] = useState("");
  const [gender, setGender] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      setSource(p.get("source") || "");
      // 같은 사이트 안에서 넘어온 경우에만 직전 페이지 경로를 기록합니다.
      const ref = document.referrer;
      if (ref) {
        const u = new URL(ref);
        if (u.origin === window.location.origin) setReferrer(u.pathname + u.search);
      }
    } catch {}
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      setErrMsg("개인정보 수집·이용에 동의해주세요.");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {
      name: String(fd.get("name") || ""),
      gender,
      birth: String(fd.get("birth") || ""),
      phone: String(fd.get("phone") || ""),
      callTime: String(fd.get("callTime") || ""),
      region: String(fd.get("region") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""), // honeypot
      source,
      referrer,
      consent: "true",
    };
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setErrMsg(data.error || "접수 중 오류가 발생했습니다. 전화로 문의해주세요.");
      }
    } catch {
      setStatus("error");
      setErrMsg("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-gold-600">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy-950">상담 신청이 접수되었습니다</h3>
        <p className="mt-2 text-sm text-slate-600">
          담당자가 입력하신 연락처로 순차적으로 연락드리겠습니다. 감사합니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="text-sm font-semibold text-navy-950">이름 <span className="text-gold-600">*</span></label>
          <input id="c-name" name="name" required className={inputCls} placeholder="홍길동" />
        </div>
        <div>
          <label className="text-sm font-semibold text-navy-950">성별</label>
          <div className="mt-1.5 flex gap-2">
            {["남", "여"].map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGender(g)}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  gender === g ? "border-navy-950 bg-navy-950 text-white" : "border-slate-300 text-slate-600 hover:border-navy-600"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="c-birth" className="text-sm font-semibold text-navy-950">생년월일</label>
          <input id="c-birth" name="birth" inputMode="numeric" className={inputCls} placeholder="예) 900110" />
        </div>
        <div>
          <label htmlFor="c-phone" className="text-sm font-semibold text-navy-950">연락처 <span className="text-gold-600">*</span></label>
          <input id="c-phone" name="phone" required inputMode="tel" className={inputCls} placeholder="- 없이 숫자만" />
        </div>
        <div>
          <label htmlFor="c-time" className="text-sm font-semibold text-navy-950">통화 가능시간 <span className="text-gold-600">*</span></label>
          <input id="c-time" name="callTime" required className={inputCls} placeholder="예) 오후 1~4시 / 저녁 7시 이후" />
        </div>
        <div>
          <label htmlFor="c-region" className="text-sm font-semibold text-navy-950">희망 상담지역 <span className="text-gold-600">*</span></label>
          <input id="c-region" name="region" required className={inputCls} placeholder="예) 서울 서초 / 화상 상담" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="c-msg" className="text-sm font-semibold text-navy-950">상담 전 요청사항 / 관심분야 <span className="text-gold-600">*</span></label>
        <textarea id="c-msg" name="message" required rows={4} className={inputCls} placeholder="상세하게 적어주실수록 더 유익한 상담이 됩니다. (예: 역외보험 5년차 점검, 상속 설계, 스타트업 투자 등)" />
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-navy-950" />
        <span className="text-xs leading-relaxed text-slate-600">
          <b className="text-navy-900">개인정보 수집·이용 동의 (필수)</b>
          <br />수집 항목: 이름, 연락처, 성별, 생년월일 · 이용 목적: 상담 진행 및 본인 확인 · 보유기간: 상담 목적 달성 시까지(관계 법령에 따른 보존 의무가 있는 경우 그 기간). 동의를 거부하실 수 있으나 이 경우 상담 신청이 불가합니다.
        </span>
      </label>

      {status === "error" && <p className="mt-4 text-sm font-medium text-red-600">{errMsg}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-md bg-gold-500 px-6 py-3.5 text-base font-semibold text-navy-950 hover:bg-gold-400 disabled:opacity-60 transition-colors duration-200 cursor-pointer"
      >
        {status === "sending" ? "접수 중…" : "상담 신청하기"}
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">
        급하시면 전화 상담: <a href="tel:0507-1432-6765" className="underline">0507-1432-6765</a>
      </p>
    </form>
  );
}
