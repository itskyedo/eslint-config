import stylistic from '@stylistic/eslint-plugin';
import { type Linter } from 'eslint';

import { type ConfigOptions } from '../index';
import { getOverrides } from '../utils';

export default function stylisticConfig(
  options: ConfigOptions
): Linter.Config[] {
  const rules: Partial<Linter.RulesRecord> = {};

  return [
    stylistic.configs['recommended-flat'],
    {
      rules: {
        ...rules,
        ...getOverrides(options.stylistic),
      },
    },
  ];
}
