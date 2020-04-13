import { Jimp } from "../../app/util/jimp.js"
import { autorotate } from "../../app/repainters/exif-rotater.js"

describe(".autorotate()", function() {
  beforeEach(async function() {
    this.normalImg = await imageWithOrientation(1)
  })

  for (let orientation = 1; orientation <= 8; orientation++) {
    describe(`for picture with EXIF orientation = ${orientation}`, function() {
      beforeEach(async function() {
        this.img = await imageWithOrientation(orientation)
      })

      it("rotates bitmap according to EXIF data", async function() {
        let processed = await autorotate(this.img)
        expect(processed.getWidth()).toEqual(this.normalImg.getWidth())
        expect(processed.getHeight()).toEqual(this.normalImg.getHeight())
        expect(Jimp.distance(this.normalImg, processed)).toBeLessThan(0.05)
      })
    })
  }
})

function imageWithOrientation(orientation) {
  let path = factory.file(`lady-orientation-${orientation}.jpg`).path
  return Jimp.read(path)
}
