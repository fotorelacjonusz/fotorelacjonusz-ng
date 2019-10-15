import { Picture } from "../../app/models/picture.js"

const flower50 = factory.file("spec/files/flower-50.jpg")
const flower1920 = factory.file("spec/files/flower-1920.jpg")

describe("Picture model", function() {
  it("is instantiable", function () {
    expect(new Picture(flower50)).toBeInstanceOf(Picture)
  })
})
