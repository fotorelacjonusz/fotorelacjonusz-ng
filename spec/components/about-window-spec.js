import { AboutWindow } from "../../app/components/about-window.js"

const prepareWrapper = wrapperFactoryFactory(AboutWindow)

describe("AboutWindow component", function() {
  it("renders some info page about the program", function() {
    let wrapper = prepareWrapper()
    expect(wrapper.text()).toContain("About")
  })

  it("has a navbar with buttons", function() {
    let wrapper = prepareWrapper()
    let navbar = wrapper.find("nav.my-navbar")
    expect(navbar.exists()).toBe(true)
    let buttons = navbar.findAll("router-link-stub")
    expect(buttons.at(0).text()).toEqual("Back")
  })
})
