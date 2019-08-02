export const state = () => ({
  // Get a list of all languages
  langs: process.env.LANGS,
  defaultLang: process.env.DEFAULTLANG,
  currentLang: null
})

export const actions = {
  async nuxtServerInit({ state, dispatch }) {
    // await dispatch('doSomethingOnInit', { arg: 'thing' })
  }
}

export const mutations = {
  LANG_SAVE(state, lang) {
    state.currentLang = lang
  }
}

export const getters = {
  langs: state => (state.langs ? state.langs : false),
  defaultLang: state => (state.defaultLang ? state.defaultLang : false),
  currentLang: state => (state.currentLang ? state.currentLang : false)
}
