require("jsdom-global")()

const _ = require("lodash")
const { mount } = require("@vue/test-utils")

const defaultWrapperOptions = {
  directives: {
    translate() {},
  },
  stubs: [
    "router-link",
    "translate",
    "navbar",
    "countdown",
    "webview",
  ],
}

global.wrapperFactoryFactory = function(componentName) {
  return (options) => {
    mergedOptions = _.merge({}, defaultWrapperOptions, options)
    return mount(componentName, mergedOptions)
  }
}
