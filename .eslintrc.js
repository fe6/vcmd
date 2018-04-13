// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
  },
  extends: "airbnb-base",
  // required to lint *.vue files
  plugins: [
    "html",
    // "markdowm"
  ],
  // check if imports actually resolve
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "lib/config/webpack.base.config.js"
      }
    }
  },
  // add your custom rules here
  "rules": {
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "spaced-comment": "off",
    "no-dupe-keys": "off",
    "no-console": "off",
    "no-plusplus": "off",
    // allow optionalDependencies
    "import/no-extraneous-dependencies": ["error", {
      "optionalDependencies": ["test/unit/index.js"]
    }],
    "no-bitwise": ["error", { "allow": ["&", ">>"] }],
    "no-param-reassign": ["error", { "props": false }],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
}
