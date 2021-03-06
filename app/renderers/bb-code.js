import { currentSettings } from "../models/settings.js"

import { fixNBSpaces } from "../util/fix-nb-spaces.js"
import { programLinkHref, programLinkCaption } from "../util/program-link.js"

export class BBCodeRenderer {
  constructor(report) {
    this._report = report
  }

  get report() { return this._report }

  toPosts() {
    let slices = this.report.sliced()
    let reportStartNumber = currentSettings.data.format.startNumber

    return slices.map((s, idx) => {
      let isFirstSlice = (idx === 0)
      let isLastSlice = (idx === slices.length - 1)
      return this.renderPost(s.pictures, s.startIndex + reportStartNumber,
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
      renderedPics.push(currentSettings.data.footer.text.trim())
      renderedPics.push(linkToProgram())
    }

    let post = renderedPics.join("\n\n")

    return fixNBSpaces(post)
  }
}

function linkToProgram() {
  if (!currentSettings.data.footer.link) {
    return ""
  }

  let locale = currentSettings.data.footer.linkLanguage
  let href = programLinkHref(locale)
  let caption = programLinkCaption(locale)

  return `[URL="${href}"]${caption}[/URL]`
}
