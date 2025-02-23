import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { ignores: ['dist/*','node_modules/*','build/*'] },
  {
    rules: {
      // 'no-undef': 'off',
      'vue/multi-word-component-names': 'off',
      // 'vue/no-setup-props-destructure': ['off'],
      // 'vue/no-deprecated-html-element-is': ['off'],
      // '@typescript-eslint/no-unused-vars': ['off'],
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
  // 添加 Prettier 插件
  {
    extends: ['plugin:prettier/recommended'],
  },
]