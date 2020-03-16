import { currentSettings } from "../models/settings.js"

export const SettingsMixin = {
  data() {
    return {
      currentSettings,
      model: currentSettings.data,
    }
  },

  methods: {
    onConfigUpdated() {
      currentSettings.save()
    },
  }
}
