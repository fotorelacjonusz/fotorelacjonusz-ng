import { Jimp } from "../util/jimp.js"
import { currentSettings } from "../models/settings.js"

export function autorotate(jimpImage) {
  if (getOrientation(jimpImage) !== 1) {
    exifRotate(jimpImage)
  }
  return jimpImage
}

function exifRotate(img) {
  let transformation = getExifOrientationTransformation(img)
  let swapDimensions = getOrientation(img) > 4

  let newWidth = swapDimensions ? img.bitmap.height : img.bitmap.width
  let newHeight = swapDimensions ? img.bitmap.width : img.bitmap.height

  transformBitmap(img, newWidth, newHeight, transformation)
}

function transformBitmap(img, width, height, transformation) {
  // Underscore-prefixed values are related to the source bitmap
  // Their counterparts with no prefix are related to the target bitmap
  let _data = img.bitmap.data
  let _width = img.bitmap.width
  let _height = img.bitmap.height

  let data = Buffer.alloc(_data.length)

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let [_x, _y] = transformation(x, y)

      let idx = (width * y + x) << 2
      let _idx = (_width * _y + _x) << 2

      let pixel = _data.readUInt32BE(_idx)
      data.writeUInt32BE(pixel, idx)
    }
  }

  img.bitmap.data = data
  img.bitmap.width = width
  img.bitmap.height = height
}

/**
 * Returns a function which translates EXIF-rotated coordinates into
 * non-rotated ones.
 *
 * Transformation reference: http://sylvana.net/jpegcrop/exif_orientation.html.
 */
function getExifOrientationTransformation(img) {
  let w = img.getWidth()
  let h = img.getHeight()

  switch (getOrientation(img)) {
    case 1: // Horizontal (normal)
      // does not need to be supported here
      return null
    case 2: // Mirror horizontal
      return function(x, y) { return [w-x-1, y] }
    case 3: // Rotate 180
      return function(x, y) { return [w-x-1, h-y-1] }
    case 4: // Mirror vertical
      return function(x, y) { return [x, h-y-1] }
    case 5: // Mirror horizontal and rotate 270 CW
      return function(x, y) { return [y, x] }
    case 6: // Rotate 90 CW
      return function(x, y) { return [y, h-x-1] }
    case 7: // Mirror horizontal and rotate 90 CW
      return function(x, y) { return [w-y-1, h-x-1] }
    case 8: // Rotate 270 CW
      return function(x, y) { return [w-y-1, x] }
    default:
      return null
  }
}

function getOrientation(jimpImage) {
  let exif = jimpImage._exif
  return exif && exif.tags && exif.tags.Orientation || 1
}
