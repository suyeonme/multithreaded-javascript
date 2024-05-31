console.log("Hello from main.js");

const worker = new Worker("worker.js");

// 메세지를 받으면 onmessage의 콜백 호출
worker.onmessage = (msg) => {
  console.log("message received from worker", msg.data);
};

worker.postMessage("message sent to worker");

console.log("Hello from end of main.js");
