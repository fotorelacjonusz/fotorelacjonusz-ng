// TODO Signal progress with events.

export class PostingProcessor {
  constructor(report) {
    this._posts = ["test reply"]
    this._counter = 0
  }

  get allPosts() { return this._posts }

  get currentPost() { return this.allPosts[this._counter] }

  get hasCompleted() { return this._counter === this.allPosts.length }

  step() {
    this._counter += 1
  }
}
