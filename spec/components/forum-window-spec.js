import { ForumWindow } from "../../app/components/forum-window.js"

const prepareWrapper = wrapperFactoryFactory(ForumWindow)

describe("ForumWindow component", function() {
  beforeEach(function() {
    this.wrapper = prepareWrapper()
  })

  it("has a navbar with buttons", function() {
    let navbar = this.wrapper.find("nav.my-navbar")
    expect(navbar.exists()).toBe(true)
    let buttons = navbar.findAll("router-link-stub")
    expect(buttons.at(0).text()).toEqual("Back")
  })

  it("has a webview element", function() {
    let webview = this.wrapper.find("webview")
    expect(webview.exists()).toBe(true)
  })
})
