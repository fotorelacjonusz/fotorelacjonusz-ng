import { ImgurAnonUploader } from "../../app/uploaders/imgur-anon.js"

const nock = require("nock")

describe("ImgurAnonUploader", function() {
  beforeEach(function() {
    nock.disableNetConnect()
    this.imgur = nock("https://api.imgur.com")
  })

  afterEach(function() {
    nock.cleanAll()
  })

  it("is instantiable", function () {
    expect(new ImgurAnonUploader()).toBeInstanceOf(ImgurAnonUploader)
  })

  describe(".uploadFile()", function() {
    beforeEach(function() {
      this.file = factory.file("blue.jpg")
      this.uploader = new ImgurAnonUploader()

      this.fakeResponse = {
        data: {
          id: "fake",
          account_id: 0,
          type: "image/jpg",
          link: "https://i.imgur.com/fake.jpg"
        },
        success: true,
        status: 200,
      }

      this.apiCall = this.imgur.
        post("/3/image").
        reply(200, this.fakeResponse)
    })

    it("uploads file to Imgur", async function() {
      await this.uploader.uploadFile(this.file)
      expect(this.apiCall.isDone()).toBe(true)
    })

    it("authenticates with Imgur Client ID", async function() {
      this.apiCall.matchHeader("authorization", "Client-ID 8de2eccb47ccc43")
      await this.uploader.uploadFile(this.file)
    })

    it("returns remote URL and upload data", async function() {
      let retval = await this.uploader.uploadFile(this.file)
      expect(retval.remoteUrl).toEqual("https://i.imgur.com/fake.jpg")
      expect(retval.upload).toEqual(this.fakeResponse.data)
    })
  })
})
