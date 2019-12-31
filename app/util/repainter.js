const { fabric } = require("fabric")

// export function repaintImageFromURL(url, mimeType) {
// export function repaintImageFromURL(url) {
//   return new Promise((resolve, reject) => {
//     fabric.Image.fromURL(url, (origImage) => {
//       resolve(repaintImage(origImage))
//       // let targetImage = repaintImage(origImage)
//       // let canvas = targetImage.toCanvasElement()
//       // canvas.toBlob((blob) => resolve(blob), mimeType)
//     })
//   })
// }

export function repaint(imageURL) {
  // let scaledImage = scaleImage(imageURL)
  let canvas = new fabric.StaticCanvas(null, { width: 1000, height: 1000 })
  // canvas.add(scaledImage)
  canvas.setBackgroundImage(imageURL)
  canvas.requestRenderAll()
  return canvas
}

// export function blobifyCanvas(canvas, mimeType) {

// }

function scaleImage(image) {
  return image.scaleToWidth(1000)
}
