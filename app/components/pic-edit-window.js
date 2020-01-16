const Vue = require("vue/dist/vue.common.js")

import "./navbar.js"

export const PicEditWindow = {
  data: function() {
    let index = parseInt(this.$route.params.num)

    return {
      index,
      picture: this.report.pictures[index],
    }
  },

  template: `
    <div class="pic-edit-window">
      <navbar>
        <router-link
            to="/"
            class="button is-light"
            v-translate>
            Back
        </router-link>
      </navbar>

      <img class="picture" :src="picture.displayUrl">
    </div>
  `,

  methods: {
    zoomOut() {
      this.$router.push("/")
    },
  },
}

Vue.component("pic-edit-window", PicEditWindow)
