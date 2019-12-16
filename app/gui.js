const Vue = require("vue/dist/vue.common.js")
const GettextPlugin = require("vue-gettext")
const VueRouter = require("vue-router")

const { library, config: faConfig } = require("@fortawesome/fontawesome-svg-core")
const { fas } = require("@fortawesome/free-solid-svg-icons")
const { FontAwesomeIcon } = require("@fortawesome/vue-fontawesome")

import { Report } from "./models/report.js"
import { gettextPluginConfig } from "./util/i18n.js"
import { router } from "./routes.js"

Vue.use(VueRouter)
Vue.use(GettextPlugin, gettextPluginConfig)

// Font Awesome configuration
faConfig.autoAddCss = false // wasn't working anyway
library.add(fas) // whole bundle
Vue.component("font-awesome-icon", FontAwesomeIcon)

// Expose Report instance across all the Vue components.
Vue.prototype.report = new Report()

var app = new Vue({
  el: document.querySelector("#app"),
  router,
  template: `<div id="app"><router-view></router-view></div>`
})

window.ondragover = (e) => e.preventDefault()
window.ondrop = (e) => e.preventDefault()

// Following one-liner fixes Vue Devtools.   It should not be necessary, as
// NW-Vue-Devtools NPM package cares about loading devtools.  However, since
// commit 124e82d3a15930f1215321988b it does not happen for some reason.
// Neither setting "Vue.config.devtools" helps.  This solution comes from:
// https://github.com/vuejs/vue-devtools#force-enable-the-devtools.
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
