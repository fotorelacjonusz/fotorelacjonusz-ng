import { PostingProcessor } from "../../app/processors/posting.js"

describe("PostingProcessor", function() {
  it("is instantiable", function () {
    expect(new PostingProcessor(factory.report())).toBeInstanceOf(PostingProcessor)
  })

  it("crawls all posts with .currentPost() and .step() methods", function() {
    let posts = ["post 1", "post 2", "post 3"]
    let processor = factory.postingProcessor(posts)

    expect(processor.currentPost).toEqual(posts[0])
    expect(processor.hasCompleted).toBe(false)
    processor.step()
    expect(processor.currentPost).toEqual(posts[1])
    expect(processor.hasCompleted).toBe(false)
    processor.step()
    expect(processor.currentPost).toEqual(posts[2])
    expect(processor.hasCompleted).toBe(false)
    processor.step()
    expect(processor.currentPost).toBeUndefined()
    expect(processor.hasCompleted).toBe(true)
  })

  describe(".allPosts", function() {
    it("contains all the post bodies to be submitted to forums", function() {
      let posts = ["post 1", "post 2", "post 3"]
      let processor = factory.postingProcessor(posts)
      expect(processor.allPosts).toEqual(posts);
    })
  })
})
