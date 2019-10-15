import { repaint } from "../../app/util/repainter.js"

describe(".repaint()", function() {
  describe("for small picture", function() {
    const img = flower50
    it("returns it unchanged as blob", async function() {
      let pic = new Picture(img)
      let retval = await pic.render()
      expect(retval).toBaAString()
    })
  })

  describe("for large picture", function() {
    const img = flower1920
    it("scales it down and returns it as blob", async function() {
      let pic = new Picture(img)
      let retval = await pic.render()
      expect(retval).toBaAString()
    })
  })
})
