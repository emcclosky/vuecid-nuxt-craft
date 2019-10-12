/* eslint-disable no-console */

const { exec } = require('child_process')
const gulp = require('gulp')
const inquirer = require('inquirer')

gulp.task('install-susy', function(cb) {
  console.log('Adding susy npm package...')
  console.log('⏱ This may take a while. Just wait for it!')
  // exec('yarn add susy', function(err, stdout, stderr) {
  exec('yarn list global', function(err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

gulp.task('add-susy-files', function() {
  console.log('Adding susy specific .scss files...')

  const nodePlop = require('node-plop')
  const plop = nodePlop()

  const generator = plop.setGenerator('default', {
    prompts: [],
    actions: [
      {
        type: 'add',
        path: 'mae.js',
        templateFile: 'plop/scaffold/modules/module.hbs'
      }
    ]
  })

  const runPlop = generator.runActions()

  return runPlop
    .then(results => {
      console.log('results', results)

      return results
    })
    .catch(err => {
      console.log('err', err)
    })
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
