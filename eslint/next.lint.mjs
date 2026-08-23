import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierPlugin from 'eslint-plugin-prettier';
import { config } from './base.lint.mjs';

/**
 * Next.js specific ESLint flat config.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const nextJsConfig = defineConfig([
  ...config,
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }, { usePrettierrc: true }],
    },
  },
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
]);
