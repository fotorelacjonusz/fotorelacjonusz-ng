const Vue = require("vue/dist/vue.common.js")

import { SettingsMixin } from "./settings-mixin.js"

export const SettingsPanelProcessing = {
  mixins: [SettingsMixin],

  template: `
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
  `,
}

Vue.component("settings-panel-processing", SettingsPanelProcessing)
