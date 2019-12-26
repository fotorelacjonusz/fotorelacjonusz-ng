const Vue = require("vue/dist/vue.common.js")

import "./file-picker.js"
import "./navbar.js"
import "./report-editor.js"

export const MainWindow = {
  template: `
    <div class="main-window flex-window">
      <navbar>
        <file-picker class="button is-primary"/>
        <router-link
            to="/preparation"
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
      </navbar>

      <report-editor class="spread"/>
    </div>
  `,
}

Vue.component("main-window", MainWindow)
