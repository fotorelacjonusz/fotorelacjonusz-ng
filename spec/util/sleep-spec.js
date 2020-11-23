import { sleep } from "../../app/util/sleep.js"

describe(".sleep()", function() {
  beforeEach(function() {
    this.clock = sinon.useFakeTimers()
  })

  afterEach(function() {
    this.clock.restore()
  })

  it("awaits for given miliseconds", async function() {
    let a = 0

    let subject = async () => {
      a = 1
      await sleep(1000)
      a = 2
      await sleep(2000)
      a = 3
    }

    let prom = subject()

    expect(a).toEqual(1)
    await this.clock.tickAsync(500)
    expect(a).toEqual(1)
    await this.clock.tickAsync(700)
    expect(a).toEqual(2)
    await this.clock.tickAsync(1000)
    expect(a).toEqual(2)
    await this.clock.tickAsync(1000)
    expect(a).toEqual(3)

    await prom
  })
})
