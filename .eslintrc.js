module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier", "react"],
  rules: {
    /* prittierのルール */
    "prettier/prettier": ["error"],
    /* jsx, jsを許可 */
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    /* thisを介したpropsの警告無効化 */
    "react/no-this-in-sfc": 0,
    /* propsなどを直接使用可能にする */
    "react/destructuring-assignment": 0,
    /* jsxを1行で記述しなくてもよくする */
    "react/jsx-one-expression-per-line": 0,
    /* prop-typesによるバリデーション */
    "react/prop-types": 0,
    // devDependencies（外部モジュール）のインポートをコードに含めるのを許可
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
  }
};
