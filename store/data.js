import { verifyLeadingSlash, removeHomeSlug } from '@wearelucid/vuecid-helpers'
import { flattenNavigation } from '@wearelucid/vuecid-craft-helpers'

import config from '~/config.js'

import logV from '~/util/logV'

export const state = () => ({
  bundle: {
    language: null
  },
  navigations: null,
  flatNavigations: null,
  globals: null,
  currentPage: null,
  loading: true,
  loaded: false
})

const m = 'store/loadData'

export const actions = {
  async loadData({ state, dispatch, commit }) {
    logV(m, 'loadData() action start')

    // Initialize loading sequence
    commit('DATA_LOAD')

    // Check if we have some navigations in the store
    if (!state.navigations || !state.flatNavigations) {
      // If not, load the new bundle asynchronously and save it to state
      // eslint-disable-next-line prettier/prettier
      commit('NAVIGATIONS_SAVE', await dispatch('loadNavigations'))
      commit('GLOBALS_SAVE', await dispatch('loadGlobals'))
      logV(m, '📦 New navigations saved 📦')
    }

    // I am done with this async stuff!
    commit('DATA_LOAD_DONE')

    logV(m, 'loadData() action done')
  },
  async loadNavigations({ error }) {
    logV(m, 'loadNavigations() action start')

    let navigations = null
    if (process.server) {
      // eslint-disable-next-line prettier/prettier
      navigations = JSON.parse(require('fs').readFileSync(`static/data/navigations.json`, 'utf8'))
    } else {
      try {
        // eslint-disable-next-line prettier/prettier
        navigations = await this.$axios.$get(`/navigations.json`, {
          baseURL: '/data/'
        })
      } catch (e) {
        logV(m, 'loadNavigations() action failed 😢: ', e)
        return error(e)
      }
    }

    // save navigations in a flat array to allow easy search for slugs (also in nested pages)
    const flatNavigations = flattenNavigation({
      navigationData: navigations,
      sections: config.sections
    })

    logV(m, 'loadNavigations() action done')
    return {
      navigations,
      flatNavigations
    }
  },
  async loadGlobals({ error }) {
    logV(m, 'loadGlobals() action start')

    let globals = null
    if (process.server) {
      // eslint-disable-next-line prettier/prettier
      globals = JSON.parse(require('fs').readFileSync(`static/data/globals.json`, 'utf8'))
    } else {
      try {
        // eslint-disable-next-line prettier/prettier
        globals = await this.$axios.$get(`/globals.json`, {
          baseURL: '/data/'
        })
      } catch (e) {
        logV(m, 'loadGlobals() action failed 😢: ', e)
        return error(e)
      }
    }

    logV(m, 'loadGlobals() action done')
    return globals
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
  NAVIGATIONS_SAVE(state, { navigations, flatNavigations }) {
    state.flatNavigations = flatNavigations
    state.navigations = navigations
  },
  GLOBALS_SAVE(state, data) {
    state.globals = data
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
  getMenu: (state, getters, rootState) => section => {
    if (
      !state.loaded ||
      !state.navigations ||
      !state.navigations[rootState.currentLang] ||
      !state.navigations[rootState.currentLang][section]
    )
      return false
    return state.navigations[rootState.currentLang][section]
  },
  langLinks: (state, getters, rootState) => (slugs, section) => {
    // langLinks tries to return a translation for a given slug
    // Craft saves for each translation the same UID.
    // So for any given slug we search for each language a translated slug by comparing the UID. (further down)
    // But if the slug is not present, for example for home and other special nuxt page templates
    // we need to handle things differently.
    // nuxt-i18n can handle certain translated slugs by itself. for example if i18n knows that `news` has a translation of `de/neuigkeiten`
    // unfortunately nuxt.i18n is not available in getters, so we return a boolean to tell the navigation to use
    // the nuxt.i18n locales switch.
    if (!slugs.slug && !slugs.hasNoTranslation) {
      return rootState.langs.map(l => {
        return { i18nHandlesRoute: true, lang: l.lang }
      })
    }

    if (slugs.hasNoTranslation) {
      return rootState.langs.map(l => {
        return {
          path: verifyLeadingSlash(l.lang),
          lang: l.lang,
          name: l.name
        }
      })
    }

    if (
      !state.loaded ||
      !state.flatNavigations ||
      !state.flatNavigations[rootState.currentLang] ||
      !state.flatNavigations[rootState.currentLang][section]
    )
      return false

    // Find the UID of the current slug, also check nested pages
    const currentEntry = state.flatNavigations[rootState.currentLang][section].find(entry => entry.slug === slugs.slug) // prettier-ignore

    const currentUID = currentEntry ? currentEntry.uid : false

    // go through all langs and find translations
    const items = rootState.langs.map(l => {
      const translation = state.flatNavigations[l.lang][section].find(
        entry => entry.uid === currentUID
      )
      return {
        // Save path if there is a translation
        path:
          translation && translation.uri
            ? verifyLeadingSlash(removeHomeSlug(translation.uri))
            : false,

        lang: l.lang,
        name: l.name
      }
    })
    return items
  }
}
