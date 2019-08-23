import { Picture } from "./picture.js"

export class Report {
  constructor() {
    this._pictures = []
  }

  get pictures() { return this._pictures }

  addPicture(file) {
    let pic = new Picture(file)
    this.pictures.push(pic)
    return pic
  }
}
