import Vue from "../node_modules/vue/dist/vue.esm.browser.js"
import "./components/main-window.js"

var app = new Vue({
  el: "#app",
  template: `<div id="app"><main-window></main-window></div>`
})
