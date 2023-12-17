module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': ['off'],
        'react/no-unstable-nested-components': [
          'off',
          {
            allowAsProps: true,
          },
        ],
      },
    },
  ],
};
