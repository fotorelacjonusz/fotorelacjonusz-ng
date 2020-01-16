const Vue = require("vue/dist/vue.common.js")

import { SettingsMixin } from "./settings-mixin.js"

export const SettingsPanelInterface = {
  mixins: [SettingsMixin],

  template: `
    <div class="settings-section">
      <h3 class="title is-5" v-translate>Interface options</h3>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" v-translate>Language</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control select">
              <select
                  v-model="model.interface.locale"
                  @change="onConfigUpdated(); onLanguageChanged($event)">
                  <option
                      v-for="(language, key) in $language.available"
                      :value="key">
                      {{ language }}
                  </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" v-translate>White spaces</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox"
                  class="checkbox"
                  v-model="model.interface.fixNBSpaces"
                  @change="onConfigUpdated">
                <translate>
                  Convert non-breaking white spaces to regular ones
                </translate>
              </label>
              <p class="help" v-translate>
                SkyScraperCity.com forum substitutes non-breaking white
                spaces with weird-looking asterisks.

                This option prevents that by converting the non-breaking
                spaces to regular ones.  It is especially useful on MacOS,
                as it is frequent to accidentally type non-breaking spaces
                by hitting Option+Space key combination on this system.

                You probably want to keep this setting disabled unless you
                experience issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  methods: {
    onLanguageChanged(event) {
      this.$language.current = event.target.value
    },
  }
}

Vue.component("settings-panel-interface", SettingsPanelInterface)
