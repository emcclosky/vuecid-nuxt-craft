<script>
import Styleguide from '~/components/Examples/Styleguide/Styleguide.vue'

export default {
  name: 'Examples',
  components: {
    Styleguide
  },
  props: {
    page: {
      type: [Object, Array],
      required: true,
      default: null
    }
  },
  mounted() {
    // Type `localStorage.debug = true` in your console to get fancy logs
    this.log('Hello universe')
  }
}
</script>

<template>
  <div class="Examples">
    <!-- Styleguide -->
    <BContentSection>
      <BContentSection class="has-spacing" type="div" :modifiers="['centered']">
        <BHeading :level="2" has-clickable-anchor>Styleguide</BHeading>
        <Styleguide />
      </BContentSection>
    </BContentSection>
  </div>
</template>

<style src="./Examples.scss" lang="scss" />
