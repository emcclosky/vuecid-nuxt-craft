<script>
export default {
  name: 'Logo'
}
</script>

<template>
  <div class="Logo">
    <nuxt-link
      class="Logo__link"
      :to="$i18n.path('/', false)"
      aria-label="Go to home page"
    >
      <img
        class="Logo__image"
        src="~/static/media/lucid_logo_typo.svg"
        alt="Logo Image"
      />
    </nuxt-link>
  </div>
</template>

<style src="./Logo.scss" lang="scss" />
