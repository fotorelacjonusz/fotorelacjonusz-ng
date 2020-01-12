import { readEXIF } from "../../app/util/exif.js"

describe(".readEXIF()", function() {
  it("asynchronously reads EXIF data from a JPEG image", async function() {
    let file = factory.file("lady-orientation-5.jpg")
    let exif = await readEXIF(file)
    expect(exif).toBeInstanceOf(Object)
    expect(exif.image.Orientation).toEqual(5)
  })

  it("returns rejected promise for a GIF image", function() {
    let file = factory.file("flower-192.gif")
    expectAsync(readEXIF(file)).toBeRejectedWithError("image is not a JPEG")
  })

  it("returns rejected promise for a PNG image", function() {
    let file = factory.file("flower-192.png")
    expectAsync(readEXIF(file)).toBeRejectedWithError("image is not a JPEG")
  })
})
