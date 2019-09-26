const stripIndent = require("common-tags").stripIndent

export class BBCodeRenderer {
  constructor(report) {
    this._report = report
  }

  get report() { return this._report }

  toPosts() {
    return [this.renderPost(this.report.pictures, 1)]
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
