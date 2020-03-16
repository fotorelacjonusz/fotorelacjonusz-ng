import { Bookmark } from "../../app/models/bookmark.js"

describe("Bookmark model", function() {
  it("is instantiable", function () {
    expect(new Bookmark()).toBeInstanceOf(Bookmark)
  })

  it("has caption", function () {
    let opts = {caption: "some caption"}
    let instance = new Bookmark(opts)
    expect(instance.caption).toEqual("some caption")
  })

  it("has URL", function () {
    let opts = {url: "http://example.test/something"}
    let instance = new Bookmark(opts)
    expect(instance.url).toEqual("http://example.test/something")
  })

  describe(".toHash", function() {
    it("returns a persistable hash representation of the object", function() {
      let opts = {some: "args"}
      let instance = new Bookmark(opts)
      expect(instance.toHash()).toEqual(opts)
    })
  })
})
