<script>
export default {
  name: 'BLazyVideo',
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div class="BLazyVideo">
    <client-only>
      <iframe
        frameborder="0"
        class="BLazyVideo__video lazyload"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        :data-src="video.data_src"
      />
      <!-- this slot will be shown server side but not client side, for better SEO https://nuxtjs.org/api/components-client-only/-->
      <template slot="placeholder">
        <iframe
          frameborder="0"
          class="BLazyVideo__video lazyload"
          :src="video.data_src"
        />
      </template>
    </client-only>
  </div>
</template>

<style src="./BLazyVideo.scss" lang="scss" />
