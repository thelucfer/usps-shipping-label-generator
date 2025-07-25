import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:better-tailwindcss/recommended-warn',
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'react/no-children-prop': [
        'warn',
        {
          allowFunctions: true,
        },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: './app/globals.css',
      },
    },
  }),
]

export default eslintConfig
