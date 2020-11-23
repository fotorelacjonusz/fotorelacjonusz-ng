import { uuid4 } from "../../app/util/uuid.js"

describe(".uuid4()", function() {
  it("returns a UUIDv4 string", function() {
    const uuidPattern = "XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX"
    const uuidPatternRx = new RegExp(uuidPattern.
      replaceAll("X", "[0-9a-f]").
      replaceAll("Y", "[89ab]"))

    for (let attempt = 0; attempt < 1000; attempt++) {
      let retval = uuid4()
      expect(retval.length).toEqual(36)
      expect(retval).toMatch(uuidPatternRx)
    }
  })
})
