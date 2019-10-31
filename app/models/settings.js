const { stripIndent } = require("common-tags")

import { interpolateMagicWords } from "../util/magic-words.js"

export class Settings {
  constructor() {
    this.init()
  }

  init() {
    this._data = this.defaultData
  }

  interpolatePostTemplate(substitutions) {
    const magicWords = ["NUMBER", "DESCRIPTION", "IMG_URL"]
    const template = this.data.format.postTemplate
    return interpolateMagicWords(template, magicWords, substitutions)
  }

  get configFilePath() {
    return path.join(nw.App.dataPath, "fotorelacjonusz.conf")
  }

  get data() {
    return this._data
  }

  get defaultData() {
    return {
      format: {
        postTemplate: stripIndent`
          %NUMBER%. %DESCRIPTION%
          [img]%IMG_URL%[/img]
        `,
      },
    }
  }
}

export const currentSettings = new Settings()
