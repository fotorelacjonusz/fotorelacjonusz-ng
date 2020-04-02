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

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" v-translate>Report footer</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea
                  class="textarea has-fixed-size is-family-code"
                  rows="3"
                  v-model="model.footer.text"
                  @change="onConfigUpdated">
              </textarea>
            </div>
            <p class="help" v-translate>
              Text to be appended to the last post.
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">&nbsp;</label>
        </div>

        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="model.footer.link">
                <translate>Add link to Fotorelacjonusz website</translate>
              </label>
            </div>
          </div>

          <div class="field" v-show="model.footer.link">
            <div class="control select">
              <select
                  v-model="model.footer.linkLanguage"
                  @change="onConfigUpdated">
                  <option value="en" v-translate>
                    in English
                  </option>
                  <option value="pl" v-translate>
                    in Polish
                  </option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
}

Vue.component("settings-panel-post-layout", SettingsPanelPostLayout)
