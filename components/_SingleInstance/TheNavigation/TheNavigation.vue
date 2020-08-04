<script>
import { mapActions, mapGetters } from 'vuex'
// prettier-ignore
import { verifyLeadingSlash, removeTrailingSlash } from '@wearelucid/vuecid-helpers'
import { isHomeSlug } from '@wearelucid/vuecid-craft-helpers'
import config from '~/config'

export default {
  name: 'TheNavigation',
  data: () => {
    return {
      section: config.sectionsInNavigation,
    }
  },
  computed: {
    ...mapGetters('data', ['getMenu', 'langLinks']),
    ...mapGetters('ui', ['navMenuOpen']),
    menu() {
      return this.getMenu(this.section)
    },
    currentSlugs() {
      // passed on to langlinks to get translation of current page
      // news don't have a translation, so we don't have to check for postslugs
      const slug = this.$route.params.slug2 || this.$route.params.slug
      const hasNoTranslation = this.$route.params.postslug

      return {
        slug,
        hasNoTranslation,
      }
    },
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('keyup', this.listenerFunction)
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('keyup', this.listenerFunction)
    }
  },
  methods: {
    ...mapActions('ui', ['toggleMenu', 'closeMenu']),
    listenerFunction(e) {
      this.handleKeyboardEvent(e)
    },
    isHomeSlug(slug) {
      return isHomeSlug(slug)
    },
    removeHomeSlug(slug) {
      if (!slug) return ''
      if (this.isHomeSlug(slug)) {
        let trimmedSlug = slug.replace(config.env.HOMESLUG, '')
        if (trimmedSlug.length) trimmedSlug = removeTrailingSlash(trimmedSlug) // vuecid-helper does not accept empty strings...
        return trimmedSlug
      }
      return slug
    },
    prepareNuxtLink(uri) {
      const route = this.verifyLeadingSlash(this.removeHomeSlug(uri))
      const langPrefix = this.menu?.lang
        ? this.verifyLeadingSlash(this.menu.lang)
        : ''
      // because craft languages are not represented in URIs we need to add them here
      return `${langPrefix}${route}`
    },
    prepareTranslatedNuxtLink(uri, lang) {
      // because all the entries do not know their language, we need to add the lang prefix manually
      // BUT, only for the non-default languages
      const route = this.verifyLeadingSlash(this.removeHomeSlug(uri))
      const langPrefix =
        lang !== config.env.DEFAULTLANG ? this.verifyLeadingSlash(lang) : ''
      return `${langPrefix}${route}`
    },
    verifyLeadingSlash(slug) {
      if (slug) {
        return verifyLeadingSlash(slug)
      }
      return slug
    },
    handleKeyboardEvent(e) {
      const key = e.which || e.keyCode
      if (key === 27) {
        // Esc key
        this.closeMenu()
      }
    },
  },
}
</script>

<template>
  <focus-trap :active="navMenuOpen">
    <nav id="navigation" :class="[$options.name, navMenuOpen ? 'is-open' : '']">
      <client-only>
        <BBurger
          :is-active="navMenuOpen"
          class="TheNavigation__burger"
          @click.native="toggleMenu"
        />
      </client-only>

      <!-- TODO: Adjust tabIndex rules if your navigation is open all the time on desktop! Then you want them to be focusable all the time! -->
      <div :class="['TheNavigation__wrap', navMenuOpen ? 'is-open' : '']">
        <!-- scroll-wrapper is needed to guarantee correct scrolling if list is longer than window -->
        <div v-if="menu" class="TheNavigation__scroll-wrapper" tabIndex="-1">
          <ul :class="['TheNavigation__list']">
            <li
              v-for="(item, key) in menu.data"
              :key="`nav-item-${key}`"
              :class="[
                'TheNavigation__item',
                item.children && item.children.length
                  ? 'TheNavigation__item--has-children'
                  : '',
              ]"
              @click="closeMenu"
            >
              <nuxt-link
                class="TheNavigation__link"
                :to="verifyLeadingSlash(item.uri)"
                :exact="isHomeSlug(item.uri)"
                :tabIndex="navMenuOpen ? 0 : -1"
              >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span v-html="item.title" />
              </nuxt-link>
              <!-- TODO: We should be able to access the subList by tab (A11Y) -->
              <ul
                v-if="item.children && item.children.length"
                class="TheNavigation__sub-list"
              >
                <li
                  v-for="(child, childkey) in item.children"
                  :key="`nav-item-child-${childkey}`"
                  class="TheNavigation__item TheNavigation__item--child"
                  @click="closeMenu"
                >
                  <nuxt-link
                    class="TheNavigation__link"
                    :to="verifyLeadingSlash(child.uri)"
                    :tabIndex="navMenuOpen ? 0 : -1"
                  >
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="child.title" />
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <client-only>
              <li v-if="langLinks" class="TheNavigation__item">
                <span
                  v-for="(item, key) in langLinks(currentSlugs, section)"
                  :key="`nav-lang-${key}`"
                  class="TheNavigation__lang-item"
                  @click="closeMenu"
                >
                  <!-- eslint-disable prettier/prettier -->
                  <BBtn
                    :class="['TheNavigation__link TheNavigation__link--lang TheNavigation__BBtn', $i18n.locale === item.lang ? 'custom-active' : '']"
                    naked
                    :to="item.i18nHandlesRoute ? switchLocalePath(item.lang) : verifyLeadingSlash(item.path)"
                    :exact="$route.name && $route.name.includes('index')"
                    :title="item.name"
                    :disabled="!item.path && !item.i18nHandlesRoute"
                    :tabIndex="navMenuOpen ? 0 : -1"
                  >
                    {{ item.lang }}
                  </BBtn>
                  <!-- eslint-enable prettier/prettier -->
                </span>
              </li>
            </client-only>
          </ul>
        </div>
        <BLoader v-else />
      </div>
    </nav>
  </focus-trap>
</template>

<style src="./TheNavigation.scss" lang="scss" />
