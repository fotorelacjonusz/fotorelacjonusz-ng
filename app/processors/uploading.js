import { ImgurAnonUploader } from "../uploaders/imgur-anon.js"

// TODO Signal progress with events.

export class UploadingProcessor {
  constructor(report) {
    this._report = report
    this._uploader = new ImgurAnonUploader()
    this._done = false
  }

  get hasCompleted() { return this._done }

  async perform() {
    console.info(`Started photo report upload.  ` +
      `It consists of ${this._report.pictures.length} pictures.`)

    for (let i = 0; i < this._report.pictures.length; i++) {
      let pic = this._report.pictures[i]
      let picUpdates = await this._uploader.uploadFile(pic.originalFile)
      Object.assign(pic, picUpdates)
      console.log(`Uploaded picture ${pic.originalFile.name}`)
    }

    this._done = true
    console.info(`Done with photo report upload.`)
  }
}
