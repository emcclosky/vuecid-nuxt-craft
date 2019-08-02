<script>
import { getPathFromUrl } from '@wearelucid/vuecid-helpers'

export default {
  name: 'PostsList',
  props: {
    posts: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    getPathFromUrl(url) {
      return getPathFromUrl(url)
    }
  }
}
</script>

<template>
  <ul v-if="posts.length" class="PostsList">
    <li v-for="post of posts" :key="post.title" class="PostsList__item">
      <nuxt-link class="PostsList__link" :to="getPathFromUrl(post.link)">
        {{ post.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<style src="./PostsList.scss" lang="scss" />
