const Vue = require("vue/dist/vue.common.js")

export const PicViewWindow = {
  data: function() {
    let index = parseInt(this.$route.params.num)

    return {
      index,
      picture: this.report.pictures[index],
    }
  },

  template: `
    <div class="pic-view-window panning-window">
      <div class="pic-view-icons">
        <font-awesome-icon
          icon="search-minus"
          title="Go back"
          @click="zoomOut" />
      </div>

      <img class="picture" :src="picture.displayUrl">
    </div>
  `,

  methods: {
    zoomOut() {
      this.$router.push("/")
    },
  },
}

Vue.component("pic-view-window", PicViewWindow)
