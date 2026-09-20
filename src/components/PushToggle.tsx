"use client";

import { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

export default function PushToggle({ pw }: { pw: string }) {
  const [state, setState] = useState<"loading" | "on" | "off" | "denied" | "unsupported">("loading");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

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
        setState(sub ? "on" : "off");
      } catch {
        setState("off");
      }
    })();
  }, []);

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
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, subscription: sub.toJSON() }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "등록에 실패했습니다.");
      setState("on");
      setMsg("이 브라우저로 알림을 받습니다.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "알림 설정에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    setMsg("");
    try {
      const reg = await navigator.serviceWorker.getRegistration("/sw.js");
      const sub = await reg?.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: pw, action: "unsubscribe", subscription: sub.toJSON() }),
        });
        await sub.unsubscribe();
      }
      setState("off");
      setMsg("알림을 껐습니다.");
    } catch {
      setMsg("해제에 실패했습니다.");
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
        <button
          onClick={() => void (state === "on" ? disable() : enable())}
          disabled={busy || state === "loading"}
          className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
            state === "on"
              ? "bg-navy-950 text-white hover:bg-navy-800"
              : "bg-gold-500 text-navy-950 hover:bg-gold-400"
          } disabled:opacity-50`}
        >
          {state === "on" ? "🔔 알림 켜짐 (끄기)" : "🔕 새 상담 알림 받기"}
        </button>
      )}
      {msg && <span className="text-slate-500">{msg}</span>}
    </div>
  );
}
