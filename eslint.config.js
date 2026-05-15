import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // react/jsx-uses-vars marks any variable used as a JSX tag as "used",
      // so <Icon /> will prevent Icon from being flagged as unused.
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',

      // Downgraded from 'error' to 'warn' so genuine unused vars are still
      // flagged, but they won't block your build.
      // - varsIgnorePattern: ignores ALL_CAPS module-level constants
      // - args: 'none': ignores unused function parameters
      // - ignoreRestSiblings: allows { used, ...rest } patterns
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^[A-Z_]',
        args: 'none',
        ignoreRestSiblings: true,
      }],
    },
  },
])
