import { SettingsSection } from "../../app/components/settings-section.js"

const prepareWrapper = wrapperFactoryFactory(SettingsSection)

describe("SettingsSection component", function() {
  beforeEach(function() {
    this.wrapper = prepareWrapper({
      propsData: {title: "Section Title"},
      slots: {default: "<b>content</b>"},
    })
  })

  it("has a header element with prop-defined content", function() {
    let header = this.wrapper.find("h3")
    expect(header.exists()).toBe(true)
    expect(header.text()).toEqual("Section Title")
  })

  it("embeds slot content", function() {
    expect(this.wrapper.html()).toContain("<b>content</b>")
  })
})
