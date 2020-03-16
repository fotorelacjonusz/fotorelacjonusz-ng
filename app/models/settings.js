const _ = require("lodash")
const fs = require("fs")
const path = require("path")

const { stripIndent } = require("common-tags")

import { Bookmark } from "./bookmark.js"
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

  addBookmarks(...bookmarks) {
    let bm_hashes = _.map(bookmarks, b => b.toHash())
    for (let h of bm_hashes) {
      this.data.bookmarks.push(h)
    }
    this.save()
  }

  deleteBookmarks(...bookmarks) {
    let bm_hashes = _.map(bookmarks, b => b.toHash())
    for (let h of bm_hashes) {
      _.remove(this.data.bookmarks, h)
    }
    this.save()
  }

  get configFilePath() {
    return path.join(nw.App.dataPath, "fotorelacjonusz.conf")
  }

  get watermarkPicturePath() {
    return path.join(nw.App.dataPath, "watermark-picture")
  }

  get bookmarksList() {
    //TODO sort
    //TODO reactive
    return _.map(this.data.bookmarks, (b) => new Bookmark(b))
  }

  get data() {
    return this._data
  }

  get defaultData() {
    return {
      bookmarks: [],
      format: {
        postTemplate: stripIndent`
          %NUMBER%. %DESCRIPTION%
          [img]%IMG_URL%[/img]
        `,
        picsMax: 10,
        picsMin: 1,
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
