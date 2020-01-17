import { currentSettings } from "../models/settings.js"

import { fixNBSpaces } from "../util/fix-nb-spaces.js"

export class BBCodeRenderer {
  constructor(report) {
    this._report = report
  }

  get report() { return this._report }

  toPosts() {
    let slices = this.report.sliced()
    return slices.map((s, idx) => {
      let isFirstSlice = (idx === 0)
      let isLastSlice = (idx === slices.length - 1)
      return this.renderPost(s.pictures, s.startIndex + 1,
        isFirstSlice, isLastSlice)
    })
  }

  renderPost(pics, startNum, isFirstSlice, isLastSlice) {
    let renderedPics = pics.map((pic, idx) => {
      return currentSettings.interpolatePostTemplate({
        "DESCRIPTION": pic.text.trim(),
        "IMG_URL": pic.remoteUrl,
        "NUMBER": startNum + idx,
      })
    })

    if (isFirstSlice) {
      renderedPics.unshift(this.report.header.trim())
    }

    if (isLastSlice) {
      renderedPics.push(this.report.footer.trim())
    }

    let post = renderedPics.join("\n\n")

    return fixNBSpaces(post)
  }
}
