module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier",   'react-app',
  'react-app/jest'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
    "plugins": [
        "react",
    ],
    "rules": {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/display-name": "off",
    "react/no-unescaped-entities": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
