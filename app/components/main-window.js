import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"
import "./main-navbar.js"
import "./pic-list.js"
import "./file-picker.js"

export const MainWindow = {
  template: `
    <div class="main-window">
      <main-navbar/>
      <file-picker/>
      <pic-list/>
    </div>
  `,
}

Vue.component("main-window", MainWindow)
