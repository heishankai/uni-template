import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { ignores: ['dist/*', 'node_modules/*', 'build/*'] },
  {
    rules: {
      // 'no-undef': 'off',
      'vue/multi-word-component-names': 'off',
      // 'vue/no-setup-props-destructure': ['off'],
      // 'vue/no-deprecated-html-element-is': ['off'],
      // '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },
  // 小程序全局变量
  {
    languageOptions: {
      globals: {
        uni: true,
        wx: true,
        WechatMiniprogram: true,
        getCurrentPages: true,
        UniApp: true,
        UniHelper: true,
        Page: true,
        AnyObject: true,
        // 全局自动导入
      },
    },
  },
]
