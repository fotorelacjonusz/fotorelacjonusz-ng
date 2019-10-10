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

  describe(".deletePicture(file)", function() {
    it("deletes given picture from the report", function() {
      let [pic1, pic2, pic3, pic4, pic5] =
        new Array(5).fill().map(() => factory.picture())

      let report = factory.report([pic1, pic2, pic3, pic4, pic5])
      report.deletePicture(pic2)
      expect(report.pictures).toEqual([pic1, pic3, pic4, pic5])
      report.deletePicture(pic5)
      expect(report.pictures).toEqual([pic1, pic3, pic4])
      report.deletePicture(pic1)
      expect(report.pictures).toEqual([pic3, pic4])
    })

    it("does nothing if given picture does not belong to the report", function() {
      let pic1 = factory.picture()
      let pic2 = factory.picture()
      let pic3 = factory.picture()
      let report = factory.report([pic1, pic2])
      report.deletePicture(pic3)
      expect(report.pictures).toEqual([pic1, pic2])
    })
  })

  describe(".moveDown(file)", function() {
    it("swaps given picture with its next sibling in the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())

      let report = factory.report([pic1, pic2, pic3])

      report.moveDown(pic1)
      expect(report.pictures).toEqual([pic2, pic1, pic3])
      report.moveDown(pic1)
      expect(report.pictures).toEqual([pic2, pic3, pic1])
      report.moveDown(pic2)
      expect(report.pictures).toEqual([pic3, pic2, pic1])
    })

    it("does nothing if given picture does not belong to the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())
      let report = factory.report([pic1, pic2, pic3])
      let other = factory.picture()
      report.moveDown(other)
      expect(report.pictures).toEqual([pic1, pic2, pic3])
    })

    it("does nothing if given picture is already the last picture in the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())
      let report = factory.report([pic1, pic2, pic3])
      report.moveDown(pic3)
      expect(report.pictures).toEqual([pic1, pic2, pic3])
    })
  })

  describe(".moveUp(file)", function() {
    it("swaps given picture with its preceding sibling in the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())

      let report = factory.report([pic1, pic2, pic3])

      report.moveUp(pic3)
      expect(report.pictures).toEqual([pic1, pic3, pic2])
      report.moveUp(pic3)
      expect(report.pictures).toEqual([pic3, pic1, pic2])
      report.moveUp(pic1)
      expect(report.pictures).toEqual([pic1, pic3, pic2])
    })

    it("does nothing if given picture does not belong to the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())
      let report = factory.report([pic1, pic2, pic3])
      let other = factory.picture()
      report.moveUp(other)
      expect(report.pictures).toEqual([pic1, pic2, pic3])
    })

    it("does nothing if given picture is already the first picture in the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())
      let report = factory.report([pic1, pic2, pic3])
      report.moveUp(pic1)
      expect(report.pictures).toEqual([pic1, pic2, pic3])
    })
  })

  describe(".moveToBottom(file)", function() {
    it("moves given picture to the end of the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())

      let report = factory.report([pic1, pic2, pic3])

      report.moveToBottom(pic2)
      expect(report.pictures).toEqual([pic1, pic3, pic2])
      report.moveToBottom(pic1)
      expect(report.pictures).toEqual([pic3, pic2, pic1])
      report.moveToBottom(pic3)
      expect(report.pictures).toEqual([pic2, pic1, pic3])
    })

    it("does nothing if given picture does not belong to the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())
      let report = factory.report([pic1, pic2, pic3])
      let other = factory.picture()
      report.moveToBottom(other)
      expect(report.pictures).toEqual([pic1, pic2, pic3])
    })

    it("does nothing if given picture is already the last picture in the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())
      let report = factory.report([pic1, pic2, pic3])
      report.moveToBottom(pic3)
      expect(report.pictures).toEqual([pic1, pic2, pic3])
    })
  })

  describe(".moveToTop(file)", function() {
    it("moves given picture to the begining of the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())

      let report = factory.report([pic1, pic2, pic3])

      report.moveToTop(pic2)
      expect(report.pictures).toEqual([pic2, pic1, pic3])
      report.moveToTop(pic3)
      expect(report.pictures).toEqual([pic3, pic2, pic1])
      report.moveToTop(pic1)
      expect(report.pictures).toEqual([pic1, pic3, pic2])
    })

    it("does nothing if given picture does not belong to the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())
      let report = factory.report([pic1, pic2, pic3])
      let other = factory.picture()
      report.moveToTop(other)
      expect(report.pictures).toEqual([pic1, pic2, pic3])
    })

    it("does nothing if given picture is already the first picture in the report", function() {
      let [pic1, pic2, pic3] =
        new Array(3).fill().map(() => factory.picture())
      let report = factory.report([pic1, pic2, pic3])
      report.moveToTop(pic1)
      expect(report.pictures).toEqual([pic1, pic2, pic3])
    })
  })
})
