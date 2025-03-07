import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      '**/dist/*',
      '**/tests/*',
      'tsconfig.json',
      '**/*.mjs',
      '**/*.js',
      '**/*.config.cjs',
    ]
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": [
        "error",
        {
          "ignoreRestArgs": true
        }
      ]
    }
  }
  
];