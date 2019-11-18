const VueRouter = require("vue-router")

import { AboutWindow } from "./components/about-window.js"
import { ForumWindow } from "./components/forum-window.js"
import { SettingsWindow } from "./components/settings-window.js"
import { MainWindow } from "./components/main-window.js"

export const router = new VueRouter({
  base: "/",
  routes: [
    { path: "/", component: MainWindow },
    { path: "/about", component: AboutWindow },
    { path: "/forum", component: ForumWindow },
    { path: "/settings", component: SettingsWindow },
  ]
})
