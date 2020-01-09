const Vue = require("vue/dist/vue.common.js")

export const Navbar = {
  template: `
    <nav class="my-navbar" role="navigation">
      <slot/>

      <div class="is-pulled-right">
        <slot name="right"/>
      </div>
    </nav>
  `
}

Vue.component("navbar", Navbar)
