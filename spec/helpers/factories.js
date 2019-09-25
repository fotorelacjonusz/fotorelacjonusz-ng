import { Report } from "../../app/models/report.js"
import { Picture } from "../../app/models/picture.js"

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
}
