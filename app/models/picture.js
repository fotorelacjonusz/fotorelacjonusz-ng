import { uuid4 as uuid } from "../util/uuid.js"

export class Picture {
  constructor(file) {
    this._id = uuid()
    this.originalFile = file
    this.text = ""

    // Browser only.
    // This is avoiding execution in specs, that is an antipattern.
    // TODO Do something reasonable instead.
    if ("function" === typeof(URL.createObjectURL)) {
      this.displayUrl = URL.createObjectURL(file)
    }
  }

  get id() { return this._id }
}
