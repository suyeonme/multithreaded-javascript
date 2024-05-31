console.log("hello from worker.js");

// self: 워커스레드의 전역 객체를 나타내는 globalThis의 단축 명령어
self.onmessage = (msg) => {
  console.log("message from main", msg.data);

  postMessage("message sent from worker");
};
