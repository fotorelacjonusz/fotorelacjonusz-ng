const Vue = require("vue/dist/vue.common.js")

// const { ImageEditor } = require("@toast-ui/vue-image-editor")
// const {ImageEditor} = require('@toast-ui/vue-image-editor');
const ImageEditor = require("tui-image-editor")

// const whiteTheme = require("tui-image-editor/js/ui/theme")


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

      <div ref="editor"></div>

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

const icona = ('node_modules/tui-image-editor/dist/svg/icon-a.svg')
const iconb = ('node_modules/tui-image-editor/dist/svg/icon-b.svg')
const iconc = ('node_modules/tui-image-editor/dist/svg/icon-c.svg')
const icond = ('node_modules/tui-image-editor/dist/svg/icon-d.svg')
// const icona = require('tui-image-editor/dist/svg/icon-a.svg')
// const iconb = require('tui-image-editor/dist/svg/icon-b.svg')
// const iconc = require('tui-image-editor/dist/svg/icon-c.svg')
// const icond = require('tui-image-editor/dist/svg/icon-d.svg')
//const bg = require('tui-image-editor/examples/img/bg.png')
var th = { // or white
  // main icons
  'menu.normalIcon.path': icond,
  'menu.activeIcon.path': iconb,
  'menu.disabledIcon.path': icona,
  'menu.hoverIcon.path': iconc,
}


      this.instance = new ImageEditor(this.$refs.editor, {
     includeUI: {
         // loadImage: {
         //     path: this.picture.displayUrl,
         //     name: 'SampleImage',
         // },
          menu: ['shape', 'crop'],
     //     // locale: locale_ru_RU,
         theme: th,
         initMenu: 'filter',
         menuBarPosition: 'right',
     },
                  usageStatistics: false,
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
        }
      })

      this.instance.loadImageFromURL(this.picture.displayUrl, "wtf").then(result => {
     console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
     console.log('new : ' + result.newWidth + ', ' + result.newHeight);
});
    },

    zoomOut() {
      this.$router.push("/")
    },
  },
}

Vue.component("pic-edit-window", PicEditWindow)
