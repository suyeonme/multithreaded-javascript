console.log("red.js");

const worker = new SharedWorker("shared-worker.js");

worker.port.onmessage = (e) => {
  console.log("EVENT", e.data);
};
