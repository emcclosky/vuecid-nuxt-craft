import Vue from 'vue'
// import { generateMetaFromSeomatic } from '@wearelucid/vuecid-craft-helpers'
import generateMetaFromSeomatic from '~/packages/vuecid-craft-helpers/src/meta/generateMetaFromSeomatic.js'
import config from '~/config'

const defaultOptions = {
  homeSlug: config.env.HOMESLUG,
  // debug: true,
}

const VuecidHelpers = {
  install(Vue) {
    Vue.prototype.$generateMetaFromSeomatic = (options) => {
      return generateMetaFromSeomatic({ ...defaultOptions, ...options })
    }
  },
}

Vue.use(VuecidHelpers)
