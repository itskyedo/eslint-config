/// <reference types="../@types/eslint-plugin-promise" />

import { type Linter } from 'eslint';
import promisePlugin from 'eslint-plugin-promise';

import { type ConfigOptions } from '../index';
import { getOverrides } from '../utils';

export default function promiseConfig(
  options: ConfigOptions
): Linter.FlatConfig[] {
  const rules: Partial<Linter.RulesRecord> = {
    'promise/always-return': 'off',
  };

  return [
    promisePlugin.configs['flat/recommended'],
    {
      rules: {
        ...rules,
        ...getOverrides(options.promise),
      },
    },
  ];
}
