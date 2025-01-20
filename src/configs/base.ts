import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { type Linter } from 'eslint';
import * as tseslint from 'typescript-eslint';

import { type ConfigOptions } from '../index';
import { getOverrides } from '../utils';

const jsFiles = ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'];
const tsFiles = ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.tsx'];

/**
 * Replaces the base rule by disabling it and setting an equivalent rule.
 *
 * This is usually required when enabling both rules would cause incorrect errors.
 *
 * @param baseRule - The name of the base rule to disable.
 * @param rule - The name of the equivalent rule to enable.
 * @param value - The value of the replacement rule.
 * @returns - The disabled rule and the replacement rule.
 */
function replaceBaseRule(
  baseRule: string,
  rule: string,
  value: Linter.RulesRecord[string]
): Linter.RulesRecord {
  return {
    [baseRule]: 'off',
    [rule]: value,
  };
}

function jsConfig(options: ConfigOptions): Linter.FlatConfig[] {
  const bestPracticeRules: Partial<Linter.RulesRecord> = {
    // Enforces getter/setter pairs in objects
    'accessor-pairs': 'off',
    // Enforces return statements in callbacks of array's methods
    'array-callback-return': 'error',
    // Treat var statements as if they were block scoped
    'block-scoped-var': 'error',
    // Enforce that class methods utilize this
    'class-methods-use-this': 'off',
    // Specify the maximum cyclomatic complexity allowed in a program
    complexity: 'off',
    // Require return statements to either always or never specify values
    'consistent-return': 'error',
    // Specify curly brace conventions for all control statements
    curly: ['error', 'all'],
    // Require default case in switch statements
    'default-case': 'off',
    // Encourages use of dot notation whenever possible
    'dot-notation': ['error', { allowKeywords: true }],
    // Enforces consistent newlines before or after dots
    'dot-location': ['error', 'property'],
    // Require the use of === and !==
    eqeqeq: ['error', 'smart'],
    // Make sure for-in loops have an if statement
    'guard-for-in': 'error',
    // enforce a maximum number of classes per file
    'max-classes-per-file': 'off',
    // Disallow the use of alert, confirm, and prompt
    'no-alert': 'error',
    // Disallow lexical declarations in case clauses
    'no-case-declarations': 'error',
    // Disallow use of arguments.caller or arguments.callee
    'no-caller': 'error',
    // Disallow division operators explicitly at beginning of regular expression
    'no-div-regex': 'error',
    // Disallow else after a return in an if
    'no-else-return': 'off',
    // Disallow use of empty functions
    'no-empty-function': 'error',
    // Disallow use of empty destructuring patterns
    'no-empty-pattern': 'error',
    // Disallow comparisons to null without a type-checking operator
    'no-eq-null': 'off',
    // Disallow use of eval()
    'no-eval': 'error',
    // Disallow adding to native types
    'no-extend-native': 'error',
    // Disallow unnecessary function binding
    'no-extra-bind': 'error',
    // Disallow unnecessary labels
    'no-extra-label': 'error',
    // Disallow fallthrough of case statements
    'no-fallthrough': 'error',
    // Disallow the use of leading or trailing decimal points in numeric literals
    'no-floating-decimal': 'error',
    // Disallow reassignments of native objects
    'no-global-assign': 'error',
    // Disallow the type conversions with shorter notations
    'no-implicit-coercion': 'error',
    // Disallow var and named functions in global scope
    'no-implicit-globals': 'error',
    // Disallow use of eval()-like methods
    'no-implied-eval': 'error',
    // Disallow this keywords outside of classes or class-like objects
    'no-invalid-this': 'off',
    // Disallow usage of __iterator__ property
    'no-iterator': 'error',
    // Disallow use of labeled statements
    'no-labels': ['error', { allowLoop: true }],
    // Disallow unnecessary nested blocks
    'no-lone-blocks': 'error',
    // Disallow creation of functions within loops
    'no-loop-func': 'error',
    // Disallow the use of magic numbers
    'no-magic-numbers': 'off',
    // Disallow use of multiple spaces
    'no-multi-spaces': 'error',
    // Disallow use of multiline strings
    'no-multi-str': 'off',
    // Disallow use of new operator for Function object
    'no-new-func': 'error',
    // Disallow creating new instances of String, Number, and Boolean
    'no-new-wrappers': 'error',
    // Disallow use of new operator when not part of the assignment or comparison
    'no-new': 'error',
    // Disallow use of octal escape sequences in string literals,
    // such as var foo = "Copyright \251";
    'no-octal-escape': 'error',
    // Disallow use of octal literals
    'no-octal': 'error',
    // Allow reassignment of function parameters
    'no-param-reassign': 'off',
    // Disallow use of process.env
    'no-process-env': 'error',
    // Disallow usage of __proto__ property
    'no-proto': 'error',
    // Disallow declaring the same variable more than once
    'no-redeclare': 'error',
    // Disallow certain object properties
    'no-restricted-properties': 'off',
    // Disallow use of assignment in return statement
    'no-return-assign': 'error',
    // Disallow unnecessary return await
    'no-return-await': 'error',
    // Disallow use of javascript: urls.,
    'no-script-url': 'off',
    // Disallow assignments where both sides are exactly the same
    'no-self-assign': ['error', { props: true }],
    // Disallow comparisons where both sides are exactly the same
    'no-self-compare': 'error',
    // Disallow use of comma operator
    'no-sequences': 'error',
    // Restrict what can be thrown as an exception
    'no-throw-literal': 'error',
    // Disallow unmodified conditions of loops
    'no-unmodified-loop-condition': 'error',
    // Disallow usage of expressions in statement position
    'no-unused-expressions': 'error',
    // Disallow unused labels
    'no-unused-labels': 'error',
    // Disallow unnecessary .call() and .apply()
    'no-useless-call': 'error',
    // Disallow unnecessary catch clauses
    'no-useless-catch': 'error',
    // Disallow unnecessary concatenation of literals or template literals
    'no-useless-concat': 'error',
    // Disallow unnecessary usage of escape character
    'no-useless-escape': 'error',
    // Disallow redundant return statements
    'no-useless-return': 'error',
    // Disallow use of void operator
    'no-void': 'error',
    // Disallow usage of configurable warning terms in comments
    'no-warning-comments': 'error',
    // Disallow use of the with statement
    'no-with': 'error',
    // Suggest using named capture group in regular expression
    'prefer-named-capture-group': 'off',
    // Require using Error objects as Promise rejection reasons
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    // Require use of the second argument for parseInt()
    radix: 'error',
    // Disallow async functions which have no await expression
    'require-await': 'error',
    // Enforce the use of u flag on RegExp
    'require-unicode-regexp': 'off',
    // Requires to declare all vars on top of their containing scope
    'vars-on-top': 'off',
    // Require immediate function invocation to be wrapped in parentheses
    'wrap-iife': ['error', 'inside'],
    // Require or disallow Yoda conditions
    yoda: ['error', 'never'],
    // Disallow returning value from constructor
    'no-constructor-return': 'error',
    // Require grouped accessor pairs in object literals and classes
    'grouped-accessor-pairs': 'error',
  };

  const errorCheckingRules: Partial<Linter.RulesRecord> = {
    // Enforce “for” loop update clause moving the counter in the right direction.
    'for-direction': 'error',
    // Enforce return statements in getters
    'getter-return': ['error', { allowImplicit: true }],
    // disallow using an async function as a Promise executor
    'no-async-promise-executor': 'error',
    // Disallow await inside of loops
    'no-await-in-loop': 'off',
    // Disallow comparing against -0
    'no-compare-neg-zero': 'error',
    // Disallow assignment in conditional expressions
    'no-cond-assign': 'error',
    // Disallow use of console
    'no-console': options.library ? 'off' : 'error',
    // Disallow use of constant expressions in conditions
    'no-constant-condition': ['error', { checkLoops: false }],
    // Disallow control characters in regular expressions
    'no-control-regex': 'error',
    // Disallow use of debugger
    'no-debugger': 'off',
    // Disallow duplicate arguments in functions
    'no-dupe-args': 'error',
    // Disallow duplicate keys when creating object literals
    'no-dupe-keys': 'error',
    // Disallow a duplicate case label.
    'no-duplicate-case': 'error',
    // Disallow the use of empty character classes in regular expressions
    'no-empty-character-class': 'error',
    // Disallow empty statements
    'no-empty': 'error',
    // Disallow assigning to the exception in a catch block
    'no-ex-assign': 'error',
    // Disallow double-negation boolean casts in a boolean context
    'no-extra-boolean-cast': 'error',
    // Disallow unnecessary parentheses
    'no-extra-parens': 'off',
    // Disallow unnecessary semicolons
    'no-extra-semi': 'error',
    // Disallow overwriting functions written as function declarations
    'no-func-assign': 'error',
    // Disallow function or variable declarations in nested blocks
    'no-inner-declarations': 'error',
    // Disallow invalid regular expression strings in the RegExp constructor
    'no-invalid-regexp': 'error',
    // Disallow irregular whitespace outside of strings and comments
    'no-irregular-whitespace': 'error',
    // disallow characters which are made with multiple code points in character class syntax
    'no-misleading-character-class': 'error',
    // Disallow the use of object properties of the global object (Math and JSON) as functions
    'no-obj-calls': 'error',
    // Disallow use of Object.prototypes builtins directly
    'no-prototype-builtins': 'error',
    // Disallow multiple spaces in a regular expression literal
    'no-regex-spaces': 'error',
    // Disallow sparse arrays
    'no-sparse-arrays': 'error',
    // Disallow template literal placeholder syntax in regular strings
    'no-template-curly-in-string': 'error',
    // Disallow unreachable statements after a return, throw, continue, or break statement
    'no-unreachable': 'error',
    // Disallow control flow statements in finally blocks
    'no-unsafe-finally': 'error',
    // Disallow negation of the left operand of an in expression
    'no-unsafe-negation': 'error',
    // disallow assignments that can lead to race conditions due to usage of await or yield
    'require-atomic-updates': 'error',
    // Disallow comparisons with the value NaN
    'use-isnan': 'error',
    // Ensure JSDoc comments are valid
    'valid-jsdoc': 'off',
    // Ensure that the results of typeof are compared against a valid string
    'valid-typeof': 'error',
    // Avoid code that looks like two expressions but is actually one
    'no-unexpected-multiline': 'error',
    // Disallow returning values from setters
    'no-setter-return': 'error',
    // Disallow duplicate conditions in if-else-if chains
    'no-dupe-else-if': 'error',
  };

  const variableRules: Partial<Linter.RulesRecord> = {
    // enforce or disallow variable initializations at definition
    'init-declarations': 'off',
    // Disallow the catch clause parameter name being the same as a variable in the outer scope
    'no-catch-shadow': 'error',
    // Disallow deletion of variables
    'no-delete-var': 'error',
    // Disallow labels that share a name with a variable
    'no-label-var': 'error',
    // Restrict usage of specified global variables
    'no-restricted-globals': 'error',
    // Disallow shadowing of names such as arguments
    'no-shadow-restricted-names': 'error',
    // Disallow declaration of variables already declared in the outer scope
    'no-shadow': 'error',
    // Disallow use of undefined when initializing variables
    'no-undef-init': 'error',
    // Disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-undef': 'error',
    // Disallow use of undefined variable
    'no-undefined': 'off',
    // Disallow use of variables before they are defined
    'no-use-before-define': ['error', 'nofunc'],
    // Disallow declaration of variables that are not used in the code
    'no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        args: 'none',
        caughtErrors: 'none',
      },
    ],
  };

  const stylisticRules: Partial<Linter.RulesRecord> = {
    // enforce linebreaks after opening and before closing array brackets
    'array-bracket-newline': 'off',
    // Enforce spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],
    // enforce line breaks after each array element
    'array-element-newline': 'off',
    // Disallow or enforce spaces inside of single line blocks
    'block-spacing': ['error', 'always'],
    // Enforce one true brace style
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    // Require camel case names
    camelcase: ['error', { properties: 'always' }],
    // Enforce or disallow capitalization of the first letter of a comment
    'capitalized-comments': 'off',
    // Disallow or enforce trailing commas
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    // Enforce spacing before and after comma
    'comma-spacing': ['error', { before: false, after: true }],
    // Enforce one true comma style
    'comma-style': ['error', 'last'],
    // Require or disallow padding inside computed properties
    'computed-property-spacing': ['error', 'never'],
    // Enforces consistent naming when capturing the current execution context
    'consistent-this': ['error', 'self'],
    // Enforce newline at the end of file, with no multiple empty lines
    'eol-last': 'error',
    // Disallow space between function identifier and application
    'func-call-spacing': 'error',
    // Require function names to match the name of the variable or property to which they are assigned
    'func-name-matching': 'error',
    // Don't require function expressions to have a name
    'func-names': 'off',
    // Enforces use of function declarations or expressions
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    // enforce consistent line breaks inside function parentheses
    'function-paren-newline': ['error', 'consistent'],
    // Blacklist certain identifiers to prevent them being used
    'id-blacklist': 'off',
    // This option enforces minimum and maximum identifier lengths (variable names, property names etc.)
    'id-length': 'off',
    // Require identifiers to match the provided regular expression
    'id-match': 'off',
    // Enforce a consistent location for an arrow function containing an implicit return
    'implicit-arrow-linebreak': 'off',
    // Disable eslint v4 stricter indent rules
    indent: 'off',
    // Use eslint v3 indent rules: This option sets a specific tab width for your code
    'indent-legacy': ['error', 2, { SwitchCase: 1, MemberExpression: 1 }],
    // Specify whether double or single quotes should be used in JSX attributes
    'jsx-quotes': ['error', 'prefer-double'],
    // Enforces spacing between keys and values in object literal properties
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // Enforce spacing before and after keywords
    'keyword-spacing': ['error', { before: true, after: true, overrides: {} }],
    // Disallow mixed "LF" and "CRLF" as linebreaks
    'linebreak-style': 'off',
    // Enforces empty lines around comments
    'lines-around-comment': ['error', { beforeBlockComment: true }],
    // require or disallow an empty line between class members
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    // Enforce position of line comments
    'line-comment-position': 'off',
    // Enforce a maximum file length
    'max-lines': 'off',
    // 	enforce a maximum number of line of code in a function
    'max-lines-per-function': 'off',
    // Specify the maximum depth callbacks can be nested
    'max-nested-callbacks': 'off',
    // Specify the maximum number of statements allowed per line
    'max-statements-per-line': ['error', { max: 2 }],
    // enforce a particular style for multiline comments
    'multiline-comment-style': 'off',
    // Enforce newlines between operands of ternary expressions
    'multiline-ternary': 'off',
    // Require a capital letter for constructors
    'new-cap': ['error', { newIsCap: true, capIsNew: false }],
    // Disallow the omission of parentheses when invoking a constructor with no arguments
    'new-parens': 'error',
    // Allow/disallow an empty newline after var statement
    'newline-after-var': 'off',
    // Require newline before `return` statement
    'newline-before-return': 'off',
    // Enforce newline after each call when chaining the calls
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
    // Disallow use of the Array constructor
    'no-array-constructor': 'error',
    // Disallow use of the continue statement
    'no-continue': 'off',
    // Disallow comments inline after code
    'no-inline-comments': 'off',
    // Disallow if as the only statement in an else block
    'no-lonely-if': 'error',
    // Disallow mixes of different operators
    'no-mixed-operators': 'error',
    // Disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': 'error',
    // Disallow use of chained assignment expressions
    'no-multi-assign': 'error',
    // Disallow multiple empty lines
    'no-multiple-empty-lines': 'error',
    // Disallow negated conditions
    'no-negated-condition': 'error',
    // Disallow nested ternary expressions
    'no-nested-ternary': 'error',
    // Disallow use of the Object constructor
    'no-new-object': 'error',
    // Disallow specified syntax
    'no-restricted-syntax': 'off',
    // Disallow tabs in file
    'no-tabs': 'error',
    // Disallow the use of ternary operators
    'no-ternary': 'off',
    // Disallow trailing whitespace at the end of lines
    'no-trailing-spaces': 'error',
    // Allow dangling underscores in identifiers
    'no-underscore-dangle': 'off',
    // Disallow the use of Boolean literals in conditional expressions
    'no-unneeded-ternary': 'error',
    // Disallow whitespace before properties
    'no-whitespace-before-property': 'error',
    // Enforce the location of single-line statements
    'nonblock-statement-body-position': 'off',
    // Enforce consistent line breaks inside braces
    'object-curly-newline': 'off',
    // Require or disallow padding inside curly braces
    'object-curly-spacing': ['error', 'never'],
    // Enforce placing object properties on separate lines
    'object-property-newline': 'off',
    // Allow or disallow one variable declaration per function
    'one-var': ['error', 'never'],
    // Require or disallow an newline around variable declarations
    'one-var-declaration-per-line': ['error', 'initializations'],
    // Require assignment operator shorthand where possible or prohibit it entirely
    'operator-assignment': ['error', 'always'],
    // Enforce operators to be placed before or after line breaks
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],
    // Enforce padding within blocks
    'padded-blocks': 'off',
    // require or disallow padding lines between statements
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
    ],
    // disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead.
    'prefer-object-spread': 'error',
    // Require quotes around object literal property names
    'quote-props': ['error', 'as-needed'],
    // Specify whether backticks, double or single quotes should be used
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    // Require JSDoc comments
    'require-jsdoc': 'off',
    // Enforce spacing before and after semicolons
    'semi-spacing': ['error', { before: false, after: true }],
    // enforce location of semicolons
    'semi-style': ['error', 'last'],
    // Require or disallow use of semicolons instead of ASI
    semi: ['error', 'always'],
    // Requires object keys to be sorted
    'sort-keys': 'off',
    // Sort variables within the same declaration block
    'sort-vars': 'off',
    // Require or disallow space before blocks
    'space-before-blocks': ['error', 'always'],
    // Require or disallow space before function opening parenthesis
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    // Require or disallow spaces inside parentheses
    'space-in-parens': ['error', 'never'],
    // Require spaces around operators
    'space-infix-ops': 'error',
    // Require or disallow spaces before/after unary operators (words on by default, nonwords)
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    // Require or disallow a space immediately following the // or /* in a comment
    'spaced-comment': ['error', 'always', { markers: ['=', '/'] }],
    // enforce spacing around colons of switch statements
    'switch-colon-spacing': ['error', { after: true, before: false }],
    // Require or disallow spacing between template tags and their literals
    'template-tag-spacing': ['error', 'never'],
    // Require or disallow the Unicode BOM
    'unicode-bom': ['error', 'never'],
    // Require regex literals to be wrapped in parentheses
    'wrap-regex': 'off',
    // Disallow the use of `Math.pow` in favor of the `**` operator
    'prefer-exponentiation-operator': 'error',
    // Enforce sorted import declarations within modules
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
        allowSeparatedGroups: true,
      },
    ],
  };

  return [
    eslint.configs.recommended,
    {
      files: [...jsFiles, ...tsFiles],
      rules: {
        ...eslint.configs.recommended.rules,
        ...bestPracticeRules,
        ...errorCheckingRules,
        ...variableRules,
        ...stylisticRules,
        ...getOverrides(options.base),
      },
    },
  ];
}

