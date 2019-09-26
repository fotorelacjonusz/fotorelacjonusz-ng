import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

import "./file-picker.js"

export const MainNavbar = {
  template: `
    <nav role="navigation">
      <file-picker class="button is-primary"/>
      <router-link to="/forum" class="button is-light">Upload</router-link>
      <router-link to="/about" class="button is-light">About this program</router-link>
    </nav>
  `
}

Vue.component("main-navbar", MainNavbar)
