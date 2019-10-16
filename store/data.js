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
  langLinks: (state, getters, rootState) => (currentSlug, section) => {
    if (
      !state.loaded ||
      !state.flatNavigations ||
      !state.flatNavigations[rootState.currentLang] ||
      !state.flatNavigations[rootState.currentLang][section]
    )
      return false

    // Find the UID of the current slug, also check nested pages
    const currentEntry = state.flatNavigations[rootState.currentLang][section].find(entry => entry.slug === currentSlug) // prettier-ignore

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
