import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

Vue.component("pic-list", {
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
})
