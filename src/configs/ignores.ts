import { fileURLToPath, pathToFileURL } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import { type Linter } from 'eslint';
import { findUpSync } from 'find-up-simple';

import { type ConfigOptions } from '../index';

const defaultIgnores = [
  '**/node_modules',
  '**/dist',
  '**/output',
  '**/coverage',
  '**/.out',
  '**/.output',
  '**/.cache',
  '**/tmp',
  '**/.tmp',
  '**/.vite',
];

export interface IgnoresConfigOption {
  globs: string[];
  gitignore?: boolean | { cwd: string };
}

export default function ignoresConfig(
  options: ConfigOptions
): Linter.FlatConfig[] {
  const config: Linter.FlatConfig[] = [];

  const { globs = [], gitignore = true } = options.ignores ?? {};

  if (gitignore) {
    const cwd = gitignore === true ? process.cwd() : gitignore.cwd;
    const gitignorePath = findUpSync('.gitignore', { cwd });
    if (!gitignorePath) {
      throw new Error('No .gitignore found.');
    }
    config.push(
      includeIgnoreFile(fileURLToPath(pathToFileURL(gitignorePath).href))
    );
  }

  config.push({
    ignores: [...defaultIgnores, ...globs],
  });

  return config;
}
