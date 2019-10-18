<script>
import Styleguide from '~/components/Examples/Styleguide/Styleguide.vue'
import DemoGrid from '~/components/Examples/DemoGrid/DemoGrid.vue'

export default {
  name: 'Examples',
  components: {
    DemoGrid,
    Styleguide
  },
  mounted() {
    // Type `localStorage.debug = true` in your console to get fancy logs
    this.log('Hello universe')
  }
}
</script>

<template>
  <div class="Examples">
    <BHeading :level="2" has-clickable-anchor>Nuxt-Child example:</BHeading>
    <p>
      Have a look at
      <nuxt-link to="/examples/hasnuxtchild/lucid">nuxt-child</nuxt-link> in
      action.
    </p>
    <BHeading :level="2" has-clickable-anchor>Styleguide</BHeading>
    <DemoGrid />
    <Styleguide />
  </div>
</template>

<style src="./Examples.scss" lang="scss" />
