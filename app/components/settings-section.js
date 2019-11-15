const Vue = require("vue/dist/vue.common.js")

export const SettingsSection = {
  template: `
    <div class="settings-section">
      <h3 class="title is-5" v-translate>{{title}}</h3>
      <slot></slot>
    </div>
  `,

  props: ["title"],
}

Vue.component("settings-section", SettingsSection)
