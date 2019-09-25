import Vue from "../../node_modules/vue/dist/vue.esm.browser.js"

export const ForumWindow = {
  data: function() {
    return {
      postBodies: ["test reply"],
      postCounter: 0,
    }
  },

  template: `
    <div class="forum-window" style="height: 550px;">
      <router-link to="/">Close</router-link>

      <webview
          ref="forumView"
          src="https://skyscrapercity.com"
          partition="persist:fotorelacjonusz"
          @contentload="forumLoaded">
      </webview>
    </div>
  `,

  computed: {
    nextPost: function() {
      return this.postBodies[this.postCounter]
    },
  },

  methods: {
    tickPostCounter: function() {
      this.postCounter += 1
    },

    forumLoaded: function(e) {
      this.detectPageType()
    },

    executeInForum: function(code, callback = null) {
      let wv = this.$refs.forumView
      return wv.executeScript({code}, callback)
    },

    navigateForumTo: function(url) {
      this.$refs.forumView.src = url
    },

    detectPageType: function() {
      let wv = this.$refs.forumView
      let url = new URL(wv.src)

      if (url.host != "www.skyscrapercity.com") return

      switch(url.pathname) {
        case "/newreply.php": this.itsANewReplyPage() ; break
        case "/showthread.php": this.itsAShowThreadPage() ; break
      }
    },

    signalCompletion: function() {
      this.executeInForum(alert("All the photo report submitted!"))
    },

    itsAShowThreadPage: function() {
      console.log("It is a thread page.")

      if (this.nextPost) {
        this.executeInForum(webviewScripts.getReplyUrl, (results) => {
          let replyUrl = results[0]
          this.navigateForumTo(replyUrl)
        })
      } else {
        this.signalCompletion()
      }
    },

    itsANewReplyPage: function() {
      console.log("It is a new reply page.")

      this.executeInForum(webviewScripts.isThrottled, (results) => {
        let isThrottled = results[0]
        if (isThrottled) {
          console.log("You have been throttled.")
          //TODO Handle submission failed
        } else {
          this.executeInForum(webviewScripts.scrollToForm)
          console.log("Posting a response.")

          this.executeInForum(`
            let postBody = "${this.nextPost}"
            ${webviewScripts.postReply}
          `)

          this.tickPostCounter()
        }
      })
    },

  },
}

Vue.component("forum-window", ForumWindow)

const webviewScripts = {
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
