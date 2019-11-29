const { stripIndent } = require("common-tags")

import { currentSettings } from "../models/settings.js"

import { fixNBSpaces } from "../util/fix-nb-spaces.js"

export class BBCodeRenderer {
  constructor(report) {
    this._report = report
  }

  get report() { return this._report }

  toPosts() {
    let slices = this.report.sliced()
    return slices.map((s) => this.renderPost(s.pictures, s.startIndex + 1))
  }

  renderPost(pics, startNum) {
    let renderedPics = pics.map((pic, idx) => {
      return currentSettings.interpolatePostTemplate({
        "DESCRIPTION": pic.text.trim(),
        "IMG_URL": pic.remoteUrl,
        "NUMBER": startNum + idx,
      })
    })

    let post = renderedPics.join("\n\n")

    return fixNBSpaces(post)
  }
}
