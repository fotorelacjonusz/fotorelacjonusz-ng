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
        <p><textarea v-model="pic.text"></textarea></p>
        <p><img :src="pic.displayUrl"></p>
      </li>
    </ol>
  `
}

Vue.component("pic-list", PicList)
