import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

Vue.component("file-picker", {
  methods: {
    /// Clears the control's file list.
    clearInput: function() {
      this.$refs.pickerInput.files = new FileList()
    },

    /// Adds given file to a current photo report.
    emitFile: function(file) {
      console.log(`Selected file: ${file.name}`)
      this.report.addPicture(file)
    },

    /// Emits fileSelected event once per each file, then clears the input.
    onFilesChange: function(event) {
      for (var file of this.$refs.pickerInput.files) {
        this.emitFile(file)
      }
      this.clearInput()
    },
  },

  template: `
    <div class="file-picker">
      <input ref="pickerInput" type=file accept="image/png, image/jpeg" multiple v-on:change="onFilesChange"></input>
    </div>
  `
})
