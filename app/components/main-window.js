import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"
import "./pic-list.js"
import "./file-picker.js"

export const MainWindow = {
  template: `
    <div class="main-window">
      <file-picker/>
      <pic-list/>
      <button @click="uploadReport">Upload</button>
      <router-link to="/about">About this program</router-link>
    </div>
  `,

  methods: {
    uploadReport: function () {
      console.info("Started photo report upload")
    }
  },
}

Vue.component("main-window", MainWindow)
