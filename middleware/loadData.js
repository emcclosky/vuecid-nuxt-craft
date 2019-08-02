import logV from '~/util/logV'
const m = 'middleware/loadData'

export default function(ctx) {
  // If middleware is called from hot module replacement, ignore it
  if (ctx.isHMR) return

  logV(m, '📞 Middleware called!')

  const payload = {
    lang: ctx.app.i18n.locale,
    route: ctx.route,
    isInBundle: !!ctx.route.meta.find(x => x.isInBundle === true),
    postType:
      ctx.route.meta.find(x => x.isInBundle !== null).postType || 'pages',
    error: ctx.error
  }

  logV(m, 'route.path: ', payload.route.path)

  return ctx.store.dispatch('data/loadData', payload)
}
