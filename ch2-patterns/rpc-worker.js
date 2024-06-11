class RpcWorker {
  constructor(path) {
    /**@description JSON-RPC 메세지에 대한 구분자(요청과 응답 연결 관계를 파악하기 위함) */
    this.next_command_id = 0; //
    this.in_flight_commands = new Map();
    this.worker = new Worker(path);
    this.worker.onmessage = this.onMessageHandler.bind(this);
  }

  /**@description 전용 워커가 메세지 보내면 실행하는 로직 */
  onMessageHandler(msg) {
    const { result, error, id } = msg.data;
    const { resolve, reject } = this.in_flight_commands.get(id);
    this.in_flight_commands.delete(id);
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  }

  /**@description 웹워커에 있는 함수를 실행 */
  exec(method, ...args) {
    const id = ++this.next_command_id;
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.in_flight_commands.set(id, { resolve, reject });
    this.worker.postMessage({ method, params: args, id });
    return promise;
  }
}
