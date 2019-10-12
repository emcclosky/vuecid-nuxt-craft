/* eslint-disable no-console */

const { exec } = require('child_process')
const gulp = require('gulp')
const inquirer = require('inquirer')
const plop = require('plop')

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

gulp.task('add-files', function(cb) {
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [],
    actions: [
      {
        type: 'add',
        path: '/{{name}}.js',
        templateFile: 'plop/scaffold/modules/module.hbs'
      }
    ]
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
        return gulp.series('install-susy')(done)
      }
    })
})
