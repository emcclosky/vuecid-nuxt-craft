/* eslint-disable no-console */

const { spawn } = require('child_process')
const gulp = require('gulp')
const inquirer = require('inquirer')

gulp.task('install-susy', function(done) {
  const cmd = spawn('yarn list global', [], {
    stdio: 'inherit'
  })

  cmd.on('close', function(code) {
    console.log('my-task exited with code ' + code)
    // cb(code)
    done()
  })

  cmd.stdin.on('data', data => {
    console.log(`stdout: ${data}`)
  })

  cmd.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
  })

  cmd.stderr.on('data', data => {
    console.error(`stderr: ${data}`)
  })

  cmd.on('error', err => {
    console.error('Failed to start subprocess.', err)
  })

  return cmd

  // console.log('Adding susy npm package...')
  // console.log('⏱ This may take a while. Just wait for it!')
  // const process = exec('yarn list global')
  // exec('yarn add susy', function(err, stdout, stderr) {
  // const process = exec('yarn list global', function(err, stdout, stderr) {
  //   console.log(stdout)
  //   console.log(stderr)
  //   cb(err)
  // })

  // process.stdout.on('data', function(data) {
  //   console.log('incoming process: ')
  //   console.log(data)
  // })
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
        path: 'mae12222221.js',
        templateFile: 'plop/scaffold/modules/module.hbs'
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
