import { MainWindow } from "../../app/components/main-window.js"

const prepareWrapper = wrapperFactoryFactory(MainWindow)

describe("MainWindow component", function() {
  beforeEach(function() {
    this.wrapper = prepareWrapper()
  })

  it("has a navbar with buttons", function() {
    let navbar = this.wrapper.find("nav.my-navbar")
    expect(navbar.exists()).toBe(true)
    let buttons = navbar.findAll("router-link-stub")
    expect(buttons.at(0).text()).toEqual("Back")
  })
})
