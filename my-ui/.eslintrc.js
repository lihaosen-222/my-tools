// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', "react-hooks", '@typescript-eslint'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 0,
    'react/react-in-jsx-scope': 0,
  },
}
