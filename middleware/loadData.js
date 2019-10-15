import logV from '~/util/logV'
const m = 'middleware/loadData'

export default function(ctx) {
  // If middleware is called from hot module replacement, ignore it
  if (ctx.isHMR) return

  logV(m, '📞 Middleware called!')

  const payload = {
    lang: ctx.app.i18n.locale
  }

  logV(m, 'language: ', payload.lang)

  return ctx.store.dispatch('data/loadData', payload)
}
