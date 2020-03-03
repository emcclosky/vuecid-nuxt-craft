<script>
import Styleguide from '~/components/Examples/Styleguide/Styleguide.vue'
import DemoGrid from '~/components/Examples/DemoGrid/DemoGrid.vue'

export default {
  name: 'Examples',
  components: {
    DemoGrid,
    Styleguide
  },
  data() {
    // This is an example on how we want an image object coming from craft to look like.
    // See more about the transforms in the (README)[https://github.com/wearelucid/vuecid-nuxt-craft#image-transforms].
    // For our srcset we idealy have 3 sizes (small, medium, large).
    // To use the lazyloading blur effect, we want to have a really low quality image (10-100px in size) from craft.
    // For videos, use the embed link youtube or vimeo provides you like below. // TODO: Make this easier for the end user to fill in.
    const testImage =
      'https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80'
    const testImageLowSrc =
      'https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80'
    const testImageSmall =
      'https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=80'
    const testImageMedium =
      'https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80'
    const testImageLarge =
      'https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80'
    return {
      lazyLoadedImageExample: {
        data_lowsrc: testImageLowSrc,
        data_src: testImage,
        width: 1920,
        height: 2500,
        sizes: {
          small: testImageSmall,
          medium: testImageMedium,
          large: testImageLarge
        }
      },
      lazyLoadedVideoExample: {
        data_src: 'https://www.youtube.com/embed/CV39QzFpJx4'
      }
    }
  },
  mounted() {
    // Type `localStorage.debug = true` in your console to get fancy logs
    this.log('Hello universe')
  }
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
    <BLazyMedia :image="lazyLoadedImageExample" />
    <BHeading :level="2" has-clickable-anchor>Styleguide</BHeading>
    <DemoGrid />
    <BHeading :level="2" has-clickable-anchor>Lazyloaded Video embed</BHeading>
    <BLazyMedia :video="lazyLoadedVideoExample" />
    <Styleguide />
  </div>
</template>

<style src="./Examples.scss" lang="scss" />
