const _ = require("lodash")

import { Picture } from "./picture.js"
import { currentSettings } from "../models/settings.js"

export class Report {
  constructor() {
    this._pictures = []
    this.footer = ""
    this.header = ""
  }

  get isEmpty() { return this.pictures.length === 0 }

  get pictures() { return this._pictures }

  addPicture(file) {
    let pic = new Picture(file)
    this.pictures.push(pic)
    return pic
  }

  deletePicture(pic) {
    let all = this.pictures
    let index = all.indexOf(pic)
    if (index >= 0) {
      all.splice(index, 1)
    }
  }

  moveDown(pic) {
    let all = this.pictures
    let index = all.indexOf(pic)

    if (index >= 0 && index < all.length - 1) {
      swapItems(all, index, index + 1)
    }
  }

  moveToBottom(pic) {
    let all = this.pictures
    let index = all.indexOf(pic)

    if (index >= 0 && index < all.length - 1) {
      swapItems(all, index, all.length - 1)
    }
  }

  moveToTop(pic) {
    let all = this.pictures
    let index = all.indexOf(pic)

    if (index >= 1) {
      swapItems(all, index, 0)
    }
  }

  moveUp(pic) {
    let all = this.pictures
    let index = all.indexOf(pic)

    if (index >= 1) {
      swapItems(all, index, index - 1)
    }
  }

  sliced() {
    const sliceSize = currentSettings.data.format.picsMax
    const minimumSliceSize = currentSettings.data.format.picsMin

    let acc = []

    for (var i = 0; i < this.pictures.length; i += sliceSize) {
      let pictures = this.pictures.slice(i, i + sliceSize)
      acc.push({startIndex: i, pictures})
    }

    if (acc.length > 1 && _.nth(acc, -1).pictures.length < minimumSliceSize)
    {
      // Keep a few remaining photos with the last post.
      _.nth(acc, -2).pictures.push(... _.nth(acc, -1).pictures)
      acc.pop()
    }

    return acc
  }
}

// Due to Vue limitations, Array.splice is used.
// See: https://vuejs.org/v2/guide/list.html#Caveats
function swapItems(list, index1, index2) {
  let swapped = list[index1]
  list.splice(index1, 1)
  list.splice(index2, 0, swapped)
}
