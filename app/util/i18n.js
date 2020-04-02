const path = require("path")

import { currentSettings } from "../models/settings.js"

export const availableLanguages = {
  en: "English",
  pl: "Polski",
}

export const defaultLanguage = "en"

// It appears that process.cwd() is a reliable way of obtaining application's
// root path, see: https://stackoverflow.com/a/29170113/304175
const translationsPath = path.join(process.cwd(), "locale/translations.json")
export const translations = require(translationsPath)

export const gettextPluginConfig = {
  availableLanguages: availableLanguages,
  defaultLanguage: currentSettings.data.interface.locale,
  languageVmMixin: {
    computed: {
      currentKebabCase: function () {
        return this.current.toLowerCase().replace("_", "-")
      },
    },
  },
  translations: translations,
  silent: true,
}
