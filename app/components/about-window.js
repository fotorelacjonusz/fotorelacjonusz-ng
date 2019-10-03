import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

export const AboutWindow = {
  template: `
    <div class="about-window flex-window">
      <nav class="my-navbar">
        <router-link to="/" class="button is-light">Back</router-link>
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
