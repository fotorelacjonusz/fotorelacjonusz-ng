const Vue = require("vue/dist/vue.common.js")

import "./file-picker.js"
import "./navbar.js"
import "./report-editor.js"

export const MainWindow = {
  data() {
    return {
      viewMode: "large",
    }
  },

  template: `
    <div class="main-window flex-window accepts-file-drop">
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

        <template v-slot:right>
          <div class="buttons has-addons">
            <button
                class="button is-light"
                :class="[viewMode === 'large' ? 'is-active is-selected' : '']"
                @click="switchViewMode('large')">
                <font-awesome-icon
                    icon="bars"
                    title="Large pictures" />
            </button>
            <button
                class="button is-light"
                :class="[viewMode === 'thumbs' ? 'is-active is-selected' : '']"
                @click="switchViewMode('thumbs')">
                <font-awesome-icon
                    icon="grip-horizontal"
                    title="Thumbnails" />
            </button>
          </div>
        </template>
      </navbar>

      <report-editor class="spread"/>
    </div>
  `,

  methods: {
    switchViewMode(newMode) {
      this.viewMode = newMode
    },
  },
}

Vue.component("main-window", MainWindow)
