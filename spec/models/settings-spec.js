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
})
