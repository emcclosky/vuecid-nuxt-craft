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
  async asyncData ({ params, env, query }) {
    console.log('params: ', query)
    if (query['x-craft-preview'] && query.token) {
      const endpoint = `${env.BACKENDURLPRODUCTION}${env.GRAPHQL_PATH}?token=${query.token}`
      console.log('endpoint: ', endpoint)

      const { data } = await axios.post(
        endpoint,
        { query: `{ entries(section: [pages], slug: "bart-simpson-loves-skateboarding") {
            slug
            title
            ...on Pages {
              richtext {
                totalPages
                content
              }
            }
            }
          }`
        },
        { headers: { Authorization: `Bearer ${env.GRAPHQL_TOKEN}` } }
      ).catch(error => {
        console.log('error: ', error)
      })
      console.log('data: ', data.data.entries)
      return {
        preview: data.data.entries[0].title
      }
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
        this.page = result.data.entries[0]
      }
    }
  },
  mounted() {
    this.log('page: ', this.page)
  }
}
</script>

<template>
  <div class="Page">
    {{ preview }}
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
