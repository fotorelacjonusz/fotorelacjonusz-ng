const path = require("path")
const root = path.join(__dirname, "..", "..")

global.nw = {
  App: {
    dataPath: path.join(root, "tmp", "data")
  }
}
