// Inspired by https://www.npmjs.com/package/plop-generator-redux

module.exports = function(plop) {
  // controller generator
  plop.setGenerator('setup', {
    description: 'Setup your project to your liking:',
    prompts: [
      {
        type: 'checkbox',
        name: 'setupConfig',
        message:
          'Which plugins/tools do you want to include into your project?',
        choices: [
          {
            name: 'Susy',
            value: 'susy'
          },
          {
            name: 'Nothing',
            value: 'nothing'
          }
        ]
      }
    ],
    actions: data => {
      let actions = []

      // If user wants to add susy
      if (data.setupConfig.includes === 'susy') {
        actions = actions.concat([{
            type: 'add',
            path: 'app/modules/{{camelCase name}}.model.js',
            templateFile: 'plop-templates/model.js',
          },
          {
            type: 'add',
            path: 'app/tests/{{camelCase name}}.model.tests.js',
            templateFile: 'plop-templates/model.tests.js',
          }
        ])
      }

      return actions
    }
  })
}
