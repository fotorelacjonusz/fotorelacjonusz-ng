import { interpolateMagicWords } from "../../app/util/magic-words.js"

describe(".interpolateMagicWords()", function() {
  beforeEach(function() {
    let typicalWords = ["ONE", "TWO", "BLANK"]
    let typicalSubs = { ONE: 1, TWO: 2, BLANK: " " }

    this.callingHelper =
      function(template, words = typicalWords, substitutions = typicalSubs) {
        return interpolateMagicWords(template, words, substitutions)
      }
  })

  it("interpolates known words in given string", function() {
    let retval = this.callingHelper("- %ONE% - %TWO% -")
    expect(retval).toEqual("- 1 - 2 -")
  })

  it("returns unchanged template when it has no magic words", function() {
    let retval = this.callingHelper("no magic")
    expect(retval).toEqual("no magic")
  })

  it("ignores unknown magic words", function() {
    let retval = this.callingHelper("%NOMAGIC%", ["OTHER"], {NOMAGIC: "magic"})
    expect(retval).toEqual("%NOMAGIC%")
  })

  it("ignores malfored magic words", function() {
    let retval = this.callingHelper("ONE %ONE%TWO%")
    expect(retval).toEqual("ONE 1TWO%")
  })

  it("allows repeating magic words", function() {
    let retval = this.callingHelper("%ONE% %ONE%%ONE%")
    expect(retval).toEqual("1 11")
  })

  it("strips leading and trailing whitespace characters " +
    "from the resulting string", function() {
    let retval = this.callingHelper("  %ONE% %TWO%\n %BLANK% ")
    expect(retval).toEqual("1 2")
  })
})
