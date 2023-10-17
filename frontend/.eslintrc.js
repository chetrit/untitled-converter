module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'plugin:css-import-order/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'eslint-plugin-import-helpers',
    'header',
    'css-import-order'
  ],
  ignorePatterns: [".eslintrc.js"],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'react/prop-types': 'warn',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'always', children: 'never' }
    ],
    'react/jsx-indent': [2, 2, {
      checkAttributes: true,
      indentLogicalExpressions: true
    }],
    'react/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'never',
      afterOpening: 'never',
      beforeClosing: 'never'
    }],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-closing-bracket-location': ['error', {
      nonEmpty: 'tag-aligned',
      selfClosing: 'tag-aligned'
    }],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',

    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          [
            '/^react$/', '/^react-dom/',
            '/^prop-types$/'
          ],
          'module',
          '/^pages/',
          '/^components/',
          '/^servics/',
          '/^assets/',
          ['parent', 'sibling', 'index'],
          '/^~/'
        ],
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ],
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
