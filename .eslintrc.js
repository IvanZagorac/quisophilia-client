module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "tsconfig.json",
      sourceType: "module",
      warnOnUnsupportedTypeScriptVersion: false,
    },
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-tsdoc',
    ],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        indent: ['error', 4],
        'brace-style': ['error', 'allman'],
        'no-throw-literal': 0,
        'max-len': ['error', 140],
        'object-shorthand': ['error', 'always'],
        curly: ['error', 'all'],
        quotes: ['error', 'single'],
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false,
            },
        ],
        'no-restricted-syntax': [
            'error',
            {
                selector: 'LabeledStatement',
                message: `Labels are a form of GOTO;
            using them makes code confusing and hard to maintain and understand.`,
            },
            {
                selector: 'WithStatement',
                message: `'with' is disallowed in strict mode
            because it makes code impossible to predict and optimize.`,
            },
        ],
        'no-continue': 0,
        'no-console': 0,
        'no-param-reassign': ['error', { props: false }],
        'linebreak-style': 0,
    },
  };
