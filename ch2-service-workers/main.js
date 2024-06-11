/**
 * @description navigator.serviceWorker.register
 * 서비스워커 등록
 * 아웃바운드 HTTP요청은 항상 서비스워커를 통함
 * 스코프 디렉터리에 있는 모든 HTML 페이지는 서비스워커를 통해 요청을 보내야함
 *
 * @param scope
 * 서비스워커가 제어권을 가지는 범위
 * scope에 등록된 범위내의 모든 HTML 페이지를 제어함
 */
navigator.serviceWorker.register("/sw.js", {
  scope: "/",
});

navigator.serviceWorker.oncontrollerchange = () => {
  console.log("controller change");
};

async function makeRequest() {
  const result = await fetch("data.json");
  const payload = await result.json();
  console.log(payload);
}
