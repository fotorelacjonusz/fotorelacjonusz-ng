import { Picture } from "../../app/models/picture.js"

describe("Picture model", function() {
  it("is instantiable", function () {
    expect(new Picture).toBeInstanceOf(Picture)
  })
})
