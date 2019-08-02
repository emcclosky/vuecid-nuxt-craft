import bows from 'bows'
bows.config({
  padding: false,
  separator: '//'
})

const logVerbose = (module, msg, val) => {
  if (process.env.LOG_VERBOSE) {
    if (val) {
      bows(module)(msg, val)
    } else {
      bows(module)(msg)
    }
  }
}

export default logVerbose
