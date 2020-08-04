<script>
import { generateModifiers } from '~/mixins/modifiers'

export default {
  name: 'CenterContent',
  mixins: [generateModifiers],
  props: {
    type: {
      type: String,
      default: 'section',
      required: false,
    },
  },
}
</script>

<template>
  <component :is="type" :class="classnames">
    <slot />
  </component>
</template>

<style src="./CenterContent.scss" lang="scss" />
