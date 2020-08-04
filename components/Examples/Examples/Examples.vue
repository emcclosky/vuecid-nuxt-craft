<script>
import Styleguide from '~/components/Examples/Styleguide/Styleguide.vue'
import DemoGrid from '~/components/Examples/DemoGrid/DemoGrid.vue'

export default {
  name: 'Examples',
  components: {
    DemoGrid,
    Styleguide,
  },
  data() {
    // This is an example on how we want an image object coming from craft to look like.
    // More about the transforms in craft: https://github.com/wearelucid/vuecid-craft#image-transforms.
    // For our srcset we idealy have 3 sizes (small, medium, large).
    // To use the lazyloading blur effect, we want to have a really low quality image (10-100px in size) from craft.
    // For videos, use the embed link youtube or vimeo provides you like below. // TODO: Make this easier for the end user to fill in.
    const testImage = 'https://source.unsplash.com/mEBOHfzuPHk/1920x1080'
    const testImageLowSrc = 'https://source.unsplash.com/mEBOHfzuPHk/100x56'
    const testImageSmall = 'https://source.unsplash.com/mEBOHfzuPHk/720x405'
    const testImageMedium = 'https://source.unsplash.com/mEBOHfzuPHk/1280x720'
    const testImageLarge = testImage
    return {
      lazyLoadedImageExample: {
        lowsrc: testImageLowSrc,
        src: testImage,
        alt: 'Funny man with mustache',
        sizes: {
          small: testImageSmall,
          medium: testImageMedium,
          large: testImageLarge,
        },
      },
      lazyLoadedVideoExample: {
        data_src: 'https://www.youtube.com/embed/3e4nQTFhieo',
      },
    }
  },
  mounted() {
    // Type `localStorage.debug = true` in your console to get fancy logs
    this.log('Hello universe')
  },
}
</script>

<template>
  <div class="Examples">
    <BHeading :level="2" has-clickable-anchor>Nuxt-Child example:</BHeading>
    <p>
      Have a look at
      <nuxt-link to="/examples/hasnuxtchild/lucid">nuxt-child</nuxt-link> in
      action.
    </p>
    <BHeading :level="2" has-clickable-anchor>Lazyloaded Image</BHeading>
    <BLazyImage :image="lazyLoadedImageExample" />
    <BHeading :level="2" has-clickable-anchor>Styleguide</BHeading>
    <DemoGrid />
    <BHeading :level="2" has-clickable-anchor>Lazyloaded Video embed</BHeading>
    <BLazyVideo :video="lazyLoadedVideoExample" />
    <Styleguide />
  </div>
</template>

<style src="./Examples.scss" lang="scss" />
