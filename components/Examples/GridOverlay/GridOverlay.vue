<script>
export default {
  name: 'GridOverlay',
  data: () => {
    return {
      isHidden: true,
    }
  },
  mounted() {
    if (process.env.NODE_ENV) {
      // Keyboard triggered helpers
      document.onkeydown = (e) => {
        const event = e || window.event

        if (e.keyCode === 71 && event.ctrlKey) {
          this.toggleGrid() // ctrl+g
        }
      }
    }
  },
  methods: {
    toggleGrid() {
      this.isHidden = !this.isHidden
    },
  },
}
</script>

<template>
  <div v-if="!isHidden" class="GridOverlay">
    <div class="GridOverlay__grid-wrap">
      <div class="GridOverlay__grid"></div>
    </div>
  </div>
</template>

<style src="./GridOverlay.scss" lang="scss" />
