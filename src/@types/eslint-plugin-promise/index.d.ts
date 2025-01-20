declare module 'eslint-plugin-promise' {
  import { type Linter } from 'eslint';

  const plugin: {
    rules: Linter.RulesRecord;
    rulesConfig: Record<string, number>;
    configs: {
      recommended: Linter.FlatConfig;
      'flat/recommended': Linter.FlatConfig;
    };
  };

  export default plugin;
}
