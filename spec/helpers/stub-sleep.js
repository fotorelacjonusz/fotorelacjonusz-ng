import * as sleepModule from "../../app/util/sleep.js"

global.noSleep = function() {
  sinon.stub(sleepModule, "sleep")
}
