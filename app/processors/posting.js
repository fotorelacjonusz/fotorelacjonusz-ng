import { BBCodeRenderer } from "../renderers/bb-code.js"

// TODO Signal progress with events.

export class PostingProcessor {
  constructor(report) {
    this._report = report
    this._renderer = new BBCodeRenderer(report)
    this._posts = []
    this._counter = 0
  }

  get allPosts() { return this._posts }

  get currentPost() { return this.allPosts[this._counter] }

  get hasCompleted() { return this._counter === this.allPosts.length }

  get report() { return this._report }

  prepare() {
    this._posts = this._renderer.toPosts()
  }

  step() {
    this._counter += 1
  }
}
