
export class Picture {
  constructor(file) {
    this.originalFile = file
    this.originalMIMEType = file.type
    this.text = ""

    // Browser only.
    // This is avoiding execution in specs, that is an antipattern.
    // TODO Do something reasonable instead.
    if ("function" === typeof(URL.createObjectURL)) {
      this.displayUrl = URL.createObjectURL(file)
    }
  }

  async repaint() {
    let image = await repaintImageFromURL(this.displayUrl)
    let canvas = image.toCanvasElement()
    return await canvas.toBlob(this.originalMIMEType)

    // return new Promise((resolve, reject) => {
    //   repaintImageFromURL(this.displayUrl).then(image ś=> {
    //     let canvas = image.toCanvasElement()
    //     canvas.toBlob((blob) => resolve(blob), this.originalMIMEType)
    //   })

          // let canvas = targetImage.toCanvasElement()
      // canvas.toBlob((blob) => resolve(blob), mimeType)


  }
}
