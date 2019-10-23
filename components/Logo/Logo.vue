<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Logo',
  computed: {
    ...mapGetters('ui', ['navMenuOpen'])
  },
  methods: {
    ...mapActions('ui', ['closeMenu']),
    close() {
      this.closeMenu()
    }
  }
}
</script>

<template>
  <div class="Logo" @click="close">
    <nuxt-link class="Logo__link" to="/" aria-label="Go to home page">
      <img
        class="Logo__image"
        src="~/static/media/lucid_logo_typo.svg"
        alt="Logo Image"
      />
    </nuxt-link>
  </div>
</template>

<style src="./Logo.scss" lang="scss" />
