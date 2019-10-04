const Vue = require("vue/dist/vue.common.js")

import "./main-navbar.js"
import "./pic-list.js"

export const MainWindow = {
  template: `
    <div class="main-window flex-window">
      <main-navbar/>
      <pic-list class="spread"/>
    </div>
  `,
}

Vue.component("main-window", MainWindow)
