const Vue = require("vue/dist/vue.common.js")

export const PreparationWindow = {
  data() {
    return {
      picturesCount: this.report.pictures.length,
      postsCount: this.report.sliced().length,
    }
  },

  template: `
    <div class="preparation-window centering-window">
      <div class="container">
        <p
            class="has-text-centered"
            v-translate="{pics: picturesCount, posts: postsCount}">
            You are going to post a photo report which consists of
            %{posts} post(s) with %{pics} picture(s) in total.
        </p>
      </div>

      <div class="container buttons-bar">
        <router-link
            to="/"
            class="button is-light"
            v-translate>
            Back
        </router-link>

        <router-link
            to="/forum"
            class="button is-primary"
            v-translate>
            Proceed
        </router-link>
      </div>
    </div>
  `
}

Vue.component("preparation-window", PreparationWindow)
