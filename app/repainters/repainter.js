import { resize } from "./resizer.js"

export async function repaint(jimpImage) {
  return await resize(jimpImage)
}
