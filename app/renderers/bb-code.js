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
      return `${startNum + idx}. ${pic.originalFile.name}`
    })

    return renderedPics.join("\n\n")
  }
}
