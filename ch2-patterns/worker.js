const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

/**@description onmessage를 비동기로 만들기위한 래퍼 */
function asyncOnMessageWrap(fn) {
  return async function (msg) {
    postMessage(await fn(msg.data));
  };
}

const commands = {
  async square_sum(max) {
    await sleep(Math.random() * 100);
    let sum = 0;
    for (let i = 0; i < max; i++) {
      sum += Math.sqrt(i);
    }
    return sum;
  },
  async fibonacci(limit) {
    await sleep(Math.random() * 100);
    let prev = 1n,
      next = 0n,
      swap;
    while (limit) {
      swap = prev;
      prev = prev + next;
      next = swap;
      limit--;
    }
    // Bigint를 JSON 문자열로 치환
    return String(next);
  },
  async bad() {
    await sleep(Math.random() * 10);
    throw new Error("oh no");
  },
};

self.onmessage = asyncOnMessageWrap(async (rpc) => {
  const { method, params, id } = rpc;

  if (commands.hasOwnProperty(method)) {
    try {
      // 명령어가 commands 리스트에 존재하는지 확인
      const result = await commands[method](...params);
      return { id, result };
    } catch (err) {
      // 명령어 실행중 에러 코드
      return { id, error: { code: -32000, message: err.message } };
    }
  } else {
    return {
      id,
      error: {
        code: -32601, // 명령어 없음 코드
        message: `method ${method} not found`,
      },
    };
  }
});
