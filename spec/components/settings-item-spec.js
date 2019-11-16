import { SettingsItem } from "../../app/components/settings-item.js"

const prepareWrapper = wrapperFactoryFactory(SettingsItem)

describe("SettingsItem component", function() {
  beforeEach(function() {
    this.wrapper = prepareWrapper({
      propsData: {title: "Field Label"},
      slots: {default: "<b>content</b>"},
    })
  })

  it("has a label element with prop-defined content", function() {
    let label = this.wrapper.find(".field-label label")
    expect(label.exists()).toBe(true)
    expect(label.text()).toEqual("Field Label")
  })

  it("embeds slot content", function() {
    let bodyWrapper = this.wrapper.find(".field-body")
    expect(bodyWrapper.html()).toContain("<b>content</b>")
  })
})
