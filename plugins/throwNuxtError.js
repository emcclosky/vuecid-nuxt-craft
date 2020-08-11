/*
 * Needed to throw an error outside of asyncData and fetch.
 * For example for a failing apollo request.
 */
export default ({ app }, inject) => {
  inject('throwNuxtError', (error) => {
    if (process.client) {
      // eslint-disable-next-line no-undef
      $nuxt.error(error)
    }
  })
}
