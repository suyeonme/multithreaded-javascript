/**
 * @summary
 * RPC 패턴과 명령어 분배 패턴을 통합하고 인터페이스를 구현
 * 웹워커를 외부 라이브러리처럼 사용하기위함
 */

const worker = new RpcWorker("worker.js");

// 결과가 성공/실패이든 모든 프로미스를 실행
Promise.allSettled([
  worker.exec("square_sum", 1_000_000),
  worker.exec("fibonacci", 1_000),
  worker.exec("fake_method"),
  worker.exec("bad"),
]).then(([square_sum, fibonacci, fake_method, bad]) => {
  console.log("square_sum", square_sum);
  console.log("fibonacci", fibonacci);
  console.log("fake_method", fake_method);
  console.log("bad", bad);
});
