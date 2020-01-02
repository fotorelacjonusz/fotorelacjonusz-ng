import { UploadingProcessor } from "../../app/processors/uploading.js"

describe("UploadingProcessor", function() {
  it("is instantiable", function () {
    expect(new UploadingProcessor(factory.report())).toBeInstanceOf(UploadingProcessor)
  })

  describe(".perform()", function() {
    beforeEach(function() {
      this.pic1 = factory.picture("blue.jpg")
      this.pic2 = factory.picture("red.jpg")
      let allPics = [this.pic1, this.pic2]
      this.processor = new UploadingProcessor(factory.report(allPics))

      sinon.
        stub(this.processor._uploader, "uploadFile").
        callsFake((fileName, blob) => {
          let remoteUrl = `https://i.example.com/${fileName}`
          let upload = {some: "data"}
          return {remoteUrl, upload}
        })
    })

    it("uploads all pictures in report", async function() {
      await this.processor.perform()

      expect(this.pic1.remoteUrl).toEqual("https://i.example.com/blue.jpg")
      expect(this.pic1.upload).toEqual({some: "data"})
      expect(this.pic2.remoteUrl).toEqual("https://i.example.com/red.jpg")
      expect(this.pic2.upload).toEqual({some: "data"})

      expect(this.processor.hasCompleted).toBe(true)
    })
  })
})
