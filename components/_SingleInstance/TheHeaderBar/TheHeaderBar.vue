<script>
import TheNavigation from '~/components/_SingleInstance/TheNavigation/TheNavigation.vue'
import Logo from '~/components/Logo/Logo.vue'

export default {
  name: 'TheHeaderBar',
  components: {
    TheNavigation,
    Logo
  }
}
</script>

<template>
  <header class="TheHeaderBar">
    <div class="TheHeaderBar__item">
      <Logo />
    </div>
    <div class="TheHeaderBar__item">
      <TheNavigation />
    </div>
  </header>
</template>

<style src="./TheHeaderBar.scss" lang="scss" />
