import { sleep } from "./sleep.js"

export async function tryManyTimes(totalAttempts, fun) {
  let attempt = 1

  for (;;) {
    let result = await fun()
    if (attempt >= totalAttempts || result) {
      return result
    } else {
      attempt += 1
      await sleep(1000 * (2 ** attempt - 1.9))
    }
  }
}
