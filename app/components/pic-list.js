const Vue = require("vue/dist/vue.common.js")

export const PicList = {
  data: function() {
    return {
      pictures: this.report.pictures,
    }
  },

  template: `
    <draggable
        tag="ol"
        class="pic-list"
        :list="pictures"
        :disabled="!draggingAllowed">
        <li v-for="(pic, idx) in pictures" :key="pic.id" class="box pic-item">
          <div class="level pic-item-header">
            <div class="level-left pic-list-number">
                {{idx+1}}.
            </div>

            <div class="level-item hide-on-view-mode-thumbs">
              <textarea
                  v-model="pic.text"
                  class="textarea has-fixed-size "
                  rows="2">
              </textarea>
            </div>

            <div class="level-right pic-list-icons">
              <font-awesome-icon
                  icon="search-plus"
                  class="level-item hide-on-view-mode-large"
                  title="Move up"
                  @click="zoomTo($event)" />
              <font-awesome-icon
                  icon="angle-up"
                  class="level-item hide-on-view-mode-thumbs"
                  title="Move up"
                  @click="report.moveUp(pic)" />
              <font-awesome-icon
                  icon="angle-down"
                  class="level-item hide-on-view-mode-thumbs"
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

          <p class="pic-item-main"><img :src="pic.displayUrl"></p>
        </li>

        <li
            v-if="report.isEmpty"
            class="box has-background-light has-text-weight-medium"
            v-translate>
            The report is empty.
        </li>
    </draggable>
  `,

  computed: {
    draggingAllowed() {
      return this.$parent.viewMode == "thumbs"
    },
  },

  methods: {
    zoomTo(event) {
      const mainWindow = this.$root.$children[0]
      mainWindow.switchViewMode("large")
      const picItem = event.target.closest(".pic-item")
      setTimeout(() => picItem.scrollIntoView(), 50)
    },
  }
}

Vue.component("pic-list", PicList)
