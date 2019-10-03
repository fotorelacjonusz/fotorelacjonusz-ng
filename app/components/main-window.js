import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"
import "./pic-list.js"
import "./file-picker.js"

export const MainWindow = {
  template: `
    <div class="main-window">
      <file-picker/>
      <pic-list/>
      <router-link to="/forum">Upload</router-link>
      <router-link to="/about">About this program</router-link>
    </div>
  `,
}

Vue.component("main-window", MainWindow)
