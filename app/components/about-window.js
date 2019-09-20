import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

export const AboutWindow = {
  template: `
    <div class="about-window">
      About&hellip;<br/>
      <router-link to="/">Close</router-link>
    </div>
  `
}

Vue.component("about-window", AboutWindow)
