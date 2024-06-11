const ID = Math.floor(Math.random * 999999);
console.log("shared-worker.js", ID);

const ports = new Set();

// 이벤트 핸들러, SharedWorker 인스턴스가 생성될때마다 호출
self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);
  console.log("CONN", ID, ports.size);

  // 메세지가 전달되면 호출
  port.onmessage = (event) => {
    console.log("MESSAGE", ID, event.data);

    for (let p of ports) {
      // 메세지가 각 윈도우창으로 전달
      p.postMessage([ID, event.data]);
    }
  };
};
