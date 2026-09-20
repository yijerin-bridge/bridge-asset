// 브릿지자산관리 상담신청 알림 서비스 워커
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = { title: "새 상담 신청", body: "관리자 페이지에서 확인하세요.", url: "/admin" };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/images/logo-mark.png",
      badge: "/images/logo-mark.png",
      tag: "consult",
      renotify: true,
      requireInteraction: true,
      data: { url: data.url || "/admin" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/admin";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes("/admin") && "focus" in c) return c.focus();
      }
      return self.clients.openWindow(url);
    })
  );
});
