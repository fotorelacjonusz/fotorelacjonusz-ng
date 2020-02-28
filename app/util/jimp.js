const configure = require("@jimp/custom")
const types = require("@jimp/types")
const plugins = require("@jimp/plugins")

export const Jimp = configure({
  types: [types],
  plugins: [plugins],
})
