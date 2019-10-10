import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

export const PicList = {
  data: function() {
    return {
      pictures: this.report.pictures,
    }
  },

  template: `
    <ol class="pic-list">
      <li v-for="pic in pictures" class="box">
        <div class="level">
          <div class="level-item">
            <textarea
                v-model="pic.text"
                class="textarea has-fixed-size "
                rows="2">
            </textarea>
          </div>
        </div>

        <p><img :src="pic.displayUrl"></p>
      </li>
    </ol>
  `
}

Vue.component("pic-list", PicList)
