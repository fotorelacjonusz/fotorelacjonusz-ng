import { currentSettings } from "../models/settings.js"

const FRAME_RGBA = 0x000000FF // opaque black
const FRAME_THICKNESS = 3 // pixels

export function frame(jimpImage) {
  if (getProcessingSettings().frame.enabled) {
    const w = jimpImage.bitmap.width
    const h = jimpImage.bitmap.height
    const t = FRAME_THICKNESS

    drawRectangle(jimpImage, 0, 0, w, t) // top
    drawRectangle(jimpImage, 0, 0, t, h) // left
    drawRectangle(jimpImage, w-t, 0, t, h) // right
    drawRectangle(jimpImage, 0, h-t, w, t) // bottom
  }

  return jimpImage
}

function getProcessingSettings() {
  return currentSettings.data.processing
}

function drawRectangle(jimpImage, x, y, width, height) {
  jimpImage.scan(x, y, width, height, makePixelBlack)
}

function makePixelBlack(x, y, _idx) {
  this.setPixelColor(FRAME_RGBA, x, y)
}
