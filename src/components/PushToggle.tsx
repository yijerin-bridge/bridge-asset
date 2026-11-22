"use client";

import { useCallback, useEffect, useState } from "react";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

type State = "loading" | "on" | "off" | "denied" | "unsupported";

export default function PushToggle({ pw }: { pw: string }) {
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [serverCount, setServerCount] = useState<number | null>(null);

  const api = useCallback(
    async (payload: Record<string, unknown>) => {
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, ...payload }),
      });
      return res.json();
    },
    [pw]
  );

  const refreshCount = useCallback(async () => {
    try {
      const d = await api({ action: "status" });
      if (d.ok) setServerCount(d.count);
    } catch {
      // 상태 조회 실패는 표시만 생략
    }
  }, [api]);

  useEffect(() => {
    (async () => {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        setState("unsupported");
        return;
      }
      if (Notification.permission === "denied") {
        setState("denied");
        return;
      }
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        const sub = await reg.pushManager.getSubscription();
        if (sub) {
          // 자동 복구: 브라우저엔 등록돼 있는데 서버 명단에서 빠진 경우를 메웁니다.
          await api({ subscription: sub.toJSON() });
          setState("on");
        } else {
          setState("off");
        }
      } catch {
        setState("off");
      }
      await refreshCount();
    })();
  }, [api, refreshCount]);

  async function enable() {
    setBusy(true);
    setMsg("");
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setState(perm === "denied" ? "denied" : "off");
        return;
      }
      const keyRes = await fetch("/api/push/key");
      const keyData = await keyRes.json();
      if (!keyData.ok) throw new Error(keyData.error || "키를 가져오지 못했습니다.");

      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(keyData.key),
      });
      const data = await api({ subscription: sub.toJSON() });
      if (!data.ok) throw new Error(data.error || "등록에 실패했습니다.");
      setState("on");
      setMsg("이 브라우저로 알림을 받습니다.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "알림 설정에 실패했습니다.");
    } finally {
      setBusy(false);
      await refreshCount();
    }
  }

  async function disable() {
    setBusy(true);
    setMsg("");
    try {
      const reg = await navigator.serviceWorker.getRegistration("/sw.js");
      const sub = await reg?.pushManager.getSubscription();
      if (sub) {
        await api({ action: "unsubscribe", subscription: sub.toJSON() });
        await sub.unsubscribe();
      }
      setState("off");
      setMsg("알림을 껐습니다.");
    } catch {
      setMsg("해제에 실패했습니다.");
    } finally {
      setBusy(false);
      await refreshCount();
    }
  }

  async function test() {
    setBusy(true);
    setMsg("");
    try {
      const d = await api({ action: "test" });
      if (!d.ok) throw new Error(d.error || "테스트 발송에 실패했습니다.");
      if (d.sent > 0) {
        setMsg(`테스트 알림을 ${d.sent}대에 보냈습니다. 화면 오른쪽 아래에 안 뜨면 Windows 알림 설정을 확인하세요.`);
      } else if (d.removed > 0) {
        setMsg("등록이 만료되어 정리했습니다. 알림 받기를 다시 눌러주세요.");
        setState("off");
      } else {
        setMsg(`보내지 못했습니다${d.errors?.length ? ` (오류 ${d.errors.join(", ")})` : ""}. 알림 받기를 다시 눌러주세요.`);
      }
      setServerCount(d.count);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "테스트 발송에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  if (state === "unsupported") return null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {state === "denied" ? (
        <span className="text-red-600">
          브라우저에서 알림이 차단돼 있습니다. 주소창 좌측 자물쇠 → 알림 → 허용으로 바꿔주세요.
        </span>
      ) : (
        <>
          <button
            onClick={() => void (state === "on" ? disable() : enable())}
            disabled={busy || state === "loading"}
            className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
              state === "on"
                ? "bg-ink-950 text-white hover:bg-ink-800"
                : "bg-ink-950 text-white hover:bg-ink-800"
            } disabled:opacity-50`}
          >
            {state === "on" ? "🔔 알림 켜짐 (끄기)" : "🔕 새 상담 알림 받기"}
          </button>
          {state === "on" && (
            <button
              onClick={() => void test()}
              disabled={busy}
              className="rounded-full border border-slate-300 px-3 py-1.5 font-medium text-ink-950 hover:bg-slate-100 disabled:opacity-50"
            >
              테스트 알림
            </button>
          )}
        </>
      )}
      {serverCount !== null && (
        <span className={serverCount > 0 ? "text-slate-500" : "text-red-600"}>
          서버 등록 기기 {serverCount}대
        </span>
      )}
      {msg && <span className="w-full text-slate-600">{msg}</span>}
    </div>
  );
}
