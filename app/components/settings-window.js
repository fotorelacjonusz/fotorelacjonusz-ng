const Vue = require("vue/dist/vue.common.js")

import { currentSettings } from "../models/settings.js"

import "./navbar.js"
import "./settings-item.js"
import "./settings-section.js"

export const SettingsWindow = {
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
        <settings-section title="Interface options">
          <settings-item title="Language">
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
          </settings-item>

          <settings-item title="White spaces">
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox"
                      class="checkbox"
                      v-model="model.interface.fixNBSpaces"
                      @change="onConfigUpdated">
                    Convert non-breaking white spaces to regular ones
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
          </settings-item>
        </settings-section>

        <settings-section title="Post layout options">
          <settings-item title="Item template">
              <div class="field">
                <div class="control">
                  <textarea
                      class="textarea has-fixed-size is-family-code"
                      rows="3"
                      v-model="model.format.postTemplate"
                      @change="onConfigUpdated">
                  </textarea>
                  <p class="help no-break" v-translate render-html="true">
                    You can use following magic words:<wbr>
                    <tt>%DESCRIPTION%</tt> for item description;<wbr>
                    <tt>%NUMBER%</tt> for item number;<wbr>
                    <tt>%IMG_URL%</tt> for picture's remote URL.
                  </p>
                </div>
              </div>
          </settings-item>
        </settings-section>

        <settings-section title="Photos per post">
          <settings-item title="Maximum">
              <div class="field">
                <div class="control">
                  <input
                      class="input"
                      type="number"
                      min="1"
                      v-model="model.format.picsMax"
                      @change="onConfigUpdated">
                </div>
                <p class="help" v-translate="{max: model.format.picsMax}">
                  There will be %{max} photo(s) per post.
                </p>
              </div>
          </settings-item>

          <settings-item title="Minimum">
              <div class="field">
                <div class="control">
                  <input
                      class="input"
                      type="number"
                      min="0"
                      v-model="model.format.picsMin"
                      @change="onConfigUpdated">
                </div>
                <p class="help" v-translate="{min: model.format.picsMin}">
                  Avoid creating posts which are composed of less than %{min}
                  photo(s).  Instead, make the last post respectively longer,
                  possibly breaking the "photos per post" limit. This setting
                  does not apply if there would be only one post anyway.
                </p>
              </div>
          </settings-item>
        </settings-section>
      </div>
    </div>
  `,

  computed: {
    model() { return currentSettings.data },
  },

  methods: {
    onConfigUpdated() {
      currentSettings.save()
      this.$forceUpdate()
    },

    onLanguageChanged(event) {
      this.$language.current = event.target.value
    },
  }
}

Vue.component("settings-window", SettingsWindow)
