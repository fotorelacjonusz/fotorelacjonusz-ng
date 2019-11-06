const Vue = require("vue/dist/vue.common.js")

export const AboutWindow = {
  template: `
    <div class="about-window flex-window">
      <nav class="my-navbar">
        <router-link
            to="/"
            class="button is-light"
            v-translate>
            Back
        </router-link>
      </nav>

      <div class="hero">
      <article class="hero-body container">
        <p class="">About&hellip;</p>
      </article>
        </div>
    </div>
  `
}

Vue.component("about-window", AboutWindow)
