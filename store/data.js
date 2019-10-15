import {
  cleanSlug,
  checkAndGetHomeSlug,
  getPathFromUrl,
  removeHomeSlug
} from '@wearelucid/vuecid-helpers'
// import globalsQuery from '~/apollo/queries/globals'

import logV from '~/util/logV'

export const state = () => ({
  bundle: {
    language: null
  },
  navigations: null,
  currentPage: null,
  loading: true,
  loaded: false
})

const m = 'store/loadData'

export const actions = {
  async loadData({ state, dispatch, commit }, payload) {
    logV(m, 'loadData() action start')

    // Initialize loading sequence
    commit('DATA_LOAD')

    // Check if we changed the language
    if (state.bundle.language !== payload.lang) {
      logV(m, 'Language has changed, gonna load new bundle')

      // If so, load the new bundle asynchronously and save it to state
      // eslint-disable-next-line prettier/prettier
      commit('NAVIGATIONS_SAVE', await dispatch('loadNavigations', {
          lang: payload.lang
        })
      )

      // save current language
      commit('BUNDLE_SAVE', {
        language: payload.lang
      })

      logV(m, `📦 New bundle for ${payload.lang} saved 📦`)
    }

    // I am done with this async stuff!
    commit('DATA_LOAD_DONE')

    logV(m, 'loadData() action done')
  },
  // async loadGlobalSettings({ state, commit }, payload) {
  //   logV(m, 'loadGlobalSettings() action start')
  //   commit('GLOBALS_LOAD')

  //   try {
  //     const apolloClient = this.app.apolloProvider.defaultClient

  //     const globals = await apolloClient
  //       .query({
  //         query: gql`
  //           ${globalsQuery}
  //         `
  //       })
  //       .then(({ data }) => {
  //         return data.globals.globalSettings
  //           ? data.globals.globalSettings
  //           : data.globals
  //       })
  //     commit('GLOBALS_SAVE', globals)
  //     commit('GLOBALS_LOAD_DONE')
  //   } catch (e) {
  //     logV(m, '💾❌ loadGlobalSettings() action failed 😢: ', e)
  //   }
  //   logV(m, '📦 Globals saved 📦')
  //   logV(m, 'loadGlobalSettings() action done')
  // },
  // async loadBundle(ctx, { lang, error }) {
  //   logV(m, 'loadBundle() action start')

  //   let bundle = null
  //   if (process.server) {
  //     // eslint-disable-next-line prettier/prettier
  //     bundle = JSON.parse(require('fs').readFileSync(`static/data/basic.${lang}.json`, 'utf8'))
  //   } else {
  //     try {
  //       // eslint-disable-next-line prettier/prettier
  //       bundle = await this.$axios.$get(`/basic.${lang}.json`, { baseURL: '/data/' })
  //     } catch (e) {
  //       logV(m, 'loadBundle() action failed 😢: ', e)
  //       return error(e)
  //     }
  //   }
  //   logV(m, 'loadBundle() action done')
  //   return bundle
  // },
  async loadNavigations({ error }, { lang }) {
    logV(m, 'loadNavigations() action start')

    let navigations = null
    if (process.server) {
      // eslint-disable-next-line prettier/prettier
      navigations = JSON.parse(require('fs').readFileSync(`static/data/navigations.${lang}.json`, 'utf8'))
    } else {
      try {
        // eslint-disable-next-line prettier/prettier
        navigations = await this.$axios.$get(`/navigations.${lang}.json`, {
          baseURL: '/data/'
        })
      } catch (e) {
        logV(m, 'loadNavigations() action failed 😢: ', e)
        return error(e)
      }
    }
    logV(m, 'loadNavigations() action done')
    return navigations
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
  NAVIGATIONS_SAVE(state, data) {
    state.navigations = data
  },
  BUNDLE_SAVE(state, data) {
    state.bundle = data
  },
  CURRENT_PAGE_SAVE(state, page) {
    state.currentPage = page
  }
}

export const getters = {
  /**
   * Getters that are a function must be called like this `this.getMenu('main')`
   */
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
    if (!state.loaded || !state.navigations || !state.navigations[location])
      return false
    return state.navigations[location]
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
