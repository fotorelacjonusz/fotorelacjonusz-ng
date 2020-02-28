const configure = require("@jimp/custom")
const types = require("@jimp/types")

export const Jimp = configure({
  types: [types],
  plugins: [
    require("@jimp/plugin-resize"),
  ],
})
