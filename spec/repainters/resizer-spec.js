import { Jimp } from "../../app/util/jimp.js"
import { resize } from "../../app/repainters/resizer.js"

describe(".resize()", function() {
  beforeEach(async function() {
    let flower192 = factory.file("flower-192.jpg")
    this.img = await Jimp.read(flower192.path)
    this.origImg = this.img.clone()
  })

  describe("when resizing is not enabled", function() {
    beforeEach(function() {
      stubCurrentSettings({processing: {resize: {mode: "never"}}})
    })

    it("keeps large images unchanged", async function() {
      stubCurrentSettings({processing: {resize: {width: 100, height: 100}}})
      let repainted = await resize(this.img)
      expect(repainted).toBeInstanceOf(Jimp)
      expect(repainted.bitmap.width).toEqual(this.origImg.bitmap.width)
      expect(repainted.bitmap.height).toEqual(this.origImg.bitmap.height)
    })

    it("keeps small images unchanged", async function() {
      stubCurrentSettings({processing: {resize: {width: 1000, height: 1000}}})
      let repainted = await resize(this.img)
      expect(repainted).toBeInstanceOf(Jimp)
      expect(repainted.bitmap.width).toEqual(this.origImg.bitmap.width)
      expect(repainted.bitmap.height).toEqual(this.origImg.bitmap.height)
    })
  })

  describe("when resizing is enabled", function() {
    beforeEach(function() {
      stubCurrentSettings({processing: {resize: {mode: "normal"}}})
    })

    it("scales down image which is too wide", async function() {
      stubCurrentSettings({processing: {resize: {width: 100, height: 1000}}})
      let repainted = await resize(this.img)
      expect(repainted).toBeInstanceOf(Jimp)
      expect(repainted.bitmap.width).toEqual(100)
      expect(calculateRatio(repainted)).toBeCloseTo(calculateRatio(this.origImg))
    })

    it("scales down image which is too tall", async function() {
      stubCurrentSettings({processing: {resize: {width: 1000, height: 100}}})
      let repainted = await resize(this.img)
      expect(repainted).toBeInstanceOf(Jimp)
      expect(repainted.bitmap.height).toEqual(100)
      expect(calculateRatio(repainted)).toBeCloseTo(calculateRatio(this.origImg))
    })

    it("scales down image which is both too wide and too tall", async function() {
      stubCurrentSettings({processing: {resize: {width: 100, height: 100}}})
      let repainted = await resize(this.img)
      expect(repainted).toBeInstanceOf(Jimp)
      expect(repainted.bitmap.width).toEqual(100)
      expect(calculateRatio(repainted)).toBeCloseTo(calculateRatio(this.origImg))
    })

    it("keeps smaller images unchanged", async function() {
      stubCurrentSettings({processing: {resize: {width: 1000, height: 1000}}})
      let repainted = await resize(this.img)
      expect(repainted).toBeInstanceOf(Jimp)
      expect(repainted.bitmap.width).toEqual(this.origImg.bitmap.width)
      expect(repainted.bitmap.height).toEqual(this.origImg.bitmap.height)
    })
  })
})

function calculateRatio(jimpImage) {
  return jimpImage.bitmap.width / jimpImage.bitmap.height
}
