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
  `,
  susygrid: `background: susy-svg-grid($colors: rgba(#c7eaee, 0.5)) no-repeat scroll; // sass-lint:disable-line no-color-literals`
}

/*
 * Replace specific comments with a string
 * Using plop modify actions
 */
function replaceComment(path, template, pattern) {
  return new Promise((resolve, reject) => {

    console.log(`🧾 Replacing ${pattern} in ${path}...`)

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
        console.log(`💾✅ Sucessfully modified ${path} with ${template}`)
        resolve()
      })
      .catch(err => {
        console.log('err', err)
        reject(err)
      })
  })
}

/*
 * Add files to project using plop
 */
function addFiles(path, templateFile, force = false) {
  console.log(`🧾 Adding ${templateFile} to ${path}...`)

  const nodePlop = require('node-plop')
  const plop = nodePlop()

  const generator = plop.setGenerator('add', {
    prompts: [],
    actions: [
      {
        type: 'add',
        path,
        templateFile,
        force
      }
    ]
  })

  generator
    .runActions()
    .then(results => {
      console.log(`💾✅ Sucessfully added ${templateFile}.`)
    })
    .catch(err => {
      console.log('err', err)
    })
}

gulp.task('install-susy', function(done) {
  const shell = require('gulp-shell')
  return gulp
    .src('gulpfile.js', { read: false })
    .pipe(shell(['yarn add susy']))
    .on('finish', done)
})

gulp.task('add-polyfill', async function(done) {
  console.log('Adding IE11 polyfill to nuxt.config.js ...')

  const path = './nuxt.config.js'
  const pattern = '\/\*\ setup-autocomment-polyfill\ \*\/' // eslint-disable-line
  const template = strings.polyfill

  await replaceComment(path, template, pattern)
  done()
})

gulp.task('add-modernizr', async function(done) {
  console.log('Adding modernizr script to nuxt.config.js ...')

  const path = './nuxt.config.js'
  const pattern = '\/\*\ setup-autocomment-modernizr\ \*\/' // eslint-disable-line
  const template = strings.modernizr

  await replaceComment(path, template, pattern)
  done()
})

gulp.task('add-susy-svg-grid', async function (done) {
  console.log('Adding susy svg grid to GridOverlay...')

  const path = './components/examples/GridOverlay/GridOverlay.scss'
  const pattern = '\/\/ setup-autocomment-susy' // eslint-disable-line
  const template = strings.susygrid

  await replaceComment(path, template, pattern)
  done()
})

gulp.task('add-susy-files', function(done) {
  console.log('Adding susy specific .scss files...')

  const path = './assets/css/_tools.grid.scss'
  const templateFile = './plop/setup/susy/grid-settings.scss.hbs'
  const force = true

  addFiles(path, templateFile, force)

  done()
})

gulp.task('add-modernizr-file', function (done) {
  console.log('Adding custom modernizr...')

  const path = './static/js/modernizr.js'
  const templateFile = './plop/setup/modernizr/modernizr.hbs'

  addFiles(path, templateFile)

  done()
})

/*
 * Setup task
 * Uses inquirer to prompt the user which tools or plugins should be installed
 */
gulp.task('setup', function(done) {
  let readEnv = new Promise(resolve => resolve()) // eslint-disable-line no-unused-vars

  readEnv = inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'plugins',
        message:
          'What plugins and tools do you want to include into your project?',
        choices: ['susy', 'modernizr', 'IE11-polyfill']
      }
    ])
    .then(answers => {
      const tasks = []

      if (answers.plugins.includes('susy')) {
        tasks.push('add-susy-files')
        tasks.push('install-susy')
        tasks.push('add-susy-svg-grid')
      }
      if (answers.plugins.includes('modernizr')) {
        tasks.push('add-modernizr')
        tasks.push('add-modernizr-file')
      }
      if (answers.plugins.includes('IE11-polyfill')) {
        tasks.push('add-polyfill')
      }

      return gulp.series(tasks)(done)
    })
})
