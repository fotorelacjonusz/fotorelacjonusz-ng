const Vue = require("vue/dist/vue.common.js")

export const Navbar = {
  template: `
    <nav class="my-navbar" role="navigation">
      <slot/>
    </nav>
  `
}

Vue.component("navbar", Navbar)
