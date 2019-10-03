import { BBCodeRenderer } from "../renderers/bb-code.js"

// TODO Signal progress with events.

export class PostingProcessor {
  constructor(report) {
    this._report = report
    this._renderer = new BBCodeRenderer(report)
    this._posts = []
    this._counter = 0
    this._progress = 0
  }

  get allPosts() { return this._posts }

  get currentPost() { return this.allPosts[this._counter] }

  get hasCompleted() { return this._counter === this.allPosts.length }

  get progress() { return this._progress }

  get report() { return this._report }

  prepare() {
    this._posts = this._renderer.toPosts()
  }

  step() {
    this._counter += 1
    this._progress = this._counter / this.allPosts.length
  }

  async uploadPictures() {
    console.info(`Started photo report upload.  ` +
      `It consists of ${this.report.length} pictures.`)

    for (let i = 0; i < this.report.pictures.length; i++) {
      let pic = this.report.pictures[0]
      pic.upload = await this._uploader.uploadFile(pic.originalFile)
      pic.remoteUrl = pic.upload.link
      this._progress.upload = i / this.report.pictures.length
    }
    console.info(`Done with photo report upload.`)
  }
}
