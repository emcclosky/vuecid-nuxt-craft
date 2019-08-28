<script>
import axios from 'axios'
import basePage from '~/components/_basePage.vue'
import page from '~/apollo/queries/page'

export default {
  extends: basePage,
  data: () => {
    return {
      page: false
    }
  },
  async asyncData({ params, env, query }) {
    if (query['x-craft-preview'] && query.token) {
      console.info('Preview is displayed!') // eslint-disable-line

      const endpoint = `${env.BACKENDURLPRODUCTION}${env.GRAPHQL_PATH}?token=${query.token}`

      const previewData = await axios
        .post(
          endpoint,
          { query: page.loc.source.body, variables: { slug: params.slug } },
          { headers: { Authorization: `Bearer ${env.GRAPHQL_TOKEN}` } }
        )
        .then(result => {
          if (result && result.data && result.data.data) {
            return result.data.data.entries[0]
          } else {
            return false
          }
        })
        .catch(error => {
          console.log('error: ', error) // eslint-disable-line
        })
      return {
        page: previewData,
        preview: true
      }
    }
    return { preview: false }
  },
  apollo: {
    entries: {
      query: page,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      result(result) {
        // Only set this.page to graphql data if we are not seeing a preview
        if (!this.preview) {
          this.page = result.data.entries[0]
        }
      }
    }
  },
  mounted() {
    // this.log('page: ', this.page)
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
    <BContentSection
      v-if="page"
      class="has-spacing"
      type="div"
      :modifiers="['centered']"
    >
      <BHeading v-if="page.title" :level="1">
        {{ page.title }}
      </BHeading>
      <BRichtext
        v-if="page.richtext && page.richtext.content"
        :content="page.richtext.content"
      />
    </BContentSection>
  </div>
</template>
