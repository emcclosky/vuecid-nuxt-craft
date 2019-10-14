/* eslint-disable no-console */

const gulp = require('gulp')
const inquirer = require('inquirer')

gulp.task('install-susy', function(done) {
  const shell = require('gulp-shell')
  return gulp
    .src('gulpfile.js', { read: false })
    .pipe(shell(['yarn add susy']))
    .on('finish', done)
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
