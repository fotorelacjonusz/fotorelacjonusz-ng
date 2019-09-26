import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

import "./file-picker.js"

export const MainNavbar = {
  template: `
    <nav role="navigation">
      <file-picker/>
      <router-link to="/forum">Upload</router-link>
      <router-link to="/about">About this program</router-link>
    </nav>
  `
}

Vue.component("main-navbar", MainNavbar)
