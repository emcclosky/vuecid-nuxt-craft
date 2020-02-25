const logVerbose = (module, msg, val) => {
  if (process.env.LOG_VERBOSE) {
    console.log(`logV -- ${module}: `, msg, val || '') // eslint-disable-line
  }
}

export default logVerbose
