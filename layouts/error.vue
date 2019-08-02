<script>
/*
 * Warning: Though this file is placed in the layouts folder, it should be treated as a page.
 * https://nuxtjs.org/guide/views/#error-page
 */

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 404
    },
    message() {
      return this.statusCode === 404
        ? this.$t('error.404')
        : this.$t('error.message')
    }
  },
  methods: {
    clearError() {
      this.$nuxt.error(null) // Clear error
      this.$router.push({ name: `index-${this.$i18n.locale}` }) // Go home
    }
  },
  head() {
    return {
      title: this.$t('error.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('error.message')
        }
      ]
    }
  }
}
</script>

<template>
  <div class="Page Page--error">
    <BContentSection :type="'div'" :modifiers="['centered']">
      <BHeading :level="1">Error {{ statusCode }}</BHeading>
      <BRichtext :content="message" />
      <br />
      <BBtn @click.native="clearError">{{ $t('error.link') }}</BBtn>
      <br /><br />
      <img
        style="width:100%;height:auto;"
        :src="`https://http.cat/${statusCode}.jpg`"
      />
    </BContentSection>
  </div>
</template>
