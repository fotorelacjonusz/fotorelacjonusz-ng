import { currentSettings } from "../models/settings.js"

export const availableLanguages = {
  en: "English",
  pl: "Polski",
}

export const defaultLanguage = "en"

export const translations = require("locale/translations.json")

export const gettextPluginConfig = {
  availableLanguages: availableLanguages,
  defaultLanguage: currentSettings.data.interface.locale,
  languageVmMixin: {
    computed: {
      currentKebabCase: function () {
        return this.current.toLowerCase().replace('_', '-')
      },
    },
  },
  translations: translations,
  silent: true,
}
