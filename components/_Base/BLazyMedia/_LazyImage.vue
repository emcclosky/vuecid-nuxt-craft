<script>
export default {
  name: 'LazyImage',
  props: {
    image: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>

<template>
  <img
    data-sizes="auto"
    :data-lowsrc="image.data_lowsrc || false"
    :data-src="image.data_src"
    src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    :data-srcset="
      image.data_srcset
        ? `
      ${image.data_srcset.small.src} ${image.data_srcset.small.breakpoint},
      ${image.data_srcset.medium.src} ${image.data_srcset.medium.breakpoint},
      ${image.data_srcset.large.src} ${image.data_srcset.large.breakpoint}
     `
        : false
    "
    alt="test"
    class="BLazyMedia__image lazyload"
  />
</template>

<style src="./BLazyMedia.scss" lang="scss" />
