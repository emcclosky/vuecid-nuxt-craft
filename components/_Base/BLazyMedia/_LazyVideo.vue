<script>
export default {
  name: 'LazyVideo',
  props: {
    video: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<template>
  <iframe
    frameborder="0"
    class="BLazyMedia__video lazyload"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    :data-src="video.data_src"
  >
  </iframe>
</template>

<style src="./BLazyMedia.scss" lang="scss" />
