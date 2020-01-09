import { PreparationWindow } from "../../app/components/preparation-window.js"

const prepareWrapper = wrapperFactoryFactory(PreparationWindow)

describe("PreparationWindow component", function() {
  it("renders some info about the report", function() {
    let wrapper = prepareWrapper()
    expect(wrapper.text()).toContain("About")
  })
})
