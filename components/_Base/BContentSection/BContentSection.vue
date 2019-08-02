<script>
import { classNameMixin } from '~/mixins/classname'

export default {
  name: 'BContentSection',
  mixins: [classNameMixin],
  props: {
    type: {
      type: String,
      default: 'section',
      required: false
    },
    modifiers: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  computed: {
    classnames() {
      return this.className(this.$options.name, this.modifiers)
    }
  }
}
</script>

<template>
  <component :is="type" :class="classnames">
    <slot />
  </component>
</template>

<style src="./BContentSection.scss" lang="scss" />
