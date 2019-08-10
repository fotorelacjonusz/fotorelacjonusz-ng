import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"
import "./pic-list.js"
import "./file-picker.js"

Vue.component("main-window", {
  template: `
    <div class="main-window">
      <file-picker/>
      <pic-list/>
    </div>
  `
})
