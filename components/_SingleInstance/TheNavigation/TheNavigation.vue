<script>
import { mapActions, mapGetters } from 'vuex'
// prettier-ignore
import { isHomeSlug } from '@wearelucid/vuecid-helpers'

export default {
  name: 'TheNavigation',
  computed: {
    ...mapGetters('data', ['getMenu']),
    ...mapGetters('ui', ['navMenuOpen']),
    menu() {
      return this.getMenu('pages')
    }
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('keyup', e => {
        this.handleKeyboardEvent(e)
      })
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('keyup')
    }
  },
  methods: {
    ...mapActions('ui', ['toggleMenu', 'closeMenu']),
    isHomeSlug(slug) {
      return isHomeSlug(slug)
    },
    removeHomeSlug(slug) {
      return this.isHomeSlug(slug) ? '' : `${slug}`
    },
    handleKeyboardEvent(e) {
      const key = e.which || e.keyCode
      if (key === 27) {
        // Esc key
        this.closeMenu()
      }
    },
    generateUri(parentSlug, slug) {
      const childPath = slug ? `/${slug}` : ''
      return `${parentSlug}${childPath}`
    }
  }
}
</script>

<template>
  <nav id="navigation" :class="[$options.name, navMenuOpen ? 'is-open' : '']">
    <client-only>
      <BBurger :is-active="navMenuOpen" @click.native="toggleMenu" />
    </client-only>
    <div :class="['TheNavigation__wrap', navMenuOpen ? 'is-open' : '']">
      <div v-if="menu" class="TheNavigation__scroll-wrapper">
        <div class="TheNavigation__main-nav-wrap">
          <ul :class="['TheNavigation__list']">
            <li
              v-for="(item, key) in menu"
              :key="`nav-item-${key}`"
              :class="[
                'TheNavigation__item',
                item.children && item.children.length
                  ? 'TheNavigation__item--has-children'
                  : ''
              ]"
              @click="closeMenu"
            >
              <nuxt-link
                class="TheNavigation__link"
                :to="$i18n.path(removeHomeSlug(item.slug))"
                :exact="isHomeSlug(item.slug)"
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
                  <nuxt-link class="TheNavigation__link" :to="generateUri(item.slug, child.slug)">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <span v-html="child.title" />
                  </nuxt-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <BLoader v-else />
    </div>
  </nav>
</template>

<style src="./TheNavigation.scss" lang="scss" />
