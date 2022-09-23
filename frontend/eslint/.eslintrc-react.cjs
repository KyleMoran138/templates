module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    'unused-imports',
  ],
  rules: {
    'no-tabs': 'off',
    indent: 'off',
    'unused-imports/no-unused-imports': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, minProperties: 3, consistent: true},
      ObjectPattern: { multiline: true, minProperties: 3, consistent: true },
      ImportDeclaration: { multiline: true, minProperties: 3, consistent: true },
      ExportDeclaration: { multiline: true, minProperties: 3, consistent: true },
    }],
    'object-property-newline': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
  },
}
