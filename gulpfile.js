/* eslint-disable no-console */

const gulp = require('gulp')
const inquirer = require('inquirer')

const strings = {
  polyfill: `/* setup-autocomment-polyfill */
      // IE11 Polyfill (build.vendor is deprecated)
      // https://stackoverflow.com/questions/52452501/how-to-add-a-polyfill-to-nuxt-2-0'
      { src: 'https://cdn.polyfill.io/v2/polyfill.min.js?features=default,fetch,Object.entries', async: true, defer: true }, // prettier-ignore
  `,
  modernizr: `/* setup-autocomment-modernizr */
      { src: '/js/modernizr-custom.js', async: true, defer: true },
  `
}

function replaceComment(path, template, pattern, cb) {
  console.log(`Replacing ${pattern} in ${path}...`)

  const nodePlop = require('node-plop')
  const plop = nodePlop()

  const generator = plop.setGenerator('replace', {
    prompts: [],
    actions: [
      {
        type: 'modify',
        path,
        pattern,
        template
      }
    ]
  })

  generator
    .runActions()
    .then(results => {
      console.log(`💾 Sucessfully modified ${path}`)
      cb()
    })
    .catch(err => {
      console.log('err', err)
    })
}

function testMe(input){
  console.log('input: ', input)
}

gulp.task('test', function(done) {
  testMe('hello')
  done()
})

gulp.task('install-susy', function(done) {
  const shell = require('gulp-shell')
  return gulp
    .src('gulpfile.js', { read: false })
    .pipe(shell(['yarn add susy']))
    .on('finish', done)
})

gulp.task('replace-comment', function(done, { path, template, pattern }) {
  console.log(`Replacing ${pattern} in ${path}...`)

  const nodePlop = require('node-plop')
  const plop = nodePlop()

  const generator = plop.setGenerator('replace', {
    prompts: [],
    actions: [
      {
        type: 'modify',
        path,
        pattern,
        template
      }
    ]
  })

  generator
    .runActions()
    .then(results => {
      console.log(`💾 Sucessfully modified ${path}`)
    })
    .catch(err => {
      console.log('err', err)
    })

  done()
})

gulp.task('add-polyfill', function(done, cb) {
  console.log('Adding IE11 polyfill to nuxt.config.js ...')

  const path = './nuxt.config.js'
  const pattern = '\/\*\ setup-autocomment-polyfill\ \*\/' // eslint-disable-line
  const template = strings.polyfill

  replaceComment(path, pattern, template, cb)(done)
})

gulp.task('add-susy-files', function(done) {
  console.log('Adding susy specific .scss files...')

  const nodePlop = require('node-plop')
  const plop = nodePlop()

  const generator = plop.setGenerator('default', {
    prompts: [],
    actions: [
      {
        type: 'add',
        path: './assets/css/_tools.grid.scss',
        templateFile: 'plop/setup/susy/grid-settings.scss.hbs',
        force: true
      }
    ]
  })

  generator
    .runActions()
    .then(results => {
      console.log('results', results)
      console.log('💾 Sucessfully generated susy .scss files.')
    })
    .catch(err => {
      console.log('err', err)
    })

  done()
})

gulp.task('setup', function(done) {
  let readEnv = new Promise(resolve => resolve()) // eslint-disable-line no-unused-vars

  readEnv = inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'plugins',
        message:
          'What plugins and tools do you want to include into your project?',
        choices: ['susy', 'plugin2']
      }
    ])
    .then(answers => {
      if (answers.plugins.includes('susy')) {
        return gulp.series('add-susy-files', 'install-susy')(done)
      }
    })
})
