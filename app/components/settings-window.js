const Vue = require("vue/dist/vue.common.js")

import { currentSettings } from "../models/settings.js"

import "./navbar.js"

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

        <div class="settings-section">
          <h3 class="title is-5" v-translate>Post layout options</h3>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" v-translate>Item template</label>
            </div>

            <div class="field-body">
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
            </div>
          </div>
        </div>

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

        <div class="settings-section">
          <h3 class="title is-5" v-translate>Photo processing</h3>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" v-translate>Resize photos</label>
            </div>

            <div class="field-body">
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox"
                      class="checkbox"
                      v-model="model.processing.resize.mode"
                      true-value="normal"
                      false-value="never"
                      @change="onConfigUpdated">
                    <translate>Scale down large photos</translate>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div
              class="field is-horizontal"
              v-show="model.processing.resize.mode === 'normal'">
              <div class="field-label is-normal">
                <label class="label" v-translate>Width</label>
              </div>

              <div class="field-body">
                <div class="field">
                  <div class="field has-addons">
                    <div class="control">
                      <input
                          class="input"
                          type="number"
                          min="1"
                          v-model.number="model.processing.resize.width"
                          @change="onConfigUpdated">
                    </div>
                    <div class="control">
                      <a class="button is-static">px</a>
                    </div>
                  </div>
                  <p class="help" v-translate>
                    If given picture is wider than that, it will be scaled down
                    appropriately.
                  </p>
                </div>
              </div>
          </div>

          <div
              class="field is-horizontal"
              v-show="model.processing.resize.mode === 'normal'">
              <div class="field-label is-normal">
                <label class="label" v-translate>Height</label>
              </div>

              <div class="field-body">
                <div class="field">
                  <div class="field has-addons">
                    <div class="control">
                      <input
                          class="input"
                          type="number"
                          min="1"
                          v-model.number="model.processing.resize.height"
                          @change="onConfigUpdated">
                    </div>
                    <div class="control">
                      <a class="button is-static">px</a>
                    </div>
                  </div>
                  <p class="help" v-translate>
                    If given picture is taller than that, it will be scaled down
                    appropriately.
                  </p>
                </div>
              </div>
          </div>
        </div>

        <div class="settings-section">
          <h3 class="title is-5" v-translate>Photo upload</h3>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label" v-translate>Hosting service</label>
            </div>

            <div class="field-body">
              <div class="field">
                <div class="control select">
                  <select
                      v-model="model.uploader.current"
                      @change="onConfigUpdated">
                      <option value="ImgurAnonUploader" v-translate>
                          Imgur (anonymously)
                      </option>
                      <option value="ImgurUserUploader" v-translate>
                          Imgur (logged in)
                      </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  computed: {
    model() { return currentSettings.data },

    showResizeControls() { return this.model.processing.resize.mode === "normal" },
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
