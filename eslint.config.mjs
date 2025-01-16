import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:@next/next/recommended',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  }),
  {
    ignores: [
      '**/node_modules/**',
      '**/.git/**',
      '**/public/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/out/**',
      '**/coverage/**',
    ],
  },
];

export default eslintConfig;
