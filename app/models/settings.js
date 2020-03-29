const _ = require("lodash")
const fs = require("fs")
const path = require("path")

const { stripIndent } = require("common-tags")

import { interpolateMagicWords } from "../util/magic-words.js"

export class Settings {
  constructor() {
    this.init()
    this.load()
  }

  init() {
    this._data = this.defaultData
  }

  interpolatePostTemplate(substitutions) {
    const magicWords = ["NUMBER", "DESCRIPTION", "IMG_URL"]
    const template = this.data.format.postTemplate
    return interpolateMagicWords(template, magicWords, substitutions)
  }

  load() {
    console.log(`Loading settings from file ${this.configFilePath}`)
    try {
      let raw = fs.readFileSync(this.configFilePath, "utf8")
      this._data = _.merge(this.defaultData, JSON.parse(raw))
    } catch(_err) {
      console.info(`Could not load settings from file ${this.configFilePath}`)
    }
  }

  save() {
    console.log(`Saving settings to file ${this.configFilePath}`)
    let raw = JSON.stringify(this.data)
    fs.writeFileSync(this.configFilePath, raw, "utf8")
  }

  setWatermarkPicture(filePath) {
    console.log(`Saving new watermark file to ${this.watermarkPicturePath}`)
    fs.copyFileSync(filePath, this.watermarkPicturePath)
  }

  get configFilePath() {
    return path.join(nw.App.dataPath, "fotorelacjonusz.conf")
  }

  get watermarkPicturePath() {
    return path.join(nw.App.dataPath, "watermark-picture")
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
        picsMax: 10,
        picsMin: 1,
        startNumber: 1,
      },
      interface: {
        fixNBSpaces: false,
        locale: "en",
      },
      processing: {
        resize: {
          mode: "never",
          width: 1000,
          height: 1000,
        },
        watermark: {
          mode: "off",
        },
      },
    }
  }
}

export const currentSettings = new Settings()
