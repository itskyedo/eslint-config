import { type Linter } from 'eslint';

/**
 * Gets the overrides from an `object`, `boolean`, or `undefined` value.
 *
 * @param overrides - The payload.
 * @returns - The override rules.
 */
export function getOverrides(
  overrides: Partial<Linter.RulesRecord> | boolean | undefined
): Partial<Linter.RulesRecord> {
  return typeof overrides === 'object' ? overrides : {};
}
