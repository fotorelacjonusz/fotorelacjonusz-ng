import { FilePicker } from "../../app/components/file-picker.js"

const prepareWrapper = wrapperFactoryFactory(FilePicker)

describe("FilePicker component", function() {
  beforeEach(function() {
    this.wrapper = prepareWrapper({
      propsData: {title: "Field Label"},
      slots: {default: "<b>content</b>"},
    })
  })

  it("renders a label element which says 'Add photos'", function() {
    let label = this.wrapper.find("label")
    expect(label.exists()).toBe(true)
    expect(label.text()).toEqual("Add photos")
  })

  it("contains a file input element", function() {
    let input = this.wrapper.find("label input[type=file]")
    expect(input.exists()).toBe(true)
    expect(input.attributes("accept")).toEqual("image/png, image/jpeg")
  })
})
