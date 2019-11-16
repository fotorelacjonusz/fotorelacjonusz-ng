import { Countdown } from "../../app/components/countdown.js"

const prepareWrapper = wrapperFactoryFactory(Countdown)

describe("Countdown component", function() {
  beforeEach(function() {
    jasmine.clock().install()
  })

  afterEach(function() {
    jasmine.clock().uninstall()
  })

  beforeEach(function() {
    this.wrapper = prepareWrapper()
  })

  describe("when disabled", function() {
    it("displays nothing", function() {
      expect(this.wrapper.text()).toBeEmptyString()
    })
  })

  describe("when enabled", function() {
    it("counts down, and displays remaining time", function() {
      this.wrapper.vm.restart(3)
      expect(this.wrapper.text()).toEqual("Waiting: 3s")
      jasmine.clock().tick(1000)
      expect(this.wrapper.text()).toEqual("Waiting: 2s")
      jasmine.clock().tick(1000)
      expect(this.wrapper.text()).toEqual("Waiting: 1s")
      jasmine.clock().tick(1000)
      expect(this.wrapper.text()).toEqual("Waiting: 0s")
      jasmine.clock().tick(1000)
      expect(this.wrapper.text()).toBeEmptyString()
    })

    it("emits 'zero' event when counting down is finished", function() {
      this.wrapper.vm.restart(3)
      jasmine.clock().tick(2500)
      expect(this.wrapper.emitted().zero).toBeFalsy()
      jasmine.clock().tick(3500)
      expect(this.wrapper.emitted().zero).toBeTruthy()
    })
  })
})
