import { nextJsConfig } from './eslint/next.lint.mjs';

const eslintConfig = [
  ...nextJsConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/components/shared/icons/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/shared/icons',
                '@/components/shared/icons/*',
                '**/shared/icons',
                '**/shared/icons/*',
              ],
              message: 'Import icons via the @icons alias instead.',
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
