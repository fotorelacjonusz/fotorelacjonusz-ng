global.sinon = require("sinon")

afterEach(function() {
  sinon.verify()
  sinon.restore()
})
