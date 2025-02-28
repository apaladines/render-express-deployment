// Another way to setup ESLint with:
// ecmaVersion: 2018,
// sourceType: 'commonjs'

const { configs } = require('@eslint/js');
const globals = require('globals');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    rules: {
      semi: 'error',
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['warn', 'single'],
      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-console': 'warn',
    },
    ignores: ['conf/', 'coverage/'],
  },
  eslintPluginPrettierRecommended,
];
