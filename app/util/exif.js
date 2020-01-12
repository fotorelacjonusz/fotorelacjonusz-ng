const { ExifImage } = require("exif")

export function readEXIF(file) {
  return new Promise(function(resolve, reject) {
    try {
      new ExifImage({image: file.path}, function (error, exifData) {
        if (error)
          reject(error)
        else
          resolve(exifData)
      })
    } catch (error) {
      reject(error)
    }
  })
}
