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

      <div ref="editor" style="height: 800px">

          <canvas></canvas>
          </div>

      <!-- img class="picture" :src="picture.displayUrl" -->
    </div>
  `,

  mounted() { this.setUpEditor() },

  methods: {
    setUpEditor() {

      // var ImageEditor = require('tui-image-editor');
      // var blackTheme = require('./js/theme/black-theme.js');
// var locale_ru_RU = { // override default English locale to your custom
//     'Crop': 'Обзрезать',
//     'Delete-all': 'Удалить всё'
//     // etc...
// };


      this.instance = new ImageEditor(this.$refs.editor, {
     includeUI: {
         loadImage: {
             url: this.picture.displayUrl,
             name: 'SampleImage'
         },
         // locale: locale_ru_RU,
         // theme: blackTheme, // or whiteTheme
         initMenu: 'filter',
         menuBarPosition: 'bottom'
     },
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
        }
      })

      this.instance.loadImageFromURL(this.picture.displayUrl, "wtf")
    },

    zoomOut() {
      this.$router.push("/")
    },
  },
}

Vue.component("pic-edit-window", PicEditWindow)
