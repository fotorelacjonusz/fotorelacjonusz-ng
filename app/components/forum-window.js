const Vue = require("vue/dist/vue.common.js")

import { PostingProcessor } from "../processors/posting.js"
import { UploadingProcessor } from "../processors/uploading.js"

import "./countdown.js"
import "./navbar.js"

export const ForumWindow = {
  data: function() {
    return {
      postingProcessor: new PostingProcessor(this.report),
      uploadingProcessor: new UploadingProcessor(this.report),
      phase: "initial",
    }
  },

  template: `
    <div class="forum-window flex-window">
      <navbar>
        <router-link
            to="/"
            v-show="phase === 'initial'"
            class="button is-light"
            v-translate>
            Back
        </router-link>
        <router-link
            to="/"
            v-show="phase === 'started'"
            class="button is-danger"
            v-translate>
            Abort
        </router-link>
        <router-link
            to="/"
            v-show="phase === 'done'"
            class="button is-primary"
            v-translate>
            Done
        </router-link>
        <span
            class="button my-navbar-span"
            v-translate="{progress: uploadProgress}">
            Upload: %{progress}
        </span>
        <span
            class="button my-navbar-span"
            v-translate="{progress: postingProgress}">
            Posting: %{progress}
        </span>
        <span class="button my-navbar-span">
            <countdown ref="postingClock"/>
        </span>
      </navbar>

      <webview
          ref="forumView"
          src="https://skyscrapercity.com"
          partition="persist:fotorelacjonusz"
          class="spread"
          :class="[phase === 'started' ? 'shadowed' : '']"
          style="overflow: hidden;"
          @contentload="forumLoaded">
      </webview>
    </div>
  `,

  computed: {
    uploadProgress() {
      return Math.round(100 * this.uploadingProcessor.progress) + "%"
    },

    postingProgress() {
      return Math.round(100 * this.postingProcessor.progress) + "%"
    },

    atFirstPost() {
      let currentPost = this.postingProcessor.currentPost
      let firstPost = this.postingProcessor.allPosts[0]
      return currentPost === firstPost
    },
  },

  methods: {
    forumLoaded(_event) {
      this.detectPageType()
    },

    executeInForum(code, callback = null) {
      let wv = this.$refs.forumView
      return wv.executeScript({code}, callback)
    },

    navigateForumTo(url) {
      this.$refs.forumView.src = url
    },

    detectPageType() {
      let wv = this.$refs.forumView
      let url = new URL(wv.src)

      if (url.host != "www.skyscrapercity.com") return

      if (url.pathname.startsWith("/threads/")) {
        this.itsAShowThreadPage()
      }
    },

    confirmSubmission() {
      this.executeInForum(webviewScripts.getPageTitle, (results) => {
        let title = results[0].trim()
        let msgRaw = this.$gettext(
          "Do you want to post a photo report in %{title}?"
        )
        let msg = this.$gettextInterpolate(msgRaw, {title})
        if (global.confirm(msg)) {
          this.startSubmission()
        }
      })
    },

    async startSubmission() {
      await this.uploadingProcessor.perform()
      this.postingProcessor.prepare()
      this.phase = "started"
      this.continueSubmission()
    },

    signalCompletion() {
      this.phase = "done"
      global.alert(this.$gettext("All the photo report submitted!"))
      console.info("All the photo report submitted.")
    },

    continueSubmission() {
      if (!this.postingProcessor.hasCompleted) {
        this.addAnotherPost()
      } else {
        this.signalCompletion()
      }
    },

    itsAShowThreadPage() {
      console.log("It is a thread page.")

      if (this.phase === "initial") {
        this.confirmSubmission()
        return
      }
    },

    addAnotherPost() {
      console.log("Posting a response.")
      this.executeInForum(webviewScripts.scrollToForm)

      if (this.atFirstPost) {
        this.actuallySubmitAnotherPost()
      } else {
        // SSC forum requires some pause between posts. Ten seconds is enough.
        this.$refs.postingClock.restart(11)
        this.$refs.postingClock.$once("zero", this.actuallySubmitAnotherPost)
      }
    },

    actuallySubmitAnotherPost() {
      let currentPost = this.postingProcessor.currentPost
      let currentPostJSInjection = JSON.stringify(currentPost)

      this.executeInForum(`
        (function(postBody) {
          ${webviewScripts.postReply}
        })(${currentPostJSInjection})
      `)

      this.postingProcessor.step()
      this.$nextTick().then(() => this.continueSubmission())
    },
  },
}

Vue.component("forum-window", ForumWindow)

const webviewScripts = {
  getPageTitle: `
    document.querySelector("meta[property='og:title']").content.trim()
  `,

  // Requires "postBody" variable to be set somehow.
  postReply: `
    let form = document.
      querySelector("form.js-quickReply")

    let msgAreaHtml = form.querySelector("textarea[name=message_html]")

    if (msgAreaHtml) {
      msgAreaHtml.name = ""
    }

    let msgArea = form.querySelector("textarea[name=message]")

    if (!msgArea) {
      msgArea = document.createElement("textarea")
      msgArea.name = "message"
      msgArea.style = "display: none;"
      form.appendChild(msgArea)
    }

    msgArea.value = postBody
    form.submit()
  `,

  scrollToForm: `
    document.querySelector("form.js-quickReply .message").scrollIntoView()
  `,
}
