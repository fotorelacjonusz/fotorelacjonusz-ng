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

  describe("meta", function() {
    it("is a promise of object", async function() {
      let pic = new Picture
      let retval = pic.meta
      expect(retval).toBeInstanceOf(Promise)
      expect(await retval).toBeInstanceOf(Object)
    })

    describe("for JPEG image", function() {
      beforeEach(function() {
        this.file = factory.file("flower-192.jpg")
        this.picture = new Picture(this.file)
      })

      it("includes picture's EXIF data", async function() {
        let meta = await this.picture.meta
        expect(meta.exif).toBeDefined()
        expect(meta.exif).toBeInstanceOf(Object)
      })
    })

    describe("for PNG image", function() {
      beforeEach(function() {
        this.file = factory.file("flower-192.png")
        this.picture = new Picture(this.file)
      })

      it("does not break because of lack of EXIF data", async function() {
        let meta = await this.picture.meta
        expect(meta.exif).toBe(null)
      })
    })

    describe("for GIF image", function() {
      beforeEach(function() {
        this.file = factory.file("flower-192.gif")
        this.picture = new Picture(this.file)
      })

      it("does not break because of lack of EXIF data", async function() {
        let meta = await this.picture.meta
        expect(meta.exif).toBe(null)
      })
    })
  })
})
