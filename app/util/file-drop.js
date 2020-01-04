export function attachFileDrop(app) {
  window.ondragover = function(e) {
    e.preventDefault()

    if (currentWindowAcceptsFileDrop() && eventCarriesFiles(e)) {
      e.dataTransfer.dropEffect = "copy"
    }
  }

  window.ondrop = function(e) {
    e.preventDefault()

    if (currentWindowAcceptsFileDrop()) {
      addFiles(e.dataTransfer.files)
    }
  }

  function currentWindowAcceptsFileDrop() {
    const currentWindow = app.$children[0]
    return currentWindow.$el.classList.contains("accepts-file-drop")
  }

  function eventCarriesFiles(e) {
    return e.dataTransfer.files && e.dataTransfer.files.length > 0
  }

  function addFiles(dataTransferFiles) {
    for (const file of dataTransferFiles) {
      app.report.addPicture(file)
    }
  }
}
