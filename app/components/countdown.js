const Vue = require("vue/dist/vue.common.js")

/// A minimalistic countdown timer.  Emits "zero" event when timer hits 0.
export const Countdown = {
  data() {
    return {
      seconds: 0,
      timer: null,
    }
  },

  template: `
    <span class="countdown">{{displayValue}}</span>
  `,

  computed: {
    displayValue() {
      return this.timer ? `Waiting: ${this.seconds}s` : ""
    }
  },

  methods: {
    /// Sets timer to given number of seconds, and starts the countdown.
    /// If there is a countdown in progress already, it is stopped without
    /// emitting any events.
    restart(seconds) {
      stopTimer.call(this)
      this.seconds = seconds
      startTimer.call(this)
    },
  }
}

Vue.component("countdown", Countdown)

// private

function startTimer() {
  this.timer = setInterval(() => tick.call(this), 1000)
}

function stopTimer() {
  if (this.timer) {
    clearInterval(this.timer)
    this.timer = null
  }
}

function tick() {
  if (this.seconds > 0) {
    this.seconds -= 1
  } else {
    this.$emit("zero")
    stopTimer.call(this)
  }
}
