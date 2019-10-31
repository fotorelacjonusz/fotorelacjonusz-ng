const _ = require("lodash")

import { Settings } from "../../app/models/settings.js"
import * as wholeModule from "../../app/models/settings.js"

describe("Settings model", function() {
  it("is instantiable", function () {
    expect(new Settings).toBeInstanceOf(Settings)
  })

  it("provides a singleton instance as currentSettings", function() {
    expect(wholeModule.currentSettings).toBeInstanceOf(Settings)
  })

  it("has 'data' attribute", function() {
    let settings = new Settings
    expect(settings.data).toBeDefined()
  })

  const requiredSettings = [
    "format.postTemplate",
  ]

  for (let settingName of requiredSettings) {
    it(`has '${settingName}' setting`, function() {
      let settings = new Settings
      expect(_.get(settings.data, settingName)).toBeDefined()
    })
  }

  describe(".interpolatePostTemplate()", function() {
    beforeEach(function() {
      this.callingHelper = function(template, substitutions) {
        let instance = new Settings
        instance.data.format.postTemplate = template
        return instance.interpolatePostTemplate(substitutions)
      }

      this.substitutions = {
        NUMBER: 7,
        DESCRIPTION: "interesting",
        IMG_URL: "https://example.test/pic",
      }
    })

    it("recognizes 'DESCRIPTION' magic word", function() {
      let retval = this.callingHelper("-%DESCRIPTION%", {DESCRIPTION: "a"})
      expect(retval).toEqual("-a")
    })

    it("recognizes 'NUMBER' magic word", function() {
      let retval = this.callingHelper("-%NUMBER%", {NUMBER: 1})
      expect(retval).toEqual("-1")
    })

    it("recognizes 'IMG_URL' magic word", function() {
      let retval = this.callingHelper("-%IMG_URL%", {IMG_URL: "url"})
      expect(retval).toEqual("-url")
    })
  })
})
