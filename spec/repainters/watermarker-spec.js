import { Jimp } from "../../app/util/jimp.js"
import { currentSettings } from "../../app/models/settings.js"

import { watermark } from "../../app/repainters/watermarker.js"

const purpleRGBA = 0xFF00FFFF
const purpleSize = 50

describe(".watermark()", function() {
  beforeEach(async function() {
    let flower192 = factory.file("flower-192.jpg")
    this.img = await Jimp.read(flower192.path)
    this.origImg = this.img.clone()
  })

  describe("when watermark is not enabled", function() {
    beforeEach(function() {
      stubCurrentSettings({processing: {
        watermark: {mode: "off"},
      }})
    })

    it("does not add a watermark", async function() {
      let repainted = await watermark(this.img)
      expect(repainted).toBeInstanceOf(Jimp)

      let width = repainted.bitmap.width
      let height = repainted.bitmap.height

      expect(repainted).
        not.toHavePixel(width - 1, height - 1, purpleRGBA)
      expect(repainted).
        not.toHavePixel(width - purpleSize, height - 1, purpleRGBA)
      expect(repainted).
        not.toHavePixel(width - 1, height - purpleSize, purpleRGBA)
      expect(repainted).
        not.toHavePixel(width - purpleSize, height - purpleSize, purpleRGBA)

      expect(repainted.bitmap).toEqual(this.origImg.bitmap)
    })
  })

  describe("when watermark is enabled", function() {
    beforeEach(function() {
      stubCurrentSettings({processing: {
        watermark: {mode: "picture"},
      }})

      let watermarkPath = factory.file("purple.png").path

      sinon.stub(currentSettings, "watermarkPicturePath").get(() => watermarkPath)
    })

    it("adds a watermark in bottom-right of the picture", async function() {
      let repainted = await watermark(this.img)
      expect(repainted).toBeInstanceOf(Jimp)

      let width = repainted.bitmap.width
      let height = repainted.bitmap.height

      expect(repainted).
        toHavePixel(width - 1, height - 1, purpleRGBA)
      expect(repainted).
        toHavePixel(width - purpleSize, height - 1, purpleRGBA)
      expect(repainted).
        toHavePixel(width - 1, height - purpleSize, purpleRGBA)
      expect(repainted).
        toHavePixel(width - purpleSize, height - purpleSize, purpleRGBA)
    })
  })

  describe("when watermark is enabled but file is missing", function() {
    beforeEach(function() {
      stubCurrentSettings({processing: {
        watermark: {mode: "picture"},
      }})

      let missingPath = factory.file("non-existing.png").path

      sinon.stub(currentSettings, "watermarkPicturePath").get(() => missingPath)
    })

    it("does not add a watermark", async function() {
      let repainted = await watermark(this.img)
      expect(repainted).toBeInstanceOf(Jimp)

      let width = repainted.bitmap.width
      let height = repainted.bitmap.height

      expect(repainted.bitmap).toEqual(this.origImg.bitmap)
    })
  })
})
