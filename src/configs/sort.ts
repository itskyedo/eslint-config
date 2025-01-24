import { type Linter } from 'eslint';
import sort from 'eslint-plugin-sort';

import { type ConfigOptions } from '../index';
import { getOverrides } from '../utils';

export default function sortConfig(options: ConfigOptions): Linter.Config[] {
  const objectRules: Partial<Linter.RulesRecord> = {
    // Sorts object destructuring properties
    'sort/destructuring-properties': 'error',
    // Sorts object properties
    'sort/object-properties': 'off',
  };

  const exportRules: Partial<Linter.RulesRecord> = {
    // Sorts exports
    'sort/exports': [
      'error',
      {
        groups: [
          { type: 'default', order: 50 },
          { type: 'sourceless', order: 40 },
          { regex: '^\\.+\\/', order: 30 },
          { type: 'dependency', order: 10 },
          { type: 'other', order: 20 },
        ],
      },
    ],
    // Sorts export members
    'sort/export-members': 'error',
  };

  let importRules: Partial<Linter.RulesRecord>;
  if (options.import) {
    importRules = {
      // Sorts imports
      'sort/imports': 'off',
      // Sorts import members
      'sort/import-members': 'off',
    };
  } else {
    importRules = {
      // Sorts imports
      'sort/imports': [
        'error',
        {
          groups: [
            { type: 'side-effect', order: 10 },
            { regex: '^\\.+\\/', order: 40 },
            { type: 'dependency', order: 20 },
            { type: 'other', order: 30 },
          ],
        },
      ],
      // Sorts import members
      'sort/import-members': 'error',
    };
  }

  const tsRules: Partial<Linter.RulesRecord> = {
    // Sorts TypeScript type properties
    'sort/type-properties': 'off',
    // Sorts TypeScript string enums
    'sort/string-enums': 'off',
    // Sorts TypeScript string unions
    'sort/string-unions': 'off',
  };

  return [
    {
      plugins: {
        sort: sort,
      },
      rules: {
        ...objectRules,
        ...exportRules,
        ...importRules,
        ...tsRules,
        ...getOverrides(options.sort),
      },
    },
  ];
}
