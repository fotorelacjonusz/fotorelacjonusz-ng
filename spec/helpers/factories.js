import { Report } from "../../app/models/report.js"
import { Picture } from "../../app/models/picture.js"
import { PostingProcessor } from "../../app/processors/posting.js"

global.factory = {
  report: (pictures = []) => {
    let o = Object.create(Report.prototype)
    o._pictures = pictures
    o.header = "Some header"
    o.footer = "Some footer"
    return o
  },

  file: (name = factory.fileName(), type = "image/jpeg") => {
    let filePath = require("path").resolve( __dirname, "..", "resources", name)
    let o = {name, type, path: filePath}
    return o
  },

  fileName: () => "pic.jpg",

  picture: (name = factory.fileName()) => {
    let o = Object.create(Picture.prototype)
    o.originalFile = factory.file(name)
    o.text = `Description for ${name}.`
    return o
  },

  uploadedPicture: (name = factory.fileName()) => {
    let o = factory.picture(name)
    o.remoteUrl = `https://img.example.test/${name}`
    o.upload = {some: "data"}
    return o
  },

  postingProcessor: (posts = ["post 1", "post 2"]) => {
    let o = Object.create(PostingProcessor.prototype)
    o._counter = 0
    o._posts = posts
    return o
  }
}
