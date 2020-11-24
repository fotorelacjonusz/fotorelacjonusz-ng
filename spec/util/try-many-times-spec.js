import { tryManyTimes } from "../../app/util/try-many-times.js"

describe(".tryManyTimes()", function() {
  beforeEach(function() {
    noSleep()
  })

  it("returns a promise", function() {
    let cb = sinon.stub()
    let promise = tryManyTimes(6, cb)
    expect(promise.then).toBeDefined()
  })

  it("executes given callback until it returns something truthy", async function() {
    let finalRetval = {some: "object"}

    let cb = sinon.stub()
    cb.onCall(0).returns(null)
    cb.onCall(1).returns(null)
    cb.returns(finalRetval)

    let retval = await tryManyTimes(5, cb)

    expect(cb.callCount).toEqual(3)
    expect(retval).toBe(finalRetval)
  })

  it("executes given callback at most specified number of times", async function() {
    let finalRetval = {some: "object"}

    let cb = sinon.stub()
    cb.onCall(0).returns(null)
    cb.onCall(1).returns(null)
    cb.onCall(2).returns(null)
    cb.returns(finalRetval)

    let retval = await tryManyTimes(3, cb)

    expect(cb.callCount).toEqual(3)
    expect(retval).toBe(null)
  })

  it("waits for asynchronous callbacks to finish before retrying", async function() {
    let finalRetval = {some: "object"}

    let cb = sinon.stub()
    cb.onCall(0).resolves(null)
    cb.resolves(finalRetval)

    let retval = await tryManyTimes(5, cb)

    expect(retval).toBe(finalRetval)
  })
})
