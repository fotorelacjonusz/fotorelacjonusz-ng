import { SettingsWindow } from "../../app/components/settings-window.js"

const prepareWrapper = wrapperFactoryFactory(SettingsWindow)

describe("SettingsWindow component", function() {
  beforeEach(function() {
    this.wrapper = prepareWrapper()
  })

  it("has a navbar with buttons", function() {
    let navbar = this.wrapper.find("nav.my-navbar")
    expect(navbar.exists()).toBe(true)
    let buttons = navbar.findAll("router-link-stub")
    expect(buttons.at(0).text()).toEqual("Back")
  })

  it("has some inputs, selects, and textareas", function() {
    expect(this.wrapper.find("input").exists()).toBe(true)
    expect(this.wrapper.find("select").exists()).toBe(true)
    expect(this.wrapper.find("select > option").exists()).toBe(true)
    expect(this.wrapper.find("textarea").exists()).toBe(true)
  })
})
