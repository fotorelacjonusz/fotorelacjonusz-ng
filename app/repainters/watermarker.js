const Jimp = require("jimp")

import { currentSettings } from "../models/settings.js"

export async function watermark(jimpImage) {
  if (watermarkSettings().mode !== "picture") {
    return jimpImage
  }

  const watermark = await loadWatermarkPicture()

  if (!watermark) {
    return jimpImage
  }

  const { x, y } = calculateWatermarkPosition(jimpImage, watermark)

  return jimpImage.composite(watermark, x, y)
}

function calculateWatermarkPosition(image, watermark) {
  const x = image.bitmap.width - watermark.bitmap.width
  const y = image.bitmap.height - watermark.bitmap.height

  return { x, y }
}

function watermarkSettings() {
  return currentSettings.data.processing.watermark
}

function loadWatermarkPicture() {
  const path = currentSettings.watermarkPicturePath
  return Jimp.read(path).catch(_ => null)
}
