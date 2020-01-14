const Vue = require("vue/dist/vue.common.js")

import "./pic-list-item.js"

export const ReportEditor = {
  props: {
    viewMode: {type: String},
  },

  data: function() {
    return {
      pictures: this.report.pictures,
    }
  },

  template: `
    <div class="report-editor" :class="viewModeClass">
      <p class="box hide-on-view-mode-thumbs">
        <textarea
            v-model="report.header"
            class="textarea has-fixed-size "
            rows="4">
        </textarea>
      </p>

      <draggable
          tag="ol"
          class="pic-list"
          :list="pictures"
          :disabled="!draggingAllowed">

          <pic-list-item v-for="(picture, index) in pictures"
              :key="picture.id"
              :picture="picture"
              :index="index" />

          <li
              v-if="report.isEmpty"
              class="box has-background-light has-text-weight-medium"
              v-translate>
              The report is empty.
          </li>
      </draggable>

      <p class="box hide-on-view-mode-thumbs">
        <textarea
            v-model="report.footer"
            class="textarea has-fixed-size "
            rows="4">
        </textarea>
      </p>
    </div>
  `,

  computed: {
    draggingAllowed() {
      return this.viewMode == "thumbs"
    },

    viewModeClass() {
      return `view-mode-${this.viewMode}`
    },
  }
}

Vue.component("report-editor", ReportEditor)
