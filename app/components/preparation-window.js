const Vue = require("vue/dist/vue.common.js")

export const PreparationWindow = {
  data: function() {
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

      <div class="container uploader-additional-config">
        <webview
          ref="imgurLoginView"
          :src="authURL"
          partition="persist:fotorelacjonusz"
          class="spread"
          style="overflow: hidden;">
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
  `,

  computed: {
    authURL() {
      const urlBase = "https://api.imgur.com/oauth2/authorize"
      const params = new URLSearchParams([
        ["client_id", IMGUR_CLIENT_ID],
        ["response_type", "token"],
      ])
      return [urlBase, params.toString()].join("?")
    }
  }
}

Vue.component("preparation-window", PreparationWindow)
