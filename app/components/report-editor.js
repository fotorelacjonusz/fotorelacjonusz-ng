const Vue = require("vue/dist/vue.common.js")

import "./pic-list.js"

export const ReportEditor = {
  props: {
    viewMode: {type: String},
  },

  template: `
    <div class="report-editor" :class="viewModeClass">
      <p class="box">
        <textarea
            v-model="report.header"
            class="textarea has-fixed-size "
            rows="4">
        </textarea>
      </p>

      <pic-list />

      <p class="box">
        <textarea
            v-model="report.footer"
            class="textarea has-fixed-size "
            rows="4">
        </textarea>
      </p>
    </div>
  `,

  computed: {
    viewModeClass() {
      return `view-mode-${this.viewMode}`
    },
  }
}

Vue.component("report-editor", ReportEditor)
