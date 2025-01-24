# @itskyedo/eslint-config

- 🌈 Simple no-hassle configuration
- 💭 Opinionated but customizable
- 📦 Includes out-of-the-box support for useful plugins
  - TypeScript support
  - Prettier support
  - Stylistic rules
  - Validate proper imports
  - Lint JSDoc comments
  - Enforce best practices for promises
  - Sort imports, exports, objects, and types
  - and more to come

## 🗒️ Notes

This is a simple and modular way to setup projects with ESLint. Since the configuration is based on my own personal preferences, there may be rules that you may not want. However, plugins are optional and rules are easy to customize if necessary.

> [!WARNING]
> The project is still in its early stages so there may be bugs and/or
> unwanted behavior until the `v1.0.0` release.

## 🚀 Getting Started

### Prerequisites

- ESLint v9+

### Installation

```console
npm install -D @itskyedo/eslint-config
```

---

## 📚 API Reference

### `function createConfig`

Initializes the ESLint config.

| Parameter            | Type              | Description                                     |
| :------------------- | :---------------- | :---------------------------------------------- |
| **options**          | `ConfigOptions`   | The customizable options.                       |
| **...customConfigs** | `Linter.Config[]` | Additional configuration objects and overrides. |

**Returns**: `Linter.Config[]` An ESLint flat config array.

### `interface ConfigOptions`

| Property       | Type                                     | Description                                         | Link                                                                               |
| :------------- | :--------------------------------------- | :-------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **library**    | `boolean`                                | Whether to use the recommended rules for libraries. |                                                                                    |
| **base?**      | `Partial<Linter.RulesRecord>`            | Overrides for the default base rules.               | [eslint](https://eslint.org/docs/latest/rules/)                                    |
| **typescript** | `boolean \| Partial<Linter.RulesRecord>` | Overrides for the default TypeScript rules          | [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)        |
| **jsdoc**      | `boolean \| Partial<Linter.RulesRecord>` | Overrides for the default JSDoc rules.              | [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)                |
| **import**     | `boolean \| Partial<Linter.RulesRecord>` | Overrides for the default import rules.             | [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x)          |
| **promise**    | `boolean \| Partial<Linter.RulesRecord>` | Overrides for the default promise rules.            | [eslint-plugin-promise](https://github.com/eslint-community/eslint-plugin-promise) |
| **sort**       | `boolean \| Partial<Linter.RulesRecord>` | Overrides for the default sort rules.               | [eslint-plugin-sort](https://github.com/eslint-community/eslint-plugin-promise)    |
| **stylistic**  | `boolean \| Partial<Linter.RulesRecord>` | Overrides for the default stylistic rules.          | [eslint-stylistic](https://github.com/eslint-stylistic/eslint-stylistic)           |
| **prettier**   | `boolean \| Partial<Linter.RulesRecord>` | Overrides for the default prettier rules.           | [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)       |

---

## 💡 Examples

### Simple project setup

Set to `true` to enable the default rules or `false` to disable the plugin. Optionally, an object can be passed to add or override the default rules for that plugin.

Note that the name of the plugin is **required** when adding or override rules. Plugins are loaded in the order listed in `ConfigOptions`.

```javascript
// eslint.config.mjs

import createConfig from '@itskyedo/eslint-config';

export default createConfig({
  library: true,
  base: {
    'no-unused-vars': 'off',
  },
  typescript: true,
  jsdoc: true,
  import: {
    'import-x/consistent-type-specifier-style': 'off',
  },
  promise: true,
  sort: true,
  stylistic: false,
  prettier: true,
});
```

### Setup with other configs

You can pass all other configs as the last arguments.

Note that `prettier` will always be loaded last within `createConfig` so that it can override conflicting rules.

```javascript
// eslint.config.mjs

import createConfig from '@itskyedo/eslint-config';

export default createConfig(
  {
    library: true,
    typescript: true,
    jsdoc: true,
    import: true,
    promise: true,
    sort: true,
    stylistic: false,
    prettier: true,
  },

  // Other configs below
  {
    files: ['**/*.js'],
    rules: {
      semi: 'error',
      'no-unused-vars': 'error',
    },
  }
);
```

---

## 📃 License

MIT License. See [LICENSE](https://github.com/itskyedo/eslint-config/blob/main/LICENSE) for details.
