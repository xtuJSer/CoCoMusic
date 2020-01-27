/**
 * format number.
 * @example
 * // returns '11'
 * formatNumber(11)
 * @example
 * // returns '03'
 * formatNumber(3)
 * @param {number} num
 * @returns {string}
 */
export function formatNumber (num) {
  return num < 10 ? `0${num}` : num
}

/**
 * format player time.
 * @example
 * // returns '03:11'
 * formatPlayerTime(191)
 * @param {number} time
 * @returns {string}
 */
export function formatPlayerTime (time) {
  var minutes = formatNumber(Math.floor(time / 60))
  var seconds = formatNumber(Math.floor(time % 60))
  return `${minutes}:${seconds}`
}
