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
      this.name = "blue.jpg"
      this.blob = "some-data"
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

      this.errorResponse = {
        data: {
          error: "Something went wrong",
        },
        success: false,
        status: 500,
      }
    })

    it("uploads file to Imgur", async function() {
      let apiCall = this.imgur.
        post("/3/image").
        reply(200, this.fakeResponse)

      await this.uploader.uploadFile(this.name, this.blob)
      expect(apiCall.isDone()).toBe(true)
    })

    it("authenticates with Imgur Client ID", async function() {
      let apiCall = this.imgur.
        post("/3/image").
        reply(200, this.fakeResponse)

      apiCall.matchHeader("authorization", "Client-ID 8de2eccb47ccc43")
      await this.uploader.uploadFile(this.name, this.blob)
    })

    it("returns remote URL and upload data", async function() {
      this.imgur.
        post("/3/image").
        reply(200, this.fakeResponse)

      let retval = await this.uploader.uploadFile(this.name, this.blob)
      expect(retval.remoteUrl).toEqual("https://i.imgur.com/fake.jpg")
      expect(retval.upload).toEqual(this.fakeResponse.data)
    })

    it("retries in case of various upload errors", async function() {
      noSleep()

      let call1 = this.imgur.
        post("/3/image").
        reply(500, this.errorResponse)

      let call2 = this.imgur.
        post("/3/image").
        replyWithError("Couldn't make a request")

      let call3 = this.imgur.
        post("/3/image").
        reply(200, this.fakeResponse)

      let retval = await this.uploader.uploadFile(this.name, this.blob)
      expect(retval.remoteUrl).toEqual("https://i.imgur.com/fake.jpg")
      expect(call1.isDone()).toBe(true)
      expect(call2.isDone()).toBe(true)
      expect(call3.isDone()).toBe(true)
    })
  })
})
