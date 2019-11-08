const _ = require("lodash")

import { currentSettings } from "../../app/models/settings.js"

global.stubCurrentSettings = function(overrides) {
  let fakeSettingsData = _.merge(
    {},
    currentSettings.data,
    overrides,
  )

  sinon.stub(currentSettings, "data").get(() => { return fakeSettingsData })
}
