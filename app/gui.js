import Vue from "../node_modules/vue/dist/vue.esm.browser.js"
import { Report } from "./models/report.js"
import "./components/main-window.js"

// Expose Report instance across all the Vue components.
Vue.prototype.report = new Report()

var app = new Vue({
  el: "#app",
  template: `<div id="app"><main-window></main-window></div>`
})
