const Vue = require("vue/dist/vue.common.js")

import { Bookmark } from "../models/bookmark.js"
import { currentSettings } from "../models/settings.js"
import { PostingProcessor } from "../processors/posting.js"
import { UploadingProcessor } from "../processors/uploading.js"

import "./bookmark-dropdown.js"
import "./countdown.js"
import "./navbar.js"

export const ForumWindow = {
  data: function() {
    return {
      postingProcessor: new PostingProcessor(this.report),
      uploadingProcessor: new UploadingProcessor(this.report),
      phase: "initial",
      userBookmarks: currentSettings.bookmarksList,
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
        <bookmark-dropdown
            :user-bookmarks="userBookmarks"
            @bookmarkSelected="goToBookmark"
            @currentPageBookmarked="addBookmark" />
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
    addBookmark() {
      this.executeInForum(webviewScripts.getPageTitle, (results) => {
        let title = results[0]
        let bm = new Bookmark({
          caption: title,
          url: this.getCurrentURL(),
        })

        currentSettings.addBookmarks(bm)

        this.userBookmarks = currentSettings.bookmarksList
      })
    },

    goToBookmark(bookmark) {
      this.navigateForumTo(bookmark.urlPath)
    },

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

    getCurrentURL() {
      let wv = this.$refs.forumView
      return new URL(wv.src)
    },

    detectPageType() {
      if (this.getCurrentURL().host != "www.skyscrapercity.com") return

      switch(this.getCurrentURL().pathname) {
        case "/newreply.php": this.itsANewReplyPage() ; break
        case "/showthread.php": this.itsAShowThreadPage() ; break
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
      this.detectPageType()
    },

    signalCompletion() {
      this.phase = "done"
      global.alert(this.$gettext("All the photo report submitted!"))
      console.info("All the photo report submitted.")
    },

    itsAShowThreadPage() {
      console.log("It is a thread page.")

      if (this.phase === "initial") {
        this.confirmSubmission()
        return
      }

      if (!this.postingProcessor.hasCompleted) {
        this.executeInForum(webviewScripts.getReplyUrl, (results) => {
          let replyUrl = results[0]
          this.navigateForumTo(replyUrl)
        })
      } else {
        this.signalCompletion()
      }
    },

    itsANewReplyPage() {
      console.log("It is a new reply page.")

      this.executeInForum(webviewScripts.isThrottled, (results) => {
        let isThrottled = results[0]
        if (isThrottled) {
          console.log("You have been throttled.")
          //TODO Handle submission failed
        } else {
          this.executeInForum(webviewScripts.scrollToForm)
          console.log("Posting a response.")

          let currentPost = this.postingProcessor.currentPost
          let currentPostJSInjection = JSON.stringify(currentPost)

          // SSC forum requires 30 secs pause between posts.
          let actuallySubmit = () => {
            this.executeInForum(`
              let postBody = ${currentPostJSInjection}
              ${webviewScripts.postReply}
            `)

            this.postingProcessor.step()
          }

          if (this.atFirstPost) {
            actuallySubmit()
          } else {
            this.$refs.postingClock.restart(31)
            this.$refs.postingClock.$once("zero", actuallySubmit)
          }
        }
      })
    },

  },
}

Vue.component("forum-window", ForumWindow)

const webviewScripts = {
  // Title element is cluttered, hence this way it's easier, surprisingly.
  getPageTitle: `
    document.querySelector(".navbar > strong").innerText.trim()
  `,

  getReplyUrl: `
    let replyBtnImgQuery = "html > body > center > div > div.page " +
        "> div > table > tbody > tr > td > a > img[alt=Reply]";
    let replyBtnImg = document.querySelector(replyBtnImgQuery);
    let replyUrl = replyBtnImg.parentElement.href;
    replyUrl;
  `,

  isThrottled: `
    let errorTitle = "The following errors occurred with your submission"
    let acc = false

    for (let candidate of document.querySelectorAll(".tcat")) {
      if (candidate.innerText.includes(errorTitle)) {
        acc = true
      }
    }

    acc
  `,

  postReply: `
    let msgArea = document.querySelector("textarea[name=message]")

    msgArea.value = postBody
    msgArea.closest("form").submit()
  `,

  scrollToForm: `
    let form = document.querySelector("form[name=vbform] .smallfont a")
    form.scrollIntoView()
  `,
}