function tsConfig(options: ConfigOptions): Linter.FlatConfig[] {
  const tsConfigRules: Partial<Linter.RulesRecord> = {
    camelcase: 'off',
    'no-dupe-args': 'off',
    'no-dupe-keys': 'off',
    'no-unreachable': 'off',
    'valid-typeof': 'off',
    'no-const-assign': 'off',
    'no-this-before-super': 'off',
    'func-style': 'off',
    ...replaceBaseRule(
      'no-unused-vars',
      '@typescript-eslint/no-unused-vars',
      'off'
    ),
    ...replaceBaseRule(
      'no-unused-expressions',
      '@typescript-eslint/no-unused-expressions',
      'off'
    ),
    ...replaceBaseRule(
      'no-useless-constructor',
      '@typescript-eslint/no-useless-constructor',
      'off'
    ),
    ...replaceBaseRule('no-shadow', '@typescript-eslint/no-shadow', 'off'),
    ...replaceBaseRule(
      'no-use-before-define',
      '@typescript-eslint/no-use-before-define',
      'off'
    ),
    ...replaceBaseRule(
      'require-await',
      '@typescript-eslint/require-await',
      'off'
    ),
    ...replaceBaseRule(
      'no-magic-numbers',
      '@typescript-eslint/no-magic-numbers',
      'off'
    ),
    ...replaceBaseRule(
      'no-empty-function',
      '@typescript-eslint/no-empty-function',
      'off'
    ),
    ...replaceBaseRule(
      'no-array-constructor',
      '@typescript-eslint/no-array-constructor',
      'off'
    ),
    ...replaceBaseRule(
      'no-redeclare',
      '@typescript-eslint/no-redeclare',
      'off'
    ),
  };

  const conflictingBaseRules: Partial<Linter.RulesRecord> = {
    // Breaks @typescript-eslint/parser
    strict: 'off',
    'array-callback-return': 'off',
    'getter-return': 'off',

    // Disallow duplicate class members. Disabling to allow overloaded methods in TypeScript.
    'no-dupe-class-members': 'off',
  };

  const bestPracticeRules: Partial<Linter.RulesRecord> = {
    // Disallow the any type.
    '@typescript-eslint/no-explicit-any': 'off',
    // Enforce specifying generic type arguments on type annotation or constructor name of a constructor call.
    '@typescript-eslint/consistent-generic-constructors': [
      'error',
      'type-annotation',
    ],
    // Enforce using the nullish coalescing operator instead of logical assignments or chaining.
    // Disabled because it can cause false positives in certain contexts which affect the code logic
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    // Disallow accidentally using the "empty object" type.
    '@typescript-eslint/no-empty-object-type': [
      'error',
      // Useful for when wanting to clone a type with a different name
      { allowInterfaces: 'with-single-extends' },
    ],
    // Disallow unused variables.
    ...replaceBaseRule('no-unused-vars', '@typescript-eslint/no-unused-vars', [
      'error',
      {
        ignoreRestSiblings: true,
        args: 'none',
        caughtErrors: 'none',
      },
    ]),
  };

  const stylisticRules: Partial<Linter.RulesRecord> = {
    // Enforce dot notation whenever possible.
    ...replaceBaseRule('dot-notation', '@typescript-eslint/dot-notation', [
      'error',
      {
        allowPrivateClassPropertyAccess: true,
        allowProtectedClassPropertyAccess: true,
        allowIndexSignaturePropertyAccess: true,
      },
    ]),
    // Disallow explicit type declarations for variables or parameters initialized to a number, string, or boolean.
    '@typescript-eslint/no-inferrable-types': 'off',
    // Require a consistent member declaration order.
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'public-static-get',
          'protected-static-field',
          'protected-static-get',
          'private-static-field',
          'private-static-get',
          '#private-static-field',
          '#private-static-get',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          '#private-static-method',
          'public-instance-field',
          'public-instance-get',
          'protected-instance-field',
          'protected-instance-get',
          'private-instance-field',
          'private-instance-get',
          '#private-instance-field',
          '#private-instance-get',
          'get',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          '#private-instance-method',
        ],
      },
    ],
    // Enforce consistent usage of type imports.
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    // Require or disallow the Record type.
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    // Enforce that literals on classes are exposed in a consistent style.
    '@typescript-eslint/class-literal-property-style': 'off',
  };

  if (options.stylistic) {
    Object.assign(stylisticRules, {
      'stylistic/semi': 'off',
      'stylistic/quotes': 'off',
      'stylistic/indent': 'off',
      'stylistic/brace-style': 'off',
      'stylistic/no-extra-parens': 'off',
      'stylistic/func-call-spacing': 'off',
    });
  }

  return tseslint.config({
    files: tsFiles,
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...tsConfigRules,
      ...conflictingBaseRules,
      ...bestPracticeRules,
      ...stylisticRules,
      ...getOverrides(options.typescript),
    },
  }) as Linter.FlatConfig[];
}

export default function baseConfig(
  options: ConfigOptions
): Linter.FlatConfig[] {
  const config: Linter.FlatConfig[] = [
    {
      ignores: [
        '**/node_modules/**/*',
        '**/dist/**/*',
        '**/build/**/*',
        '**/coverage/**/*',
      ],
    },
    ...jsConfig(options),
  ];

  if (options.typescript) {
    config.push(...tsConfig(options));
  }

  return config;
}
