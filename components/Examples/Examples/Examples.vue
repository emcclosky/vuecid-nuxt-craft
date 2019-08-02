<script>
import { mapState } from 'vuex'
import Styleguide from '~/components/Examples/Styleguide/Styleguide.vue'
import Loader from '~/components/Examples/Loader/Loader.vue'

export default {
  name: 'Examples',
  components: {
    Styleguide,
    Loader
  },
  props: {
    page: {
      type: Object,
      required: true,
      default: null
    }
  },
  mounted() {
    // Type `localStorage.debug = true` in your console to get fancy logs
    this.log('Hello world')
  }
}
</script>

<template>
  <div class="Examples">
    {{ page.make }}<br>
    {{ page.model }}<br>

    <!-- Styleguide -->
    <!-- <BContentSection>
      <BContentSection class="has-spacing" type="div" :modifiers="['centered']">
        <BHeading :level="2" has-clickable-anchor>Styleguide</BHeading>
        <Styleguide />
      </BContentSection>
    </BContentSection> -->
  </div>
</template>

<style src="./Examples.scss" lang="scss" />
