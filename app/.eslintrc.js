module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
  ],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "no-empty-function": "off",
    "import/prefer-default-export": "off",
    "no-useless-constructor": "off",
    "dot-notation": "off",
    "camelcase": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "ignoredNodes": ["PropertyDefinition"],
    }],
    "semi" : "off" ,
    "@typescript-eslint/semi" : [ "error" ],
    "import/no-extraneous-dependencies": "warn",
    "class-methods-use-this": "off",
    "object-curly-newline": "warn",
    "max-classes-per-file": ["error", 3],
    "no-console": ["warn", { allow: ["error", "debug"] }],
    "no-restricted-syntax": "off",
  },
  overrides: [
    {
      files: ['*.enums.ts', '**/enums/*.ts'],
      rules: {
        "no-shadow": "off",
      }
    }
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    }
  }
};
