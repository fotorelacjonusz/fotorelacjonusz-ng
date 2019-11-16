require("jsdom-global")()

const _ = require("lodash")
const { shallowMount } = require("@vue/test-utils")

const defaultWrapperOptions = {
  directives: {
    translate() {},
  },
  stubs: [
    "router-link",
    "translate",
  ],
}

global.wrapperFactoryFactory = function(componentName) {
  return (options) => {
    mergedOptions = _.merge({}, defaultWrapperOptions, options)
    return shallowMount(componentName, mergedOptions)
  }
}
