const _ = require("lodash")
const got = require("got")
const FormData = require("form-data")

const IMGUR_BASE_URL = "https://api.imgur.com/3"
const IMGUR_CLIENT_ID = "8de2eccb47ccc43"

const DEFAULT_REQUEST_OPTIONS = {
  baseUrl: IMGUR_BASE_URL,
  headers: {
    authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
  },
}

export class ImgurAnonUploader {
  async uploadFile(fileName, buffer) {
    let form = this.buildUploadForm(fileName, buffer)

    console.log(`Uploading "${file.name}" via ${this.constructor.name}`)
    let parsedResponse = await postForm("Photo upload", "/image", form)
    console.log(`Uploaded successfully as ${parsedResponse.data.id}.`)

    return {remoteUrl: parsedResponse.data.link, upload: parsedResponse.data}
  }

  buildUploadForm(fileName, buffer) {
    let form = new FormData()
    form.append("type", "file")
    form.append("image", buffer, {filename: fileName})
    return form
  }
}

async function postForm(description, path, form) {
  let response = null
  let parsedResponse = null

  try {
    response = await doRequest("POST", path, {body: form})
  } catch (error) {
    console.error(`${description} went wrong with error: ${error}`)
    return null
  }

  try {
    parsedResponse = JSON.parse(response.body)
  } catch (error) {
    parsedResponse = {}
  }

  if (!parsedResponse.success) {
    console.error(`
      ${description} went wrong.  Server has responded unexpectedly with:
      ${response.body}
    `)
    return null
  }

  return parsedResponse
}

function doRequest(method, path, options) {
  let mergedOptions = _.merge({}, DEFAULT_REQUEST_OPTIONS, options, {method})
  return got(path, mergedOptions)
}
