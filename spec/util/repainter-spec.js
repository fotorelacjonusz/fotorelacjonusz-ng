const { fabric } = require("fabric")

import { repaint } from "../../app/util/repainter.js"

const flower50 = factory.file("spec/files/flower-50.jpg")
const flower1920 = factory.file("spec/files/flower-1920.jpg")


const url = require('url');

describe(".repaint()", function() {
  beforeEach(async function() {

    // url.fileURLToPath(url)
    this. imgURL = url.pathToFileURL("spec/files/flower-50.jpg")



    // this.img = await fabric.Image.fromURL("file://spec/files/flower-50.jpg")
    // this.img = sinon.createStubInstance(fabric.Image)
    // this.img = sinon.spy()
  })

  describe("for small picture", function() {
    // const img = flower50
    it("paints it unchanged", async function() {
      // const img = sinon.spy()
      let retval = await repaint(this.imgURL)
      expect(retval).toBeInstanceOf(fabric.Canvas)
      // let pic = new Picture(img)
       // pic.render()
      // expect(retval).toBeInstanceOfString()
    })
  })

  describe("for large picture", function() {
    // const img = flower1920
    it("scales it down and paints it", async function() {
      // const img = sinon.spy()
      let retval = await repaint(this.imgURL)
      expect(retval).toBeInstanceOf(fabric.Canvas)

      // let pic = new Picture(img)
      // let retval = await pic.render()
      // expect(retval).toBeInstanceOfString()
    })
  })
})
