import { currentSettings } from "../models/settings.js"

export const SettingsMixin = {
  data() {
    return {
      model: currentSettings.data,
    }
  },

  methods: {
    onConfigUpdated() {
      currentSettings.save()
    },
  }
}
