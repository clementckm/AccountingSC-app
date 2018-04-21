module.exports = {
  "extends": ["standard", "plugin:meteor/recommended", "plugin:react/recommended"],
  "plugins": [
    "import", "meteor", "react", "react-intl"
  ],
  "settings": {
    "import/core-modules": [ "meteor" ],
    "import/resolver": "meteor"
  },
  "parserOptions": {
    "allowImportExportEverywhere": true
  },
  "rules": {
    "no-undef": [2],
    "no-underscore-dangle": ["error", { "allowAfterThis": true, "allowAfterSuper": true, "allow": ["_id"], }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    'import/extensions': ['error', 'always', {
      js: 'always',
      jsx: 'always',
    }],
    "indent": 0,
    "no-tabs": 0,
    "no-console": 0,
    "func-names": 0,
    "allow-ternary": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-absolute-path": [0, { "commonjs": false, "esmodule": false }],
    "import/extensions": 0,
    "no-undef": 0,
    "no-useless-escape": 0,
    "meteor/no-session": 0,
    "comma-dangle": 1,
    "meteor/template-names": [2, "snake-case"],
    "max-len": 0,
    "no-param-reassign": ["error", { "props": false }],
    "radix": 0,
    "object-shorthand": [ "error", "always", { avoidQuotes: false }],
    "semi": ["error", "always"],
  },
  "globals": {
    "Meteor": false,
    "Session": false
  },
  "env": {
    "meteor": true,
    "node": true,
    "browser": true
  },
};
