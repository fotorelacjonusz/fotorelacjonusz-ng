const Vue = require("vue/dist/vue.common.js")
const GettextPlugin = require("vue-gettext")
const VueRouter = require("vue-router")

const { library } = require("@fortawesome/fontawesome-svg-core")
const { fas } = require("@fortawesome/free-solid-svg-icons")
const { FontAwesomeIcon } = require("@fortawesome/vue-fontawesome")

import { Report } from "./models/report.js"
import { AboutWindow } from "./components/about-window.js"
import { ForumWindow } from "./components/forum-window.js"
import { SettingsWindow } from "./components/settings-window.js"
import { MainWindow } from "./components/main-window.js"

import { gettextPluginConfig } from "./util/i18n.js"

Vue.use(VueRouter)
Vue.use(GettextPlugin, gettextPluginConfig)

// Font Awesome configuration
library.add(fas) // whole bundle
Vue.component("font-awesome-icon", FontAwesomeIcon)

// Expose Report instance across all the Vue components.
Vue.prototype.report = new Report()

const router = new VueRouter({
  base: "/",
  routes: [
    { path: "/", component: MainWindow },
    { path: "/about", component: AboutWindow },
    { path: "/forum", component: ForumWindow },
    { path: "/settings", component: SettingsWindow },
  ]
})

var app = new Vue({
  el: document.querySelector("#app"),
  router,
  template: `<div id="app"><router-view></router-view></div>`
})
