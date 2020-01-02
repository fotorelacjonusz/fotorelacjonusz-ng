const Jimp = require("jimp")

import { currentSettings } from "../models/settings.js"

export function repaint(jimpImage) {
  return resize(jimpImage)
}

function getProcessingSettings() {
  return currentSettings.data.processing
}

function resize(jimpImage) {
  if (getProcessingSettings().resize.mode !== "normal") {
    return jimpImage
  }

  const maxWidth = getProcessingSettings().resize.width
  const maxHeight = getProcessingSettings().resize.height
  const timesTooWide = jimpImage.bitmap.width / maxWidth
  const timesTooHigh = jimpImage.bitmap.height / maxHeight

  if (Math.max(timesTooWide, timesTooHigh) < 1) {
    // Image is smaller than configured limits
    return jimpImage
  }

  console.log("doing")

  const requestedDimensions =
    timesTooWide > timesTooHigh ? [maxWidth, Jimp.AUTO] : [Jimp.AUTO, maxHeight]

  return jimpImage.resize(...requestedDimensions)
}
