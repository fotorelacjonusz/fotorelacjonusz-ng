const fs = require("fs")
const Jimp = require("jimp")

import { currentSettings } from "../models/settings.js"
import { repaint } from "../util/repainter.js"
import * as uploaders from "../uploaders/all.js"

// TODO Signal progress with events.

export class UploadingProcessor {
  constructor(report) {
    this._report = report
    let uploaderConstructor = uploaders[currentSettings.data.uploader.current]
    this._uploader = new uploaderConstructor()
    this._done = false
    this._progress = 0
  }

  get hasCompleted() { return this._done }

  get progress() { return this._progress }

  async perform() {
    console.info(`Started photo report upload.  ` +
      `It consists of ${this._report.pictures.length} pictures.`)

    for (let i = 0; i < this._report.pictures.length; i++) {
      let pic = this._report.pictures[i]
      let fileName = pic.originalFile.name
      let buffer = await repaintFromFile(pic.originalFile)
      let picUpdates = await this._uploader.uploadFile(fileName, buffer)
      Object.assign(pic, picUpdates)
      console.log(`Uploaded picture ${pic.originalFile.name}`)
      this._progress = (i + 1) / this._report.pictures.length
    }

    this._done = true
    console.info(`Done with photo report upload.`)
  }
}

async function repaintFromFile(file) {
  const jimpImage = await Jimp.read(file.path)
  const repainted = repaint(jimpImage)
  return await repainted.getBufferAsync(Jimp.AUTO)
}
