export class Bookmark {
  constructor(args) {
    this._args = args
  }

  get caption() { return this._args.caption }
  get url() { this._args.url }

  toHash() { return this._args }
}
