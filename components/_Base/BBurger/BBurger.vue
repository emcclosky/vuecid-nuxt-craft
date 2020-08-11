<script>
export default {
  name: 'BBurger',
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<template>
  <button
    type="button"
    :class="[$options.name, isActive ? 'is-active' : '']"
    aria-label="Open Navigation Menu"
    aria-haspopup="true"
    :aria-expandend="isActive"
    aria-controls="navigation"
  >
    <div class="BBurger__burger" />
  </button>
</template>

<style src="./BBurger.scss" lang="scss" />
