import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

export const PicList = {
  data: function() {
    return {
      pictures: this.report.pictures,
    }
  },

  template: `
    <ol>
      <li v-for="pic in pictures">
        {{pic.originalFile.name}}
      </li>
    </ol>
  `
}

Vue.component("pic-list", PicList)
