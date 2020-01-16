const Vue = require("vue/dist/vue.common.js")

const loadImage = require("blueimp-load-image")

import { Picture } from "../models/picture.js"

export const PicListItem = {
  props: {
    picture: {type: Picture, required: true},
    index: {type: Number, required: true},
  },

  created() {
    // TODO Replace that with "image-orientation: from image" CSS property
    // when Chromium supports it, probably starting from Chromium 81.
    // https://caniuse.com/#feat=css-image-orientation
    loadImage(
      this.picture.originalFile,
      this.renderPicture,
      {
        noRevoke: true,
        orientation: true,
      },
    )
  },

  template: `
    <li class="box pic-item">
      <div class="level pic-item-header">
        <div class="level-left pic-list-number">
            {{index+1}}.
        </div>

        <div class="level-item hide-on-view-mode-thumbs">
          <textarea
              v-model="picture.text"
              class="textarea has-fixed-size "
              rows="2">
          </textarea>
        </div>

        <div class="level-right pic-list-icons">
          <font-awesome-icon
              icon="palette"
              class="level-item"
              title="Edit"
              @click="edit(index)" />
          <font-awesome-icon
              icon="search-plus"
              class="level-item hide-on-view-mode-large"
              title="Move up"
              @click="zoomTo($event)" />
          <font-awesome-icon
              icon="angle-up"
              class="level-item hide-on-view-mode-thumbs"
              title="Move up"
              @click="report.moveUp(picture)" />
          <font-awesome-icon
              icon="angle-down"
              class="level-item hide-on-view-mode-thumbs"
              title="Move down"
              @click="report.moveDown(picture)" />
          <font-awesome-icon
              icon="angle-double-up"
              class="level-item"
              title="Move to top"
              @click="report.moveToTop(picture)" />
          <font-awesome-icon
              icon="angle-double-down"
              class="level-item"
              title="Move to bottom"
              @click="report.moveToBottom(picture)" />
          <font-awesome-icon
              icon="trash"
              class="level-item"
              title="Delete from the report"
              @click="report.deletePicture(picture)" />
        </div>
      </div>

      <p class="pic-item-main" ref="imageWrapper"></p>
    </li>
  `,

  methods: {
    edit(idx) {
      this.$router.push(`/edit/${idx}`)
    },

    renderPicture(canvasElement) {
      this.$refs.imageWrapper.appendChild(canvasElement)
    },

    zoomTo(event) {
      const mainWindow = this.$root.$children[0]
      mainWindow.switchViewMode("large")
      const picItem = event.target.closest(".pic-item")
      setTimeout(() => picItem.scrollIntoView(), 50)
    },
  }
}

Vue.component("pic-list-item", PicListItem)
