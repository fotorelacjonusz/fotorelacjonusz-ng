export class Picture {
  constructor(file) {
    this.originalFile = file
    this.text = ""

    // Browser only.
    // This is avoiding execution in specs, that is an antipattern.
    // TODO Do something reasonable instead.
    if ("function" === typeof(URL.createObjectURL)) {
      this.displayUrl = URL.createObjectURL(file)
    }
  }
}
