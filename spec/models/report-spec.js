import { Picture } from "../../app/models/picture.js"
import { Report } from "../../app/models/report.js"
import { currentSettings } from "../../app/models/settings.js"

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

  describe(".sliced()", function() {
    it("returns an empty array for an empty report", function() {
      let report = factory.report([])

      let retval = report.sliced()
      expect(retval).toBeEmptyArray()
    })

    it("returns an array of slice objects, each containing up to 10 elements", function() {
      let pics = new Array(25).fill().map(() => factory.picture())
      let report = factory.report(pics)

      let retval = report.sliced()
      expect(retval).toBeArrayOfSize(3)
      expect(retval[0].startIndex).toEqual(0)
      expect(retval[0].pictures).toEqual(pics.slice(0, 10))
      expect(retval[1].startIndex).toEqual(10)
      expect(retval[1].pictures).toEqual(pics.slice(10, 20))
      expect(retval[2].startIndex).toEqual(20)
      expect(retval[2].pictures).toEqual(pics.slice(20, 25))
    })

    it("makes the last slice longer instead of creating another slice of too few elements", function() {
      stubCurrentSettings({format: {picsMin: 3, picsMax: 10}})

      let pics = new Array(22).fill().map(() => factory.picture())
      let report = factory.report(pics)

      let retval = report.sliced()
      expect(retval).toBeArrayOfSize(2)
      expect(retval[0].startIndex).toEqual(0)
      expect(retval[0].pictures).toEqual(pics.slice(0, 10))
      expect(retval[1].startIndex).toEqual(10)
      expect(retval[1].pictures).toEqual(pics.slice(10, 22))
    })

    it("creates a slice shorter than defined in settings if it is the only slice", function() {
      stubCurrentSettings({format: {picsMin: 3, picsMax: 10}})

      let pics = new Array(2).fill().map(() => factory.picture())
      let report = factory.report(pics)

      let retval = report.sliced()
      expect(retval).toBeArrayOfSize(1)
      expect(retval[0].startIndex).toEqual(0)
      expect(retval[0].pictures).toEqual(pics)
    })

  })
})
