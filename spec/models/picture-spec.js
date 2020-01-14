import { Picture } from "../../app/models/picture.js"

describe("Picture model", function() {
  it("is instantiable", function () {
    expect(new Picture(factory.file())).toBeInstanceOf(Picture)
  })

  it("has unique id", function() {
    let pic1 = new Picture
    let pic2 = new Picture
    expect(pic1.id).not.toEqual(pic2)
  })

  describe(".originalFile", function() {
    it("stores a reference to a file passed to constructor", function() {
      let file = factory.file()
      let instance = new Picture(file)
      expect(instance.originalFile).toBe(file)
    })
  })
})
