<script>
import { mapActions, mapGetters } from 'vuex'
// prettier-ignore
import { isHomeSlug, getPathFromUrl } from '@wearelucid/vuecid-helpers'

export default {
  name: 'TheNavigation',
  computed: {
    ...mapGetters('data', ['getMenu', 'langLinks']),
    ...mapGetters('ui', ['showMobileNavigation', 'navMenuOpen']),
    menu() {
      return this.getMenu('main')
    }
  },
  watch: {
    // You need vue-breakpoint-component for this
    showMobileNavigation() {
      if (!this.showMobileNavigation) this.closeMenu()
    }
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('keyup', e => {
        this.handleKeyboardEvent(e)
      })
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('keyup')
    }
  },
  methods: {
    ...mapActions('ui', ['toggleMenu', 'closeMenu']),
    isHomeSlug(slug) {
      return isHomeSlug(slug)
    },
    removeHomeSlug(slug) {
      return this.isHomeSlug(slug) ? '' : `${slug}`
    },
    getPathFromUrl(url) {
      return getPathFromUrl(url)
    },
    handleKeyboardEvent(e) {
      const key = e.which || e.keyCode
      if (key === 27) {
        // Esc key
        this.closeMenu()
      }
    }
  }
}
</script>

<template>
  <nav></nav>
</template>

<style src="./TheNavigation.scss" lang="scss" />
