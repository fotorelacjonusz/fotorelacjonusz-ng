/**
 * Returns promise which succeeds after given miliseconds.
 * Mainly meant to be used to sleep async function for a while.
 *
 * Example:
 *     await sleep(500) // will pause for half a second
 */
export function sleep(miliSeconds) {
  return new Promise(r => setTimeout(r, miliSeconds))
}
