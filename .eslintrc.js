module.exports = {
  root: true,
  extends: ['alloy', 'alloy/react'],
  plugins: ['react-hooks'],
  env: {
    // Your environments (which contains several predefined global variables)
    //
    // jest: true,
    // browser: true,
    // node: true,
    // mocha: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    ],
    'react/jsx-sort-props': [
      'warn',
      {
        reservedFirst: ['key'],
        shorthandFirst: true,
        callbacksLast: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
