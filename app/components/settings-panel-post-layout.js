const Vue = require("vue/dist/vue.common.js")

import { SettingsMixin } from "./settings-mixin.js"

export const SettingsPanelPostLayout = {
  mixins: [SettingsMixin],

  template: `
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

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" v-translate>Start number</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                  class="input"
                  type="number"
                  v-model.number="model.format.startNumber"
                  @change="onConfigUpdated">
            </div>
            <p class="help" v-translate="{n: model.format.startNumber}">
              The first picture in the report will have number %{n}.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
}

Vue.component("settings-panel-post-layout", SettingsPanelPostLayout)
