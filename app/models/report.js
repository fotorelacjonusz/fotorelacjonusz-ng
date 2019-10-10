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
}

// Due to Vue limitations, Array.splice is used.
// See: https://vuejs.org/v2/guide/list.html#Caveats
function swapItems(list, index1, index2) {
  let swapped = list[index1]
  list.splice(index1, 1)
  list.splice(index2, 0, swapped)
}
