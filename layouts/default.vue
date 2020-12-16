<script>
import { mapState } from 'vuex'
import TheSkipNavigationLink from '~/components/_SingleInstance/TheSkipNavigationLink/TheSkipNavigationLink.vue'
import TheHeaderBar from '~/components/_SingleInstance/TheHeaderBar/TheHeaderBar.vue'
import TheFooter from '~/components/_SingleInstance/TheFooter/TheFooter.vue'

export default {
  components: {
    TheSkipNavigationLink,
    TheHeaderBar,
    TheFooter,
  },
  computed: {
    ...mapState('ui', ['previewActive']),
  },
  methods: {
    setFocusOnMain() {
      // Props to https://www.bignerdranch.com/blog/web-accessibility-skip-navigation-links/
      this.$refs.main.setAttribute('tabindex', -1)
      this.$refs.main.addEventListener('blur focusout', () => {
        this.$refs.skipnavigationlink.removeAttr('tabindex')
      })
      this.$refs.main.focus()
    },
  },
}
</script>

<template>
  <div class="Layout">
    <TheSkipNavigationLink
      ref="skipnavigationlink"
      @click.native="setFocusOnMain()"
    />
    <TheHeaderBar />
    <main id="main" ref="main" class="Layout__content">
      <nuxt />
    </main>
    <BAlert v-if="previewActive" message="Preview" />
    <TheFooter />
  </div>
</template>

<style src="./layout.scss" lang="scss" />
