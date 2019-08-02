<script>
import { mapActions, mapGetters } from 'vuex'
// prettier-ignore
import { isHomeSlug, getPathFromUrl } from '@wearelucid/vuecid-helpers'

export default {
  name: 'TheNavigation',
  computed: {
    ...mapGetters('data', ['getMenu', 'langLinks']),
    ...mapGetters('ui', ['showMobileNavigation', 'navMenuOpen']),
    menu() {
      return this.getMenu('main')
    }
  },
  watch: {
    // You need vue-breakpoint-component for this
    showMobileNavigation() {
      if (!this.showMobileNavigation) this.closeMenu()
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
    getPathFromUrl(url) {
      return getPathFromUrl(url)
    },
    handleKeyboardEvent(e) {
      const key = e.which || e.keyCode
      if (key === 27) {
        // Esc key
        this.closeMenu()
      }
    }
  }
}
</script>

<template>
  <nav
    v-if="menu.items"
    id="navigation"
    :class="[$options.name, navMenuOpen ? 'is-open' : '']"
  >
    <no-ssr>
      <BBurger :is-active="navMenuOpen" @click.native="toggleMenu" />
    </no-ssr>
    <ul :class="['TheNavigation__list', navMenuOpen ? 'is-open' : '']">
      <li
        v-for="(item, key) in menu.items"
        :key="`nav-item-${key}`"
        :class="[
          'TheNavigation__item',
          item.children ? 'TheNavigation__item--has-children' : ''
        ]"
        @click="closeMenu"
      >
        <nuxt-link
          class="TheNavigation__link"
          :to="$i18n.path(removeHomeSlug(item.object_slug))"
          :exact="isHomeSlug(item.object_slug)"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="item.title" />
        </nuxt-link>
        <!-- TODO: We should be able to access the subList by tab (A11Y) -->
        <ul v-if="item.children" class="TheNavigation__sub-list">
          <li
            v-for="(child, childkey) in item.children"
            :key="`nav-item-child-${childkey}`"
            class="TheNavigation__item TheNavigation__item--child"
            @click="closeMenu"
          >
            <nuxt-link
              class="TheNavigation__link"
              :to="getPathFromUrl(child.url)"
            >
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="child.title" />
            </nuxt-link>
          </li>
        </ul>
      </li>
      <no-ssr>
        <li v-if="langLinks" class="TheNavigation__item">
          <span
            v-for="(item, key) in langLinks"
            :key="`nav-lang-${key}`"
            class="TheNavigation__lang-item"
            @click="closeMenu"
          >
            <BBtn
              class="TheNavigation__link TheNavigation__BBtn"
              naked
              :to="item.path"
              :exact="$route.name.includes('index')"
              :title="item.name"
              :disabled="!item.path"
            >
              {{ item.lang }}
            </BBtn>
          </span>
        </li>
      </no-ssr>
    </ul>
  </nav>
</template>

<style src="./TheNavigation.scss" lang="scss" />
