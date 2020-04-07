import { Jimp } from "../../app/util/jimp.js"
import { currentSettings } from "../../app/models/settings.js"

import { frame } from "../../app/repainters/framer.js"

const blackRGBA = 0x000000FF

describe(".frame()", function() {
  beforeEach(async function() {
    let flower192 = factory.file("flower-192.jpg")
    this.img = await Jimp.read(flower192.path)
    this.origImg = this.img.clone()
  })

  describe("when frame is not enabled", function() {
    beforeEach(function() {
      stubCurrentSettings({processing: {
        frame: {enabled: false},
      }})
    })

    it("does not add a frame", async function() {
      let repainted = await frame(this.img)
      expect(repainted).toBeInstanceOf(Jimp)

      let width = repainted.bitmap.width
      let height = repainted.bitmap.height

      expect(repainted).
        not.toHavePixel(0, 0, blackRGBA)
      expect(repainted).
        not.toHavePixel(width - 1, 0, blackRGBA)
      expect(repainted).
        not.toHavePixel(0, height - 1, blackRGBA)
      expect(repainted).
        not.toHavePixel(width - 1, height - 1, blackRGBA)

      // expect(repainted.bitmap).toEqual(this.origImg.bitmap)
    })
  })

  describe("when frame is enabled", function() {
    beforeEach(function() {
      stubCurrentSettings({processing: {
        frame: {enabled: true},
      }})
    })

    it("adds a frame around the picture", async function() {
      let repainted = await frame(this.img)
      expect(repainted).toBeInstanceOf(Jimp)

      let width = repainted.bitmap.width
      let height = repainted.bitmap.height

      expect(repainted).
        toHavePixel(0, 0, blackRGBA)
      expect(repainted).
        toHavePixel(0, height - 1, blackRGBA)
      expect(repainted).
        toHavePixel(width - 1, 0, blackRGBA)
      expect(repainted).
        toHavePixel(width - 1, height - 1, blackRGBA)

      expect(repainted).
        toHavePixel(width / 2, 0, blackRGBA)
      expect(repainted).
        toHavePixel(0, height / 2, blackRGBA)
      expect(repainted).
        toHavePixel(width / 2, height - 1, blackRGBA)
      expect(repainted).
        toHavePixel(width - 1, height / 1, blackRGBA)
    })

    it("the added frame is 3px-thick", async function() {
      let repainted = await frame(this.img)
      expect(repainted).toBeInstanceOf(Jimp)

      let width = repainted.bitmap.width
      let height = repainted.bitmap.height

      expect(repainted).
        toHavePixel(100, 0, blackRGBA)
      expect(repainted).
        toHavePixel(100, 1, blackRGBA)
      expect(repainted).
        toHavePixel(100, 2, blackRGBA)
      expect(repainted).
        not.toHavePixel(100, 3, blackRGBA)

      expect(repainted).
        toHavePixel(100, height - 1, blackRGBA)
      expect(repainted).
        toHavePixel(100, height - 2, blackRGBA)
      expect(repainted).
        toHavePixel(100, height - 3, blackRGBA)
      expect(repainted).
        not.toHavePixel(100, height - 4, blackRGBA)

      expect(repainted).
        toHavePixel(0, 100, blackRGBA)
      expect(repainted).
        toHavePixel(1, 100, blackRGBA)
      expect(repainted).
        toHavePixel(2, 100, blackRGBA)
      expect(repainted).
        not.toHavePixel(3, 100, blackRGBA)

      expect(repainted).
        toHavePixel(width - 1, 100, blackRGBA)
      expect(repainted).
        toHavePixel(width - 2, 100, blackRGBA)
      expect(repainted).
        toHavePixel(width - 3, 100, blackRGBA)
      expect(repainted).
        not.toHavePixel(width - 4, 100, blackRGBA)
    })
  })
})
