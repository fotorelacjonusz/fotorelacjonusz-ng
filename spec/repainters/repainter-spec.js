import { Jimp } from "../../app/util/jimp.js"
import { repaint } from "../../app/repainters/repainter.js"
import * as Resizer from "../../app/repainters/resizer.js"
import * as Watermarker from "../../app/repainters/watermarker.js"

describe(".repaint()", function() {
  beforeEach(function() {
    sinon.stub(Resizer, "resize").returnsArg(0)
    sinon.stub(Watermarker, "watermark").returnsArg(0)
  })

  it("resizes pictures", async function() {
    let img = sinon.fake()
    let retval = await repaint(img)

    expect(Resizer.resize.calledOnceWith(img)).toBeTruthy()
  })

  it("adds a watermark", async function() {
    let img = sinon.fake()
    let retval = await repaint(img)

    expect(Watermarker.watermark.calledOnceWith(img)).toBeTruthy()
  })

  it("runs repainters in a correct order", async function() {
    let img = sinon.fake()
    let retval = await repaint(img)

    expect(Resizer.resize.calledBefore(Watermarker.watermark)).toBeTruthy()
  })
})
