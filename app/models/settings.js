const { stripIndent } = require("common-tags")

export class Settings {
  constructor() {
    this.init()
  }

  init() {
    this._data = this.defaultData
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
