const Vue = require("vue/dist/vue.common.js")

export const FilePicker = {
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
    onFilesChange: function(_event) {
      for (var file of this.$refs.pickerInput.files) {
        this.emitFile(file)
      }
      this.clearInput()
    },
  },

  template: `
    <label>
      <input
          ref="pickerInput"
          style="display: none;"
          type=file
          accept="image/png, image/jpeg"
          multiple
          v-on:change="onFilesChange">
      </input>
      <translate>Add photos</translate>
    </label>
  `
}

Vue.component("file-picker", FilePicker)
