const Vue = require("vue/dist/vue.common.js")

import { currentSettings } from "../models/settings.js"

export const SettingsMixin = {
  computed: {
    model() { return currentSettings.data },
  },

  methods: {
    onConfigUpdated() {
      currentSettings.save()
      this.$forceUpdate()
    },
  }
}
