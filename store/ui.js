import breakpoints from '~/assets/css/_export.breakpoints.scss'
const noScroll = require('no-scroll')

const bps = () => {
  for (const key in breakpoints) {
    if (breakpoints.hasOwnProperty(key)) {
      const val = breakpoints[key].replace('px', '')
      breakpoints[key] = val
    }
  }
  return breakpoints
}

export const state = () => ({
  navMenuOpen: false,
  breakpoints: bps(),
  breakpointPrevious: {
    name: null
  },
  breakpointCurrent: {
    name: null
  },
  currentPaginationPage: 1
})

export const actions = {
  toggleMenu({ commit }) {
    commit('TOGGLE_MENU')
  },
  closeMenu({ commit, state }) {
    if (state.navMenuOpen) commit('CLOSE_MENU')
  },
  saveCurrentPaginationPage({ commit }, payload) {
    commit('CURRENT_PAGINATION_PAGE_SAVE', payload)
  }
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
  UPDATE_BREAKPOINT(state, breakpoint) {
    const bp = { origin: 'initial', name: '', ...breakpoint }

    // Add name and remove prefix
    bp.name = bp.breakpoint.replace('mq-', '')

    // Save current to previous
    state.breakpointPrevious = state.breakpointCurrent

    // Tell us where we came from
    if (state.breakpointPrevious && state.breakpointPrevious.origin) {
      bp.origin =
        state.breakpointPrevious.innerWidth <= bp.innerWidth
          ? 'smaller'
          : 'larger'
    }

    // Save current breakpoint
    state.breakpointCurrent = bp
  },
  CURRENT_PAGINATION_PAGE_SAVE(state, data) {
    state.currentPaginationPage = data
  }
}

export const getters = {
  currentPaginationPage: state =>
    state && state.currentPaginationPage ? state.currentPaginationPage : 1,
  navMenuOpen: state => state.navMenuOpen,
  showMobileNavigation: state =>
    state.breakpointCurrent.innerWidth < state.breakpoints.medium
}
