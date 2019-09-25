import { Report } from "../../app/models/report.js"
import { Picture } from "../../app/models/picture.js"
import { PostingProcessor } from "../../app/processors/posting.js"

global.factory = {
  report: (pictures = []) => {
    let o = Object.create(Report.prototype)
    o._pictures = pictures
    return o
  },

  file: (name = factory.fileName()) => {
    let o = {name}
    return o
  },

  fileName: () => "pic.jpg",

  picture: (name = factory.fileName()) => {
    let o = Object.create(Picture.prototype)
    o.originalFile = factory.file(name)
    return o
  },

  postingProcessor: (posts = ["post 1", "post 2"]) => {
    let o = Object.create(PostingProcessor.prototype)
    o._counter = 0
    o._posts = posts
    return o
  }
}
