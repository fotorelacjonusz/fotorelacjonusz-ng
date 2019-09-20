import Vue from "../node_modules/vue/dist/vue.esm.browser.js"
import VueRouter from "../node_modules/vue-router/dist/vue-router.esm.browser.js"
import { Report } from "./models/report.js"
import { MainWindow } from "./components/main-window.js"

Vue.use(VueRouter)

// Expose Report instance across all the Vue components.
Vue.prototype.report = new Report()

const router = new VueRouter({
  base: "/",
  routes: [
    { path: "/", component: MainWindow },
  ]
})

var app = new Vue({
  el: "#app",
  router,
  template: `<div id="app"><router-view></router-view></div>`
})
