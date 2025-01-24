declare module 'eslint-plugin-promise' {
  import { type Linter } from 'eslint';

  const plugin: {
    rules: Linter.RulesRecord;
    rulesConfig: Record<string, number>;
    configs: {
      recommended: Linter.Config;
      'flat/recommended': Linter.Config;
    };
  };

  export default plugin;
}
