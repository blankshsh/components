module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "space-before-function-paren": [2, "never"], // 函数定义时括号前面要不要有空格
    "vue/attribute-hyphenation": "off",
    "vue/html-quotes": "off",
    "no-useless-escape": "off",
    "no-eval": "off",
    "no-new-func": "off",
    "no-new": "off"
  },
  globals: {
    "axios": true
  }
}
