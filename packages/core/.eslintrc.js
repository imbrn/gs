module.exports = {
  extends: ['plugin:@shopify/typescript', 'plugin:@shopify/prettier'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: [],
      },
    ],
  },
};
