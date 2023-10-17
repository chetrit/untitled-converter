/* eslint-disable no-undef */

module.exports = {
  root: true,
  env: {
    browser: false,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'header',
    'eslint-plugin-import-helpers',
    'sort-exports'
  ],
  rules: {
    'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    '@typescript-eslint/no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    '@typescript-eslint/no-explicit-any': 'off',
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@middlewares/',
          '/^@services/',
          '/^@models/',
          '/^@entities/',
          '/^@routes/',
          '/^@config/',
          ['parent', 'sibling', 'index'],
          '/^~/'
        ],
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ],
    'sort-exports/sort-exports': ['error', { sortDir: 'asc' }]
  },
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js']
    }
  ]
}
