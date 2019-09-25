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
      let pic1 = factory.picture()
      let pic2 = factory.picture()
      let file = factory.file()
      let report = factory.report([pic1, pic2])

      report.addPicture(file)

      let addedItem = report.pictures[2]
      expect(report.pictures).toBeArrayOfSize(3)
      expect(report.pictures[0]).toBe(pic1)
      expect(report.pictures[1]).toBe(pic2)
      expect(addedItem).toBeInstanceOf(Picture)
      expect(addedItem.originalFile).toBe(file)
    })
  })
})
