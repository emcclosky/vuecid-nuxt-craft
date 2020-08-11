<script>
/*
 * Warning: Though this file is placed in the layouts folder, it should be treated as a page.
 * https://nuxtjs.org/guide/views/#error-page
 */
import { mapState } from 'vuex'
import CenterContent from '~/components/Examples/CenterContent/CenterContent.vue'

export default {
  components: {
    CenterContent,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapState('ui', ['previewActive']),
    statusCode() {
      return (this.error && this.error.statusCode) || 404
    },
    message() {
      if (process.env.NODE_ENV === 'development') {
        return this.error.message
      }
      // For production use less verbose and more controlled error messages
      return this.statusCode === 404
        ? this.$t('error.404')
        : this.$t('error.message')
    },
  },
  methods: {
    clearError() {
      this.$nuxt.error(null) // Clear error
      this.$router.push({ name: `index-${this.$i18n.locale}` }) // Go home
    },
  },
  head() {
    return {
      title: this.$t('error.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('error.message'),
        },
      ],
    }
  },
}
</script>

<template>
  <div class="Page Page--error">
    <CenterContent :modifiers="['centered']">
      <BHeading :level="1">Error {{ statusCode }}</BHeading>
      <BRichtext :content="message" />
      <br />
      <BBtn @click.native="clearError">{{ $t('error.link') }}</BBtn>
    </CenterContent>
  </div>
</template>
