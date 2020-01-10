import { Picture } from "../../app/models/picture.js"

describe("Picture model", function() {
  it("is instantiable", function () {
    expect(new Picture).toBeInstanceOf(Picture)
  })

  it("has unique id", function() {
    let pic1 = new Picture
    let pic2 = new Picture
    expect(pic1.id).not.toEqual(pic2)
  })
})
