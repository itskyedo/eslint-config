import { type Linter } from 'eslint';

import baseConfig from './configs/base';
import ignoresConfig, { type IgnoresConfigOption } from './configs/ignores';
import importConfig from './configs/import';
import jsdocConfig from './configs/jsdoc';
import prettierConfig from './configs/prettier';
import promiseConfig from './configs/promise';
import sortConfig from './configs/sort';
import stylisticConfig from './configs/stylistic';

export interface ConfigOptions {
  library: boolean;
  ignores?: IgnoresConfigOption;
  base?: Partial<Linter.RulesRecord>;
  typescript: boolean | Partial<Linter.RulesRecord>;
  jsdoc: boolean | Partial<Linter.RulesRecord>;
  import: boolean | Partial<Linter.RulesRecord>;
  promise: boolean | Partial<Linter.RulesRecord>;
  sort: boolean | Partial<Linter.RulesRecord>;
  stylistic: boolean | Partial<Linter.RulesRecord>;
  prettier: boolean | Partial<Linter.RulesRecord>;
}

/**
 * Initializes the ESLint config.
 *
 * @param options - The customizable options.
 * @param customConfigs - Additional configuration objects and overrides.
 * @returns - An ESLint flat config array.
 */
export default function createConfig(
  options: ConfigOptions,
  ...customConfigs: Linter.Config[]
): Linter.Config[] {
  const configs: Linter.Config[] = [
    ...ignoresConfig(options),
    ...baseConfig(options),
  ];

  if (options.jsdoc) {
    configs.push(...jsdocConfig(options));
  }

  if (options.import) {
    configs.push(...importConfig(options));
  }

  if (options.promise) {
    configs.push(...promiseConfig(options));
  }

  if (options.sort) {
    configs.push(...sortConfig(options));
  }

  if (options.stylistic) {
    configs.push(...stylisticConfig(options));
  }

  configs.push(...customConfigs);

  // Prettier should be last so it can override conflicting rules
  if (options.prettier) {
    configs.push(...prettierConfig(options));
  }

  return configs;
}
