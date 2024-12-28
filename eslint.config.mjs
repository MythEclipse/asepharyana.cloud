import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:@next/next/recommended',
      'next',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', 
    },
  }),
];

export default eslintConfig;
