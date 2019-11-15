const Vue = require("vue/dist/vue.common.js")

export const SettingsItem = {
  template: `
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label" v-translate>{{title}}</label>
      </div>

      <div class="field-body">
        <slot></slot>
      </div>
    </div>
  `,

  props: ["title"],
}

Vue.component("settings-item", SettingsItem)
