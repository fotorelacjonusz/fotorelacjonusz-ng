const Vue = require("vue/dist/vue.common.js")

import "./navbar.js"
import "./settings-panel-interface.js"
import "./settings-panel-pics-count.js"
import "./settings-panel-post-layout.js"
import "./settings-panel-processing.js"
import "./settings-panel-upload.js"

export const SettingsWindow = {
  data() {
    return {
      panels: [
        "interface", "post-layout", "pics-count", "processing", "upload"
      ],
    }
  },

  template: `
    <div class="settings-window flex-window">
      <navbar>
        <router-link
            to="/"
            class="button is-light"
            v-translate>
            Back
        </router-link>
      </navbar>

      <div class="spread">
        <component v-for="panel in panels"
            :key="panel"
            :is="'settings-panel-' + panel" />
      </div>
    </div>
  `,
}

Vue.component("settings-window", SettingsWindow)
