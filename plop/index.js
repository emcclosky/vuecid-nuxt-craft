// Inspired by https://www.npmjs.com/package/plop-generator-redux

module.exports = (plop, config) => {
  // Config defaults.
  config = config || {}
  config.basePath = config.basePath || './'
  config.prefix = config.prefix ? config.prefix + ':' : ''

  // Helpers.
  plop.addHelper('indexOf', (array, item, options) => {
    if (array.includes(item)) {
      return options.fn(this)
    }

    return options.inverse(this)
  })

  // plop.addPartial('reducerName', '{{ camelCase reducerNameInput }}')
  plop.addPrompt('directory', require('inquirer-directory'))

  // Generators.
  // // require('./views')(plop, config)
  require('./scaffold')(plop, config)
  // require('./init')(plop, config)
  require('./setup')(plop, config)
}
