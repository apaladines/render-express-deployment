import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [...compat.extends('eslint:recommended', 'prettier'), {
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  rules: {
    'no-console': 'warn',
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
  },
}];
