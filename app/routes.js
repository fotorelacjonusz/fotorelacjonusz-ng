const VueRouter = require("vue-router")

import { AboutWindow } from "./components/about-window.js"
import { ForumWindow } from "./components/forum-window.js"
import { PreparationWindow } from "./components/preparation-window.js"
import { SettingsWindow } from "./components/settings-window.js"
import { MainWindow } from "./components/main-window.js"
import { PicViewWindow } from "./components/pic-edit-window.js"

export const router = new VueRouter({
  base: "/",
  routes: [
    { path: "/", component: MainWindow },
    { path: "/about", component: AboutWindow },
    { path: "/preparation", component: PreparationWindow },
    { path: "/forum", component: ForumWindow },
    { path: "/zoom/:num", component: PicEditWindow },
    { path: "/settings", component: SettingsWindow },
  ]
})
