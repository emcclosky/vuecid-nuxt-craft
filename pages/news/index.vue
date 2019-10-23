<script>
export default {
  nuxtI18n: {
    // If you change these settings, you need to rerun `$ yarn dev`
    paths: {
      en: '/news', // -> accessible at /news (no prefix since it's the default locale)
      de: '/neuigkeiten' // -> accessible at /de/neuigkeiten
    }
  }
}
</script>

<template>
  <div class="Page Page--news">
    <em>This is the news overview page in locale: «{{ this.$i18n.locale }}»</em>
  </div>
</template>
