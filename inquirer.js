/**
 * Setup your project
 */

/* eslint-disable no-console */
'use strict'
const { exec, spawn } = require('child_process')
const inquirer = require('inquirer')

function installSusy() {
  const setup = spawn('yarn scaffold', [])

  setup.stdout.setEncoding('utf8')

  let k = 0
  let dataLine = ''

  setup.stdout.on('data', function(data) {
    dataLine += data
    if (dataLine[dataLine.length - 1] === '\n') {
      // we've got new data (assuming each individual output ends with '\n')
      const res = parseFloat(dataLine)
      dataLine = '' // reset the line of data

      console.log('Result #', k, ': ', res)

      k++
      // do something else now
      if (k < 5) {
        // double the previous result
        setup.stdin.write('2 * + ' + res + '\n')
      } else {
        // that's enough
        setup.stdin.end()
      }
    }
  })

  setup.stdin.write('1 + 0\n')

  // exec('yarn scaffold', (err, stdout, stderr) => {
  //   if (err) {
  //     console.log('err: ', err)
  //     return
  //   }

  //   // the *entire* stdout and stderr (buffered)
  //   console.log(`stdout: ${stdout}`)
  //   console.log(`stderr: ${stderr}`)
  //   console.log(`✅ Successfully generated susy settings`)
  // })

  // console.log('Installing susy...')
  // console.log('⏱ This might take a while. Just wait for it...')

  // await exec('yarn add susy', (err, stdout, stderr) => {
  //   if (err) {
  //     console.log('err: ', err)
  //     return
  //   }

  //   // the *entire* stdout and stderr (buffered)
  //   console.log(`stdout: ${stdout}`)
  //   console.log(`stderr: ${stderr}`)
  //   console.log(`✅ Successfully installed susy`)
  // })
}

inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'Select plugins',
      name: 'plugins',
      choices: [
        {
          name: 'susy'
        }
      ]
    }
  ])
  .then(answers => {
    console.log('answers: ', answers)

    if (answers.plugins.includes('susy')) {
      installSusy()

      // exec('yarn add susy', (err, stdout, stderr) => {
      //   if (err) {
      //     console.log('Susy could not be installed: ', err) // eslint-disable-line no-console
      //     return
      //   }

      //   // the *entire* stdout and stderr (buffered)
      //   console.log(`stdout: ${stdout}`)
      //   console.log(`stderr: ${stderr}`)
      //   console.log(`✅ Successfully installed susy`)
      // })
    }
  })
