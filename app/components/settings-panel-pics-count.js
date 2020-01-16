const Vue = require("vue/dist/vue.common.js")

import { SettingsMixin } from "./settings-mixin.js"

export const SettingsPanelPicsCount = {
  mixins: [SettingsMixin],

  template: `
    <div class="settings-section">
      <h3 class="title is-5" v-translate>Photos per post</h3>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" v-translate>Maximum</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                  class="input"
                  type="number"
                  min="1"
                  v-model.number="model.format.picsMax"
                  @change="onConfigUpdated">
            </div>
            <p class="help" v-translate="{max: model.format.picsMax}">
              There will be %{max} photo(s) per post.
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" v-translate>Minimum</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                  class="input"
                  type="number"
                  min="0"
                  v-model.number="model.format.picsMin"
                  @change="onConfigUpdated">
            </div>
            <p class="help" v-translate="{min: model.format.picsMin}">
              Avoid creating posts which are composed of less than %{min}
              photo(s).  Instead, make the last post respectively longer,
              possibly breaking the "photos per post" limit. This setting
              does not apply if there would be only one post anyway.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
}

Vue.component("settings-panel-pics-count", SettingsPanelPicsCount)
