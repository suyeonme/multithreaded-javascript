/**
 * @description HTTP 요청을 가로채는 프록시 구현
 */

let counter = 0;

// 브라우저에 서비스워커가 설치되었을 때 호출되는 핸들러
self.oninstall = (event) => {
  console.log("service worker install");
};

self.onactivate = (event) => {
  console.log("service worker activate");
  // 서비스워커가 index.html 파일을 제어할 수 있도록 활성화
  event.waitUntil(self.clients.claim());
};

// 서비스워커가 제어권을 갖는 페이지에서 네트워크 요청이 발생할 때마다 호출되는 핸들러
self.onfetch = (event) => {
  console.log("fetch", event.request.url);

  if (event.request.url.endsWith("/data.json")) {
    counter++;
    event.respondWith(new Response(JSON.stringify({ counter })), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return;
  }

  // 이외의 요청은 일반적은 HTTP 요청으로 넘어감
  event.respondWith(fetch(event.request));
};
