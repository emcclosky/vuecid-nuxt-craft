// Lint vue files in Atom editor with linter-eslint: https://alligator.io/vuejs/vue-eslint-plugin/
// Use Prettier if you wish to
// Use IDE-Vue for more fancy features: https://atom.io/packages/ide-vue
// Or just use VS Code

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  // required to lint *.vue files
  plugins: [
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'warn',
    semi: [2, 'never'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    'nuxt/no-cjs-in-config': 'off',
    'vue/no-unused-components': 'warn',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase',
      {
        ignores: ['nuxt', 'nuxt-link', 'client-only', 'component', 'transition']
      }
    ]
  }
}
