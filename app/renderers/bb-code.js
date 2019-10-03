const { stripIndent } = require("common-tags")

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
      return stripIndent`
        ${startNum + idx}. ${pic.text.trim()}
        [img]${pic.remoteUrl}[/img]
      `
    })

    return renderedPics.join("\n\n")
  }
}
