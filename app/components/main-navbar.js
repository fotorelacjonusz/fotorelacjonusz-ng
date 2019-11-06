const Vue = require("vue/dist/vue.common.js")

import "./file-picker.js"

export const MainNavbar = {
  template: `
    <nav class="my-navbar" role="navigation">
      <file-picker class="button is-primary"/>
      <router-link
          to="/forum"
          class="button is-light"
          v-translate>
          Upload
      </router-link>
      <router-link
          to="/settings"
          class="button is-light"
          v-translate>
          Settings
      </router-link>
      <router-link
          to="/about"
          class="button is-light"
          v-translate>
          About this program
      </router-link>
    </nav>
  `
}

Vue.component("main-navbar", MainNavbar)
