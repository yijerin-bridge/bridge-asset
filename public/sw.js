// 브릿지자산관리 상담신청 알림 서비스 워커
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

// 서버는 UTF-8 JSON을 base64로 인코딩해 보냅니다. 한글 깨짐을 막기 위한 처리입니다.
function decodePayload(eventData) {
  if (!eventData) return null;
  var text = eventData.text();
  try {
    var bytes = Uint8Array.from(atob(text), function (c) {
      return c.charCodeAt(0);
    });
    return JSON.parse(new TextDecoder("utf-8").decode(bytes));
  } catch (e) {
    // 예전 형식(평문 JSON)도 받아들입니다.
    try {
      return JSON.parse(text);
    } catch (e2) {
      return null;
    }
  }
}

self.addEventListener("push", function (event) {
  var data = {
    title: "새 상담 신청",
    body: "관리자 페이지에서 확인하세요.",
    url: "/admin",
  };
  var parsed = null;
  try {
    parsed = decodePayload(event.data);
  } catch (e) {}
  if (parsed) {
    if (parsed.title) data.title = parsed.title;
    if (parsed.body) data.body = parsed.body;
    if (parsed.url) data.url = parsed.url;
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/images/logo-mark.png",
      badge: "/images/logo-mark.png",
      tag: "consult",
      renotify: true,
      requireInteraction: true,
      data: { url: data.url },
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || "/admin";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (list) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].url.indexOf("/admin") !== -1 && "focus" in list[i]) {
            return list[i].focus();
          }
        }
        return self.clients.openWindow(url);
      })
  );
});
