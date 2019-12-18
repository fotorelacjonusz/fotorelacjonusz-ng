const Vue = require("vue/dist/vue.common.js")

import "./pic-list.js"

export const ReportEditor = {
  template: `
    <div class="report-editor">
      <pic-list />
    </div>
  `
}

Vue.component("report-editor", ReportEditor)
