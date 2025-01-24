import { type Linter } from 'eslint';
import jsdoc from 'eslint-plugin-jsdoc';

import { type ConfigOptions } from '../index';
import { getOverrides } from '../utils';

export default function jsdocConfig(options: ConfigOptions): Linter.Config[] {
  const rules: Partial<Linter.RulesRecord> = {
    'require-jsdoc': 'off',
    'jsdoc/require-description-complete-sentence': 'error',
    'jsdoc/require-hyphen-before-param-description': [
      'error',
      'always',
      { tags: { '*': 'always' } },
    ],
    'jsdoc/require-jsdoc': options.library
      ? ['error', { publicOnly: true }]
      : 'off',
    'jsdoc/tag-lines': [
      'error',
      'always',
      {
        count: 0,
        startLines: 1,
      },
    ],
    'jsdoc/require-param': [
      'error',
      {
        checkDestructuredRoots: false,
      },
    ],
    'jsdoc/check-param-names': [
      'error',
      {
        checkDestructured: false,
      },
    ],
  };

  return [
    options.typescript
      ? jsdoc.configs['flat/recommended-typescript-error']
      : jsdoc.configs['flat/recommended-error'],
    {
      rules: {
        ...rules,
        ...getOverrides(options.jsdoc),
      },
    },
  ];
}
