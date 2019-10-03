const got = require("got")
const FormData = require("form-data")
const fs = require("fs")

const IMGUR_BASE_URL = "https://api.imgur.com/3"
const IMGUR_CLIENT_ID = "8de2eccb47ccc43"

export class ImgurAnonUploader {
  async uploadFile(file) {
    let buffer = fs.readFileSync(file.path)
    let form = this.buildUploadForm(buffer)
    var response
    try {
      console.log(`Uploading "${file.name}" via ${this.constructor.name}`)
      response = await this.makeUploadRequest(form)
    } catch (error) {
      console.error(error)
      return null
    }
    let parsedResponse = JSON.parse(response.body)
    if (!parsedResponse.success) {
      console.error(`Upload went wrong.  Actual response was: ${response.body}`)
      return null
    }
    console.log(`Uploaded successfully as ${parsedResponse.data.id}.`)

    return {remoteUrl: parsedResponse.data.link, upload: parsedResponse.data}
  }

  buildUploadForm(blob) {
    let form = new FormData()
    form.append("type", "file")
    form.append("image", blob)
    return form
  }

  makeUploadRequest(form) {
    return got.post("/image", {
      baseUrl: IMGUR_BASE_URL,
      body: form,
      headers: {
        authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
    })
  }
}
