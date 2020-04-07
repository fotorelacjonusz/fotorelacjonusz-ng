import { frame } from "./framer.js"
import { resize } from "./resizer.js"
import { watermark } from "./watermarker.js"

export async function repaint(jimpImage) {
  jimpImage = await resize(jimpImage)
  jimpImage = await watermark(jimpImage)
  jimpImage = await frame(jimpImage)
  return jimpImage
}
