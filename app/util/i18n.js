const _ = require("lodash")

export const availableLanguages = {
  en: "English",
  pl: "Polski",
}

export const defaultLanguage = "en"

export const translations = require("locale/translations.json")

export const gettextPluginConfig = {
  availableLanguages: availableLanguages,
  defaultLanguage: defaultLanguage,
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
