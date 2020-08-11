<script>
import { mapGetters } from 'vuex'
import TheNavigation from '~/components/_SingleInstance/TheNavigation/TheNavigation.vue'
import Logo from '~/components/Logo/Logo.vue'

export default {
  name: 'TheHeaderBar',
  components: {
    TheNavigation,
    Logo,
  },
  computed: {
    ...mapGetters('ui', ['navMenuOpen']),
  },
}
</script>

<template>
  <header :class="['TheHeaderBar', navMenuOpen ? 'has-open-nav' : '']">
    <div class="TheHeaderBar__item">
      <Logo class="TheHeaderBar__logo TheHeaderBar__Logo" />
    </div>
    <div class="TheHeaderBar__item TheHeaderBar__item--nav">
      <TheNavigation />
    </div>
  </header>
</template>

<style src="./TheHeaderBar.scss" lang="scss" />
