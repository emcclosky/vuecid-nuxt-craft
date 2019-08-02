<script>
export default {
  name: 'BAlert',
  props: {
    message: {
      type: String,
      required: true
    },
    isError: {
      type: Boolean,
      default: false
    },
    isSuccess: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div
    :class="[$options.name, { 'is-error': isError, 'is-success': isSuccess }]"
  >
    <span class="BAlert__message">{{ message }}</span>
  </div>
</template>

<style src="./BAlert.scss" lang="scss" />
