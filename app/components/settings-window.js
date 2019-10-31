const Vue = require("vue/dist/vue.common.js")

import { currentSettings } from "../models/settings.js"

export const SettingsWindow = {
  template: `
    <div class="settings-window flex-window">
      <nav class="my-navbar">
        <router-link to="/" class="button is-light">Back</router-link>
      </nav>

      <div class="settings-section">
        <h3 class="title is-5">Post layout options</h3>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Item template</label>
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
                <p class="help no-break">
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
  }
}

Vue.component("settings-window", SettingsWindow)
