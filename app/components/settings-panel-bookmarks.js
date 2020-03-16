const Vue = require("vue/dist/vue.common.js")

import { SettingsMixin } from "./settings-mixin.js"

export const SettingsPanelBookmarks = {
  mixins: [SettingsMixin],

  data: function() {
    return {
      selectedBookmarks: [],
    }
  },

  template: `
    <div class="settings-section">
      <h3 class="title is-5" v-translate>Bookmarks</h3>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" v-translate>Bookmarked pages</label>
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <p v-if="allBookmarks.length == 0" v-translate>
                No user bookmarks have been saved.
              </p>

              <ol v-else>
                <li v-for="bm in allBookmarks">
                  <label class="checkbox">
                    <input
                        type="checkbox"
                        :value="bm"
                        v-model="selectedBookmarks" >
                    {{ bm.caption }}
                  </label>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="field is-horizontal" v-if="allBookmarks.length > 0">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>

        <div class="field-body">
          <div class="field">
            <div class="control">
              <button
                  class="button is-light"
                  :disabled="selectedBookmarks.length == 0"
                  @click="onDeleteClick"
                  v-translate>
                  Delete selected
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  methods: {
    onDeleteClick() {
      this.currentSettings.deleteBookmarks(...this.selectedBookmarks)
      this.$forceUpdate() // TODO Correct updates
    }
  },

  computed: {
    allBookmarks() {
      return this.currentSettings.bookmarksList
    },
  },
}

Vue.component("settings-panel-bookmarks", SettingsPanelBookmarks)
