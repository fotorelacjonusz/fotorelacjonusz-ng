const needle = require("needle")

import { tryManyTimes } from "../util/try-many-times.js"

const IMGUR_BASE_URL = "https://api.imgur.com/3"
const IMGUR_CLIENT_ID = "8de2eccb47ccc43"

export class ImgurAnonUploader {
  async uploadFile(fileName, buffer) {
    let parsedResponse = await tryManyTimes(
      4,
      () => this.tryUploadFile(fileName, buffer),
    )

    return {remoteUrl: parsedResponse.data.link, upload: parsedResponse.data}
  }

  async tryUploadFile(fileName, buffer) {
    let form = this.buildUploadForm(fileName, buffer)
    var response
    try {
      console.log(`Uploading "${fileName}" via ${this.constructor.name}`)
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

    return parsedResponse
  }

  /// In a format understandable to Needle.
  /// https://www.npmjs.com/package/needle#multipart-post-passing-data-buffer
  buildUploadForm(fileName, buffer) {
    return {
      type: "file",
      image: {
        buffer,
        filename: fileName,
        content_type: "application/octet-stream",
      },
    }
  }

  makeUploadRequest(form) {
    return needle(
      "post",
      `${IMGUR_BASE_URL}/image`,
      form,
      {
        headers: {
          authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        multipart: true,
        parse_response: false, // I prefer to parse it manually.
      },
    )
  }
}
