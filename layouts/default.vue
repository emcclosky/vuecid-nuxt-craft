<script>
import TheSkipNavigationLink from '~/components/_SingleInstance/TheSkipNavigationLink/TheSkipNavigationLink.vue'
import TheHeaderBar from '~/components/_SingleInstance/TheHeaderBar/TheHeaderBar.vue'
import TheFooter from '~/components/_SingleInstance/TheFooter/TheFooter.vue'

export default {
  components: {
    TheSkipNavigationLink,
    TheHeaderBar,
    TheFooter
  },
  methods: {
    setFocusOnMain() {
      // Props to https://www.bignerdranch.com/blog/web-accessibility-skip-navigation-links/
      this.$refs.main.setAttribute('tabindex', -1)
      this.$refs.main.addEventListener('blur focusout', () => {
        this.$refs.skipnavigationlink.removeAttr('tabindex')
      })
      this.$refs.main.focus()
    }
    // Update current breakpoint in ui store if you use vue-breakpoint-component:
    // updateBreakpoint(breakpoint) {
    //   this.$store.commit('ui/UPDATE_BREAKPOINT', breakpoint)
    // }
  }
}
</script>

<template>
  <div class="Layout">
    <!-- Use this with vue-breakpoint-component: -->
    <!-- <client-only><VBreakpoint @input="updateBreakpoint($event)" /></client-only> -->
    <TheSkipNavigationLink
      ref="skipnavigationlink"
      @click.native="setFocusOnMain()"
    />
    <TheHeaderBar />
    <main id="main" ref="main" class="Layout__content">
      <nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<style src="./layout.scss" lang="scss" />
