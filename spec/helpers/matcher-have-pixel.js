beforeEach(function() {
  jasmine.addMatchers({ toHavePixel })
})

function toHavePixel(util, customEqualityTesters) {
  return {
    compare: function(actualImage, x, y, expectedColor) {
      let result = {}
      let actualColor = actualImage.getPixelColor(x, y)

      result.pass = (actualColor === expectedColor)

      let coordsStr = `(${x},${y})`
      let actualStr = `0x${actualColor.toString(16)}`
      let expectedStr = `0x${expectedColor.toString(16)}`

      if (result.pass) {
        result.message =
          `Expected ${coordsStr} not to have color ${expectedStr}`
      } else {
        result.message =
          `Expected ${coordsStr} to have color ${expectedStr}, ` +
          `but it has ${actualStr}`
      }

      return result
    }
  }
}
