import { translations } from "./i18n.js"

// Ugly hack to have it translated with Vue-Gettext.
const taggedCaption = "<translate>Photo report posted with a tool.</translate>"
const caption = taggedCaption.replace(/<\/?translate>/g, "")

export function programLinkHref(locale) {
  switch(locale) {
    case "pl":
      return "https://fotorelacjonusz.github.io/pl"
    default:
      return "https://fotorelacjonusz.github.io"
  }

}

export function programLinkCaption(locale) {
  return translations[locale] && translations[locale][caption] || caption
}
