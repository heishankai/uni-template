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
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
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
