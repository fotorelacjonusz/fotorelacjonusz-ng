import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

export const ForumWindow = {
  template: `
    <div class="forum-window" style="height: 550px;">
      <router-link to="/">Close</router-link>

      <webview></webview>
    </div>
  `,
}

Vue.component("forum-window", ForumWindow)
