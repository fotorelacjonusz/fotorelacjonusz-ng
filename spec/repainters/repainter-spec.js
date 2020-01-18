const Jimp = require("jimp")

import { repaint } from "../../app/repainters/repainter.js"
import * as Resizer from "../../app/repainters/resizer.js"

describe(".repaint()", function() {
  beforeEach(function() {
    sinon.stub(Resizer, "resize").returnsArg(0)
  })

  it("resizes pictures", function() {
    let img = sinon.fake()
    let retval = repaint(img)

    expect(Resizer.resize.calledOnceWith(img)).toBeTruthy()
  })
})
