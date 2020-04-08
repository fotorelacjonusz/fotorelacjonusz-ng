import { programLinkCaption } from "../../app/util/program-link.js"
import { programLinkHref } from "../../app/util/program-link.js"

describe(".programLinkHref()", function() {
  it("returns an URL for English locale", function() {
    let retval = programLinkHref("en")
    expect(retval).toBeInstanceOf(String)
    expect(retval).toStartWith("https://")
  })

  it("returns an URL for Polish locale", function() {
    let retval = programLinkHref("pl")
    expect(retval).toBeInstanceOf(String)
    expect(retval).toStartWith("https://")
  })

  it("returns an URL for unsupported locale", function() {
    let retval = programLinkHref("unsupported")
    expect(retval).toBeInstanceOf(String)
    expect(retval).toStartWith("https://")
  })
})

describe(".programLinkCaption()", function() {
  it("returns a non-empty string for English locale", function() {
    let retval = programLinkCaption("en")
    expect(retval).toBeInstanceOf(String)
    expect(retval).toMatch(/\w/)
  })

  it("returns a non-empty string for Polish locale", function() {
    let retval = programLinkCaption("pl")
    expect(retval).toBeInstanceOf(String)
    expect(retval).toMatch(/\w/)
  })

  it("returns a non-empty string for unsupported locale", function() {
    let retval = programLinkCaption("unsupported")
    expect(retval).toBeInstanceOf(String)
    expect(retval).toMatch(/\w/)
  })
})
