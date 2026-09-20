"use client";

import { useEffect, useState } from "react";
import { sourceLabel, type ConsultSubmission } from "@/lib/consult";
import PushToggle from "@/components/PushToggle";

export default function AdminClient() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<ConsultSubmission[]>([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "new" | "done">("all");

  useEffect(() => {
    const saved = sessionStorage.getItem("bridge_admin_pw");
    if (saved) { setPw(saved); void load(saved); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(password: string) {
    setLoading(true); setErr("");
    try {
      const res = await fetch("/api/consult/admin", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, action: "list" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setItems(data.items); setAuthed(true);
        sessionStorage.setItem("bridge_admin_pw", password);
      } else { setErr(data.error || "오류"); setAuthed(false); }
    } catch { setErr("네트워크 오류"); }
    setLoading(false);
  }

  async function setStatus(id: string, status: "new" | "done") {
    await fetch("/api/consult/admin", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw, action: "setStatus", id, status }),
    });
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  async function remove(id: string, name: string) {
    if (!window.confirm(`'${name}' 신청을 삭제할까요?
삭제하면 되돌릴 수 없습니다.`)) return;
    const res = await fetch("/api/consult/admin", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw, action: "delete", id }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      setItems((prev) => prev.filter((x) => x.id !== id));
    } else {
      window.alert(data.error || "삭제하지 못했습니다. 새로고침 후 다시 시도해주세요.");
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 py-24">
        <h1 className="text-2xl font-bold text-navy-950">관리자 로그인</h1>
        <p className="mt-2 text-sm text-slate-500">상담 신청 관리 페이지입니다.</p>
        <form onSubmit={(e) => { e.preventDefault(); void load(pw); }} className="mt-6">
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="비밀번호"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-navy-600 focus:outline-none" />
          {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
          <button type="submit" disabled={loading}
            className="mt-4 w-full rounded-md bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800 disabled:opacity-60">
            {loading ? "확인 중…" : "로그인"}
          </button>
        </form>
      </div>
    );
  }

  const shown = items.filter((x) => filter === "all" || (x.status || "new") === filter);
  const newCount = items.filter((x) => (x.status || "new") === "new").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-navy-950">상담 신청 <span className="text-slate-400">({items.length})</span></h1>
        <div className="flex items-center gap-2 text-sm">
          {(["all", "new", "done"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 font-medium ${filter === f ? "bg-navy-950 text-white" : "bg-slate-100 text-slate-600"}`}>
              {f === "all" ? "전체" : f === "new" ? `신규 ${newCount}` : "완료"}
            </button>
          ))}
          <button onClick={() => void load(pw)} className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-600">새로고침</button>
          <PushToggle pw={pw} />
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 text-center text-slate-500">신청 내역이 없습니다.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {shown.map((s) => (
            <div key={s.id} className={`rounded-xl border p-5 shadow-sm ${(s.status || "new") === "done" ? "border-slate-200 bg-slate-50" : "border-navy-100 bg-white"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-navy-950">{s.name}</span>
                    {s.gender && <span className="text-sm text-slate-500">{s.gender}</span>}
                    {(s.status || "new") === "new"
                      ? <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-600">신규</span>
                      : <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">완료</span>}
                  </div>
                  <a href={`tel:${s.phone}`} className="mt-1 block text-sm font-medium text-navy-800 underline">{s.phone}</a>
                </div>
                <div className="text-right text-xs text-slate-400">
                  {new Date(s.createdAt).toLocaleString("ko-KR")}
                  <div className="mt-1 inline-block rounded-full bg-navy-50 px-2 py-0.5 font-semibold text-navy-700">{sourceLabel(s.source)}</div>
                  {s.referrerLabel && (
                    <div className="mt-1 inline-block rounded-full bg-gold-100 px-2 py-0.5 font-semibold text-gold-700" title="상담문의 페이지 직전에 보던 페이지">직전: {s.referrerLabel}</div>
                  )}
                </div>
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {s.birth && <div className="flex gap-2"><dt className="text-slate-400">생년월일</dt><dd className="text-navy-900">{s.birth}</dd></div>}
                <div className="flex gap-2"><dt className="text-slate-400">통화가능</dt><dd className="text-navy-900">{s.callTime}</dd></div>
                <div className="flex gap-2"><dt className="text-slate-400">희망지역</dt><dd className="text-navy-900">{s.region}</dd></div>
              </dl>
              <p className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{s.message}</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  onClick={() => void remove(s.id, s.name)}
                  className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  삭제
                </button>
                <div className="flex gap-2">
                {(s.status || "new") === "new"
                  ? <button onClick={() => setStatus(s.id, "done")} className="rounded-md bg-navy-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-800">완료 처리</button>
                  : <button onClick={() => setStatus(s.id, "new")} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600">신규로 되돌리기</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
