import { BBCodeRenderer } from "../../app/renderers/bb-code.js"

describe("BBCode renderer", function() {
  it("is instantiable", function () {
    expect(new BBCodeRenderer).toBeInstanceOf(BBCodeRenderer)
  })

  describe(".toPosts()", function() {
    beforeEach(function() {
      let pic1 = factory.picture("pic1.jpg")
      let pic2 = factory.picture("pic2.jpg")
      let report = factory.report([pic1, pic2])

      this.renderer = new BBCodeRenderer(report)
    })

    it("returns an array of strings", function() {
      let retval = this.renderer.toPosts()
      expect(retval).toBeArrayOfStrings()
      expect(retval).toBeNonEmptyArray()
    })

    it("renders photos with their descriptions in posts", function() {
      // TODO picture descriptions
      // TODO images instead of file names
      let retval = this.renderer.toPosts()
      let body = retval[0]
      expect(body).toContain("1. pic1.jpg")
      expect(body).toContain("2. pic2.jpg")
    })

    it("renders photos in a correct order", function() {
      let retval = this.renderer.toPosts()
      let body = retval[0]
      expect(body).toMatch(/pic1.*pic2/s)
    })
  })
})
