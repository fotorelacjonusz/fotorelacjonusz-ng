import { Picture } from "../../app/models/picture.js"
import { Report } from "../../app/models/report.js"

describe("Report model", function() {
  it("is instantiable", function () {
    expect(new Report).toBeInstanceOf(Report)
  })

  describe("when freshly created", function() {
    beforeEach(function() {
      this.report = new Report
    })

    it("contains no pictures", function() {
      expect(this.report.pictures).toBeEmptyArray()
    })
  })

  describe(".addPicture(file)", function() {
    it("instantiates a new Picture, and appends it to the report", function() {
      let report = new Report
      let pic1 = sinon.fake()
      let pic2 = sinon.fake()
      let file = sinon.fake()

      report._pictures = [pic1, pic2]

      report.addPicture(file)

      expect(report.pictures).toBeArrayOfSize(3)
      expect(report.pictures.slice(0, -1)).toEqual([pic1, pic2])

      let addedItem = report.pictures.slice(-1)[0]
      expect(addedItem).toBeInstanceOf(Picture)
      expect(addedItem.originalFile).toBe(file)
    })
  })
})
