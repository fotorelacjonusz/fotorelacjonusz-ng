const Vue = require("vue/dist/vue.common.js")

export const BookmarkDropdown = {
  data: function() {
    return {
      defaultBookmarks: [
        {
          caption: this.$gettext("Forum main page"),
          urlPath: "https://skyscrapercity.com/",
        },
        {
          caption: this.$gettext("User Control Panel"),
          urlPath: "https://skyscrapercity.com/usercp.php",
        },
        {
          caption: this.$gettext("Subscriptions"),
          urlPath: "https://skyscrapercity.com/subscription.php",
        },
      ],
    }
  },

  template: `
    <div class="dropdown">
      <div class="dropdown-trigger">
        <button class="button is-light" @click="toggleDropdown">
          <translate>Go to</translate>
          <span class="icon is-small">
            <font-awesome-icon icon="angle-down" />
          </span>
        </button>
      </div>

      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a v-for="bm in defaultBookmarks"
              class="dropdown-item"
              :title="bm.urlPath"
              @click="selectBookmark(bm)">
              {{ bm.caption }}
          </a>
        </div>
      </div>
    </div>
  `,

  methods: {
    selectBookmark(bookmark) {
      this.$emit("bookmarkSelected", bookmark)
      this.toggleDropdown()
    },

    toggleDropdown() {
      this.$el.classList.toggle("is-active")
    },
  },
}

Vue.component("bookmark-dropdown", BookmarkDropdown)
