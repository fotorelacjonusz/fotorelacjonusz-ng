const Vue = require("vue/dist/vue.common.js")

// const { ImageEditor } = require("@toast-ui/vue-image-editor")
// const {ImageEditor} = require('@toast-ui/vue-image-editor');
const ImageEditor = require('tui-image-editor');
export const PicEditWindow = {
  // components: {
  //   "tui-image-editor": ImageEditor,
  // },

  data: function() {
    let index = parseInt(this.$route.params.num)

    return {
      index,
      picture: this.report.pictures[index],
      useDefaultUI: true,
      editorOptions: { // for tui-image-editor component's "options" prop
          cssMaxWidth: 700,
          cssMaxHeight: 500,
      },
    }
  },

  template: `
    <div class="pic-edit-window panning-window">
      <div class="pic-view-icons">
        <font-awesome-icon
          icon="search-minus"
          title="Go back"
          @click="zoomOut" />
      </div>

      <div id="tui-image-editor"></div>

      <img class="picture" :src="picture.displayUrl">
    </div>
  `,

  mounted() {
var instance = new ImageEditor(document.querySelector('#tui-image-editor'), {
    cssMaxWidth: 700,
    cssMaxHeight: 500,
    selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70
    }
});
  },

  methods: {
    zoomOut() {
      this.$router.push("/")
    },
  },
}

Vue.component("pic-edit-window", PicEditWindow)
