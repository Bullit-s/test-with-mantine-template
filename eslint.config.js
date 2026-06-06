import mantine from 'eslint-config-mantine';

export default [
  ...mantine,
  {
    ignores: [
      'dist',
      'storybook-static',
      'vite.config.ts',
      'vitest.setup.mjs',
      '**/*.{mjs,cjs,js,d.ts,d.mts}',
    ],
  },
  {
    files: ['**/*.story.tsx'],
    rules: {
      'no-console': 'off',
    },
  },
];
