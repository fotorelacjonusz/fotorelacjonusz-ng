const Vue = require("vue/dist/vue.common.js")

import "./file-picker.js"
import "./pic-list.js"

export const MainWindow = {
  template: `
    <div class="main-window flex-window">
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

      <pic-list class="spread"/>
    </div>
  `,
}

Vue.component("main-window", MainWindow)
