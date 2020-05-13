// import { loadPreview } from '@wearelucid/vuecid-craft-helpers'

import { removeLeadingSlash } from '@wearelucid/vuecid-helpers'
import loadPreview from '~/packages/vuecid-craft-helpers/src/preview/loadPreview.js'
import page from '~/apollo/queries/page'

export default async ({ store, params, isDev, query, env }) => {
  const slug = removeLeadingSlash(params.slug3 || params.slug2 || params.slug || env.HOMESLUG) // eslint-disable-line

  const previewData = await loadPreview({
    slug,
    env,
    query,
    isDev,
    graphQLQuery: page
  })

  store.commit('data/PREVIEW_SAVE', previewData)
}
