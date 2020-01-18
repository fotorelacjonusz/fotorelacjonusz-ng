const _ = require("lodash")
const fs = require("fs")

import { Settings } from "../../app/models/settings.js"
import * as wholeModule from "../../app/models/settings.js"

describe("Settings model", function() {
  beforeEach(function() {
    let exampleJSON = `{"some": {"nested": "data"}}`
    sinon.stub(fs, "readFileSync").returns(exampleJSON)
    sinon.stub(fs, "writeFileSync")
    sinon.stub(Settings.prototype, "configFilePath").get(() => "some/path")
  })

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
    "format.postTemplate", "format.picsMax", "format.picsMin"
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

  it("loads configuration file on instantiation", function() {
    fs.readFileSync.restore()
    sinon.mock(fs).expects("readFileSync").once().withArgs("some/path")
    new Settings
  })

  describe(".load()", function() {
    beforeEach(function() {
      this.instance = new Settings
    })

    it("loads from a configuration file", function() {
      fs.readFileSync.restore()
      sinon.mock(fs).expects("readFileSync").once().withArgs("some/path")
      this.instance.load()
    })

    it("mixes default settings with file contents", function() {
      sinon.stub(this.instance, "defaultData").
        get(() => { return {some: {defaultData: true}} })
      this.instance.load()
      expect(this.instance.data.some.nested).toEqual("data")
      expect(this.instance.data.some.defaultData).toBe(true)
    })
  })

  describe(".save()", function() {
    beforeEach(function() {
      this.instance = new Settings
    })

    it("dumps serialized settings to a configuration file", function() {
      fs.writeFileSync.restore()
      sinon.mock(fs).expects("writeFileSync").
        once().
        withArgs("some/path", `{"serialize":1}`)
      this.instance._data = {"serialize": 1}
      this.instance.save()
    })
  })
})
