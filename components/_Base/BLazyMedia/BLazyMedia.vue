<script>
import 'lazysizes' // (github)[https://github.com/aFarkas/lazysizes]
import 'lazysizes/plugins/parent-fit/ls.parent-fit' // Caluculates sizes for responsive image srcset automatically.
import 'lazysizes/plugins/respimg/ls.respimg' // Polyfill for srcset and sizes.
import 'lazysizes/plugins/object-fit/ls.object-fit' // Polyfill for object-fit and object-position.
import 'lazysizes/plugins/attrchange/ls.attrchange' // Polyfill for vue if src changes dynamically.
import 'lazysizes/plugins/blur-up/ls.blur-up' // Blur effect onload of an image through a small image.

import LazyImage from './_LazyImage.vue'
import LazyVideo from './_LazyVideo.vue'

export default {
  name: 'BLazyMedia',
  components: {
    LazyImage,
    LazyVideo
  },
  props: {
    image: {
      type: Object,
      required: false,
      default: () => {}
    },
    video: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
}
</script>

<template>
  <div class="BLazyMedia">
    <client-only>
      <div v-if="image && image.data_src" class="BLazyMedia__image-wrap">
        <LazyImage :image="image" />
      </div>
      <div v-if="video && video.data_src" class="BLazyMedia__video-wrap">
        <LazyVideo :video="video" />
      </div>
    </client-only>
  </div>
</template>

<style src="./BLazyMedia.scss" lang="scss" />
