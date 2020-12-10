module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // 自定义
    'space-before-function-paren': ['error', 'never'],
    'vue/no-unused-vars': 0,
    'vue/require-v-for-key': 0,
    'eqeqeq': 0,
    'camelcase': 0,
    'no-return-assign': 0,
    'handle-callback-err': 0,
    'spaced-comment': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
