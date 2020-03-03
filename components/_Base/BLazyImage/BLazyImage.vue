<script>
export default {
  name: 'BLazyImage',
  props: {
    image: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="BLazyImage">
    <client-only>
      <img
        data-sizes="auto"
        :data-lowsrc="image.lowsrc || false"
        :data-src="image.src"
        src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        :data-srcset="
          image.sizes
            ? `
          ${image.sizes.small} 720w,
          ${image.sizes.medium} 1280w,
          ${image.sizes.large} 1920w
         `
            : false
        "
        alt="test"
        class="BLazyImage__image lazyload"
      />
      <!-- this slot will be shown server side but not client side, for better SEO https://nuxtjs.org/api/components-client-only/-->
      <template slot="placeholder">
        <img :src="image.src" :alt="image.alt" class="BLazyImage__image" />
      </template>
    </client-only>
  </div>
</template>

<style src="./BLazyImage.scss" lang="scss" />
