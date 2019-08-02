import axios from 'axios'

import {
  cleanSlug,
  checkAndGetHomeSlug,
  getPathFromUrl,
  removeHomeSlug
} from '@wearelucid/vuecid-helpers'

import {
  isWordPressPreview,
  normalizeWordpress,
  flattenACF
} from '@wearelucid/vuecid-helpers/dist/wp'

import logV from '~/util/logV'

export const state = () => ({
  previewActive: false,
  bundle: {
    language: null
  },
  currentPage: null,
  loading: true,
  loaded: false
})

const m = 'store/loadData'

export const actions = {
  async loadData({ state, dispatch, commit, getters }, payload) {
    logV(m, 'loadData() action start')

    // Initialize loading sequence
    commit('DATA_LOAD')

    // Reset preview state
    commit('PREVIEW_STATE_SAVE', false)

    // Check if we changed the language
    if (state.bundle.language !== payload.lang) {
      logV(m, 'Language has changed, gonna load new bundle')

      // If so, load the new bundle asynchronously and save it to state
      // eslint-disable-next-line prettier/prettier
      commit('BUNDLE_SAVE', await dispatch('loadBundle', { lang: payload.lang }))
      logV(m, '📦 New bundle saved 📦')
    }

    if (isWordPressPreview(payload.route)) {
      logV(m, '👀 Looks like we have a preview!')
      logV(m, "👋‍ I'm out, let's hope client will handle this one for you!")
    } else if (payload.isInBundle) {
      const pageFromGetter = getters.getPageBySlug(
        payload.postType === 'pages'
          ? payload.route.path
          : payload.route.params.slug,
        payload.postType
      )
      logV(m, 'Requested page should be in bundle, gonna use getter')
      if (pageFromGetter) {
        logV(m, 'Getter found a page with this slug: ', pageFromGetter.slug)
        commit('CURRENT_PAGE_SAVE', pageFromGetter)
        logV(m, 'Mutation saved this page as currentPage')
      } else {
        logV(m, '🚨 Getter no haz page, but haz 404‍ 🤪')
        payload.error({ statusCode: 404 })
      }
    } else {
      logV(m, 'Requested page not in bundle, will load async')
      // eslint-disable-next-line prettier/prettier
      commit('CURRENT_PAGE_SAVE', await dispatch('loadPost', { lang: payload.lang, postType: payload.postType, slug: payload.route.params.slug, error: payload.error }))
      logV(m, 'Mutation saved this post as currentPage')
    }

    // I am done with this async stuff!
    commit('DATA_LOAD_DONE')

    logV(m, 'loadData() action done')
  },
  async loadBundle(ctx, { lang, error }) {
    logV(m, 'loadBundle() action start')

    let bundle = null
    if (process.server) {
      // eslint-disable-next-line prettier/prettier
      bundle = JSON.parse(require('fs').readFileSync(`static/data/basic.${lang}.json`, 'utf8'))
    } else {
      try {
        // eslint-disable-next-line prettier/prettier
        bundle = await this.$axios.$get(`/basic.${lang}.json`, { baseURL: '/data/' })
      } catch (e) {
        logV(m, 'loadBundle() action failed 😢: ', e)
        return error(e)
      }
    }
    logV(m, 'loadBundle() action done')
    return bundle
  },
  async loadPost(ctx, { lang, postType, slug, error }) {
    logV(m, 'loadPost() action start')

    let post = null
    if (process.server) {
      // eslint-disable-next-line prettier/prettier
      post = JSON.parse(require('fs').readFileSync(`static/data/${postType}/${postType}.${lang}.${slug}.json`, 'utf8'))
    } else {
      try {
        // eslint-disable-next-line prettier/prettier
        post = await this.$axios.$get(`${postType}.${lang}.${slug}.json`, { baseURL: `/data/${postType}/` })
      } catch (e) {
        logV(m, 'loadPost() action failed 😢: ', e)
        return error(e)
      }
    }
    post = post.items.find(x => x.slug === slug)
    logV(m, 'loadPost() action loaded a post with this slug: ', post.slug)
    logV(m, 'loadPost() action done')
    return post
  },
  async loadPreview({ commit, rootState }) {
    if (isWordPressPreview(rootState.route)) {
      logV(m, 'loadPreview() action start')

      // Initialize loading sequence
      commit('DATA_LOAD')

      const wpnonce = rootState.route.query.preview_nonce
      const previewId = rootState.route.query.preview_id
      const previewUrl = `/api/previews/v1/preview/?id=${previewId}&_wpnonce=${wpnonce}`

      try {
        commit(
          'CURRENT_PAGE_SAVE',
          await this.$axios.$get(previewUrl, {
            baseURL: process.env.BACKENDURLPRODUCTION,
            withCredentials: true,
            transformResponse: [].concat(
              axios.defaults.transformResponse,
              normalizeWordpress,
              flattenACF
            )
          })
        )
        logV(m, 'Yeah, preview found!')
        logV(m, 'Mutation saved this preview as currentPage')
        commit('PREVIEW_STATE_SAVE', true)
        commit('DATA_LOAD_DONE')
        logV(m, 'loadPreview() action done')
      } catch (e) {
        logV(m, 'loadPreview() action failed 😢: ', e)
        throw e
      }
    } else {
      logV(m, 'loadPreview() action failed 😢: This is not a preview')
    }
  }
}

export const mutations = {
  DATA_LOAD(state) {
    state.loading = true
    state.loaded = false
  },
  DATA_LOAD_DONE(state) {
    state.loading = false
    state.loaded = true
  },
  BUNDLE_SAVE(state, data) {
    state.bundle = data
  },
  CURRENT_PAGE_SAVE(state, page) {
    state.currentPage = page
  },
  PREVIEW_STATE_SAVE(state, data) {
    state.previewActive = data
  }
}

export const getters = {
  /**
   * Getters that are a function must be called like this `this.getMenu('main')`
   */
  page: state => {
    if (!state.loaded || !state.currentPage) return false
    return state.currentPage
  },
  options: (state, getters, rootState) => {
    if (!state.loaded || !state.bundle) return false
    return {
      global:
        state.bundle && state.bundle['options-global']
          ? state.bundle['options-global']
          : false,
      localized:
        state.bundle && state.bundle[`options-${rootState.currentLang}`]
          ? state.bundle[`options-${rootState.currentLang}`]
          : false
    }
  },
  getMenu: state => location => {
    if (
      !state.loaded ||
      !state.bundle ||
      !state.bundle.menus ||
      !state.bundle.menus[location]
    )
      return false
    return state.bundle.menus[location].menu
  },
  getPageBySlug: (state, getters, rootState) => (slug, postType) => {
    logV(m, `slug: ${slug}`)
    logV(m, `postType: ${postType}`)
    const propertyToFind = postType === 'pages' ? 'uri' : 'slug'
    // eslint-disable-next-line prettier/prettier
    return state.bundle[postType].find(p => p[propertyToFind] === cleanSlug(checkAndGetHomeSlug(slug, rootState.currentLang, process.env.HOMESLUG)))
  },
  langLinks: (state, getters, rootState) => {
    // Go through all langs
    const items = rootState.langs.map(l => {
      const translation =
        state.loaded &&
        state.currentPage &&
        state.currentPage.polylang &&
        state.currentPage.polylang.translations
          ? state.currentPage.polylang.translations.find(o => o.lang === l.lang)
          : false

      return {
        // Save path if there is a translation
        path:
          translation && translation.permalink
            ? removeHomeSlug(getPathFromUrl(translation.permalink))
            : false,

        lang: l.lang,
        name: l.name
      }
    })
    return items
  }
}
