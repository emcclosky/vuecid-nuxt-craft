<script>
import { generateModifiers } from '~/mixins/modifiers'

export default {
  name: 'BLoader',
  mixins: [generateModifiers]
}
</script>

<template>
  <div :class="classnames">
    <span class="BLoader__animation" />
  </div>
</template>

<style src="./BLoader.scss" lang="scss" />
