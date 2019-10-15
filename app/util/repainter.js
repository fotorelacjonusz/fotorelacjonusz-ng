const { fabric } = require("fabric")

export function repaint(picture) {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(this.displayUrl, (origImage) => {
      let targetImage = repaintImage(origImage)
      let canvas = targetImage.toCanvasElement()
      canvas.toBlob((blob) => resolve(blob), this.originalMIMEType)
    })
  })
}

function repaintImage(image) {
  return scaleImage(image)
}

function scaleImage(image) {
  return image.scaleToWidth(1000)
}
