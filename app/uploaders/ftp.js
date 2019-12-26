const ftp = require("basic-ftp")

import { currentSettings } from "../models/settings.js"

export class FtpUploader {
  constructor() {
    this._client = new ftp.Client()
    this.client.ftp.verbose = true
  }

  get client() {
    return this._client
  }

  async uploadFile(file) {
    await this.connect()
    await client.uploadFrom(file, "README_FTP.md")

    return {remoteUrl: ""}
  }

  connect() {
    if (!this._connected) {
      this._connected = this.client.access({
        host: currentSettings.data.uploader.ftp.server,
        user: currentSettings.data.uploader.ftp.user,
        password: "password",
      })
    }
    return this._connected
  }
}
