const got = require("got")
const FormData = require("form-data")
const fs = require("fs")

import {ImgurAnonUploader, IMGUR_CLIENT_ID} from "../uploaders/imgur-anon.js"

export { IMGUR_CLIENT_ID } from "./imgur-anon.js"

export class ImgurUserUploader extends ImgurAnonUploader {
  static get authURL() {
    const urlBase = "https://api.imgur.com/oauth2/authorize"
    const params = new URLSearchParams([
      ["client_id", IMGUR_CLIENT_ID],
      ["response_type", "token"],
    ])
    return [urlBase, params.toString()].join("?")
  }
}
