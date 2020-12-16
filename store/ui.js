const noScroll = require('no-scroll')

export const state = () => ({
  navMenuOpen: false,
  previewActive: false,
})

export const actions = {
  toggleMenu({ commit }) {
    commit('TOGGLE_MENU')
  },
  closeMenu({ commit, state }) {
    if (state.navMenuOpen) commit('CLOSE_MENU')
  },
  activatePreviewAlert({ state, commit }) {
    if (!state.previewActive) {
      commit('ACTIVATE_PREVIEW_ALERT')
    }
  },
}

export const mutations = {
  TOGGLE_MENU(state) {
    state.navMenuOpen = !state.navMenuOpen
    state.navMenuOpen ? noScroll.on() : noScroll.off()
  },
  CLOSE_MENU(state) {
    state.navMenuOpen = false
    noScroll.off()
  },
  ACTIVATE_PREVIEW_ALERT(state) {
    state.previewActive = true
  },
}

export const getters = {
  navMenuOpen: (state) => state.navMenuOpen,
}
