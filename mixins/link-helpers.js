export const linkHelpersMixin = {
  methods: {
    checkLinkIfInternal(url) {
      const frontendURL =
        process.env.NODE_ENV === 'production'
          ? process.env.FRONTENDURLPRODUCTION
          : process.env.FRONTENDURLLOCAL

      if (url && frontendURL && url.includes(frontendURL)) {
        return true
      }
      return false
    },
    prepareNuxtLink(url) {
      if (!url) return
      // eslint-disable-next-line prettier/prettier
      const regex = new RegExp(`(${process.env.FRONTENDURLPRODUCTION})|(${process.env.FRONTENDURLLOCAL})`)
      const nuxtLinkURL = url.replace(regex, '')
      return `${nuxtLinkURL}`
    },
    /*
     * For certain links we know that the link should be internal,
     * but the backend returns a link to the backend nontheless.
     * So we need to transform it into a frontend link
     * @param {string} url - e.g. http://cms.backend.ch/mylink
     * @return {string} – e.g. /mylink
     */
    changeBackendLinkToFrontendLink(url) {
      if (!url) return
      const regex = new RegExp(`(${process.env.BACKENDURLPRODUCTION})|(${process.env.BACKENDURLLOCAL})`) // prettier-ignore
      const nuxtLinkURL = url.replace(regex, '')
      return `${nuxtLinkURL}`
    },
    isExternal(url, type) {
      if (!url) return
      // https://github.com/sebastian-lenz/craft-linkfield
      // This plugin sends type = entry, if a link points to another entry (internal)
      if (type === 'entry') return false
      return !this.checkLinkIfInternal(url)
    },
    link(url, type) {
      // If we know that the link should be internal, remove the backend absolute part
      if (type === 'entry') {
        return this.changeBackendLinkToFrontendLink(url)
      }
      if (url && this.checkLinkIfInternal(url)) {
        return this.prepareNuxtLink(url)
      }
      return url
    }
  }
}
