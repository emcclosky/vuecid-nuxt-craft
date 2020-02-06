<script>
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit' // Caluculates sizes for responsive image srcset automatically.
import 'lazysizes/plugins/respimg/ls.respimg' // Polyfill for srcset and sizes.
import 'lazysizes/plugins/object-fit/ls.object-fit' // Polyfill for object-fit and object-position.
import 'lazysizes/plugins/attrchange/ls.attrchange' // Polyfill for vue if src changes dynamically.
import 'lazysizes/plugins/blur-up/ls.blur-up' // Blur effect onload of an image through a small image.

export default {
  name: 'BLazyMedia'
}
</script>

<template>
  <div class="BLazyMedia">
    <div class="BLazyMedia__image-wrap">
      <img
        data-sizes="auto"
        data-lowsrc="https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80"
        data-src="https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80"
        src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        data-srcset="https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80 600w, https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80 220w, https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80 300w, https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80 600w, https://images.unsplash.com/photo-1579379234378-d9dfd351b51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1575&q=80 900w"
        alt="test"
        class="BLazyMedia__image lazyload"
      />
    </div>
    <div class="BLazyMedia__video-wrap">
      <iframe
        frameborder="0"
        class="BLazyMedia__video lazyload"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        data-src="//www.youtube.com/embed/ZfV-aYdU4uE"
      >
      </iframe>
    </div>
  </div>
</template>

<style src="./BLazyMedia.scss" lang="scss" />
