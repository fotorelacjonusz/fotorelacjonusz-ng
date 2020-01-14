const uuid = require("uuid/v4")

import { readEXIF } from "../util/exif.js"

export class Picture {
  constructor(file) {
    this._id = uuid()
    this.originalFile = file
    this.text = ""

    this._meta = readMetaData(this)

    // Browser only.
    // This is avoiding execution in specs, that is an antipattern.
    // TODO Do something reasonable instead.
    if ("function" === typeof(URL.createObjectURL)) {
      this.displayUrl = URL.createObjectURL(file)
    }
  }

  get id() { return this._id }

  get meta() { return this._meta }
}

async function readMetaData(pic) {
  let exif = await readEXIF(pic.originalFile).catch((_err) => null)

  return { exif }
}
