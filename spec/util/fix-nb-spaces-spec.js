import { fixNBSpaces } from "../../app/util/fix-nb-spaces.js"

describe(".fixNBSpaces()", function() {
  const stringWithNBSpaces = "some\u00A0string with\u00A0spaces"
  const stringWithRegularSpaces = "some string with spaces"
  const stringWithTabs = "some\tstring with\ttabs"

  describe("when interface.fixNBSpaces setting is on", function() {
    beforeEach(function() {
      stubCurrentSettings({interface: {fixNBSpaces: true}})
    })

    it("converts no-break spaces to regular ones", function() {
      expect(fixNBSpaces(stringWithNBSpaces)).toEqual(stringWithRegularSpaces)
    })

    it("leaves regular spaces unchanged", function() {
      expect(fixNBSpaces(stringWithRegularSpaces)).
        toEqual(stringWithRegularSpaces)
    })

    it("leaves all the other types of spaces unchanged", function() {
      expect(fixNBSpaces(stringWithTabs)).toEqual(stringWithTabs)
    })
  })

  describe("when interface.fixNBSpaces setting is off", function() {
    beforeEach(function() {
      stubCurrentSettings({interface: {fixNBSpaces: false}})
    })

    it("leaves no-break spaces unchanged", function() {
      expect(fixNBSpaces(stringWithNBSpaces)).toEqual(stringWithNBSpaces)
    })

    it("leaves regular spaces unchanged", function() {
      expect(fixNBSpaces(stringWithRegularSpaces)).
        toEqual(stringWithRegularSpaces)
    })

    it("leaves all the other types of spaces unchanged", function() {
      expect(fixNBSpaces(stringWithTabs)).toEqual(stringWithTabs)
    })
  })
})
