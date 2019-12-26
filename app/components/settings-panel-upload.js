const Vue = require("vue/dist/vue.common.js")

import { SettingsMixin } from "./settings-mixin.js"

export const SettingsPanelUpload = {
  mixins: [SettingsMixin],

  template: `
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
                  <option value="FtpUploader" v-translate>
                      FTP
                  </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
          class="field is-horizontal"
          v-show="model.uploader.current === 'FtpUploader'">
        <div class="field-label is-normal">
          <label class="label" v-translate>Server</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                  class="input"
                  type="text"
                  v-model="model.uploader.ftp.server"
                  @change="onConfigUpdated">
            </div>
          </div>
        </div>
      </div>

      <div
          class="field is-horizontal"
          v-show="model.uploader.current === 'FtpUploader'">
        <div class="field-label is-normal">
          <label class="label" v-translate>User name</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                  class="input"
                  type="text"
                  v-model="model.uploader.ftp.user"
                  @change="onConfigUpdated">
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
}

Vue.component("settings-panel-upload", SettingsPanelUpload)
