<script>
import basePage from '~/components/_basePage.vue'
import page from '~/apollo/queries/page'

export default {
  extends: basePage,
  data: () => {
    return {
      page: false,
      seomatic: {}
    }
  },
  apollo: {
    entries: {
      query: page,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      result(result) {
        if (!result.data || !result.data.entries || !result.data.entries.length) { // eslint-disable-line
          console.warn('The apollo query did not return a result.') // eslint-disable-line
          return
        }
        this.page = result.data.entries[0]
        this.seomatic.metaTitleContainer = JSON.parse(result.data.entries[0].seomatic.metaTitleContainer) // eslint-disable-line
        this.seomatic.metaTagContainer = JSON.parse(result.data.entries[0].seomatic.metaTagContainer) // eslint-disable-line
        this.seomatic.metaLinkContainer = JSON.parse(result.data.entries[0].seomatic.metaLinkContainer) // eslint-disable-line
        this.seomatic.metaJsonLdContainer = JSON.parse(result.data.entries[0].seomatic.metaJsonLdContainer) // eslint-disable-line
      }
    }
  },
  mounted() {
    this.log('page: ', this.page)
    this.log('seomatic: ', this.seomatic)
  }
}
</script>

<template>
  <div class="Page">
    <BContentSection
      :modifiers="['centered']"
      style="background: #efefef; text-align: center; padding: 1em;"
    >
      <em>This is a _slug page</em>
    </BContentSection>
    <BContentSection class="has-spacing" type="div" :modifiers="['centered']">
      <BHeading v-if="page.title" :level="1">
        {{ page.title }}
      </BHeading>
      <div v-if="page.richtext && page.richtext.content">
        {{ page.richtext }}
      </div>
      <BRichtext
        v-if="page.richtext && page.richtext.content"
        :content="page.richtext.content"
      />
    </BContentSection>
  </div>
</template>
