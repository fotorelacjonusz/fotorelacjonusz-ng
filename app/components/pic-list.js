const Vue = require("vue/dist/vue.common.js")

export const PicList = {
  data: function() {
    return {
      pictures: this.report.pictures,
    }
  },

  template: `
    <ol class="pic-list">
      <li v-for="(pic, idx) in pictures" class="box pic-item">
        <div class="level">
          <div class="level-left pic-list-number">
              {{idx+1}}.
          </div>

          <div class="level-item">
            <textarea
                v-model="pic.text"
                class="textarea has-fixed-size "
                rows="2">
            </textarea>
          </div>

          <div class="level-right pic-list-icons">
            <font-awesome-icon
                icon="angle-up"
                class="level-item"
                title="Move up"
                @click="report.moveUp(pic)" />
            <font-awesome-icon
                icon="angle-down"
                class="level-item"
                title="Move down"
                @click="report.moveDown(pic)" />
            <font-awesome-icon
                icon="angle-double-up"
                class="level-item"
                title="Move to top"
                @click="report.moveToTop(pic)" />
            <font-awesome-icon
                icon="angle-double-down"
                class="level-item"
                title="Move to bottom"
                @click="report.moveToBottom(pic)" />
            <font-awesome-icon
                icon="trash"
                class="level-item"
                title="Delete from the report"
                @click="report.deletePicture(pic)" />
          </div>
        </div>

        <p><img :src="pic.displayUrl"></p>
      </li>

      <li
          v-if="report.isEmpty"
          class="box has-background-light has-text-weight-medium"
          v-translate>
          The report is empty.
      </li>
    </ol>
  `
}

Vue.component("pic-list", PicList)
