import tsParser from '@typescript-eslint/parser';
import { type Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import-x';

import { type ConfigOptions } from '../index';
import { getOverrides } from '../utils';

export default function importConfig(options: ConfigOptions): Linter.Config[] {
  const staticAnalysisRules: Partial<Linter.RulesRecord> = {
    // Reports use of a default export as a locally named import.
    'import-x/no-named-default': 'error',
    // Forbid import of modules using absolute paths.
    'import-x/no-absolute-path': 'error',
    // Forbid Webpack loader syntax in imports
    'import-x/no-webpack-loader-syntax': 'error',
    // Forbid a module from importing itself
    'import-x/no-self-import': 'error',
    // Forbid a module from importing a module with a dependency path back to itself.
    'import-x/no-cycle': 'error',
    // Ensures that there are no useless path segments.
    'import-x/no-useless-path-segments': 'error',
    // Ensures that modules contain exports and/or all modules are consumed within other modules.
    'import-x/no-unused-modules': 'error',
  };

  const helpfulRules: Partial<Linter.RulesRecord> = {
    // Report use of exported name as identifier of default export.
    'import-x/no-named-as-default': 'error',
    // Report use of exported name as property of default export. Disabling since this gives a lot of false positives.
    'import-x/no-named-as-default-member': 'off',
    // Forbid imported names marked with @deprecated documentation tag.
    'import-x/no-deprecated': 'error',
    // Forbid the use of extraneous packages.
    'import-x/no-extraneous-dependencies': 'error',
    // Forbid the use of mutable exports with var or let.
    'import-x/no-mutable-exports': 'error',
  };

  const stylisticRules: Partial<Linter.RulesRecord> = {
    // Ensure consistent use of file extension within the import path.
    'import-x/extensions': [
      'error',
      {
        js: 'never',
        json: 'always',
        svg: 'always',
        png: 'always',
        jpg: 'always',
        ico: 'always',
        graphql: 'always',
        css: 'always',
        sass: 'always',
        scss: 'always',
        less: 'always',
        styl: 'always',
      },
    ],
    // Enforce a convention in module import order.
    'import-x/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: false,
        },
        'newlines-between': 'always',
      },
    ],
    // Enforce a newline after import statements.
    'import-x/newline-after-import': 'error',
    // Forbid anonymous values as default exports
    'import-x/no-anonymous-default-export': 'error',
  };

  const config: Linter.Config[] = [
    importPlugin.flatConfigs.recommended as Linter.Config,
  ];

  if (options.typescript) {
    config.push(importPlugin.flatConfigs.typescript);
  }

  config.push({
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ignores: ['eslint.config.js'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...staticAnalysisRules,
      ...helpfulRules,
      ...stylisticRules,
      ...getOverrides(options.import),
    },
  });

  return config;
}
