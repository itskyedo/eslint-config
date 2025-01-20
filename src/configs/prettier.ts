import { type Linter } from 'eslint';
import prettier from 'eslint-plugin-prettier/recommended';

import { type ConfigOptions } from '../index';
import { getOverrides } from '../utils';

export default function prettierConfig(
  options: ConfigOptions
): Linter.FlatConfig[] {
  const rules: Partial<Linter.RulesRecord> = {};

  return [
    prettier,
    {
      rules: {
        ...rules,
        ...getOverrides(options.prettier),
      },
    },
  ];
}
