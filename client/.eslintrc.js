var path = require('path');

module.exports = {
  parser: "babel-eslint",
  extends: 'eslint-config-airbnb',
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": [
      0,
      { "ignorePureComponents": true },
    ],
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {}
    }
  }
};
