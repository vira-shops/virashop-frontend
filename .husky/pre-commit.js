#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Get all staged files (added, modified, or copied)
 * @returns {string[]} Array of staged file paths
 */
function getStagedFiles() {
  const result = execSync('git diff --cached --name-only --diff-filter=ACM').toString();
  return result.split('\n').filter(Boolean);
}

/**
 * Check for relative parent imports in TypeScript and TypeScript React files
 * @param {string[]} files - Array of file paths to check
 * @returns {boolean} True if relative imports with "../" are found, false otherwise
 */
function checkRelativeImports(files) {
  let relativeImportsFound = false;

  const regex = /from (\"|\')\.\.+\//g; // Only match "../" and beyond

  files.forEach((file) => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (!fs.existsSync(file)) return;
      const contents = fs.readFileSync(file, 'utf-8').split('\n');
      for (let line of contents) {
        line = line.trim();
        if (line.startsWith('//')) continue;
        if (!line.startsWith('import')) continue;
        if (regex.test(line)) {
          relativeImportsFound = true;
          console.error(`Error: Parent directory imports found in ${file}`);
          break;
        }
      }
    }
  });

  return relativeImportsFound;
}

/**
 * Run ESLint on TypeScript and TypeScript React files
 * @param {string[]} files - Array of file paths to lint
 * @returns {boolean} True if linting failed, false otherwise
 */
function isLintable(file) {
  // Only real TS/TSX sources. Anything else (assets, config files, files
  // excluded from ESLint in eslint.config.mjs such as generated icons and
  // husky hooks) emits a "File ignored / no matching configuration" warning
  // when linted explicitly, which would fail this --max-warnings=0 check.
  return (
    (file.endsWith('.ts') || file.endsWith('.tsx')) &&
    file.startsWith('src/') &&
    !file.includes('shared/icons')
  );
}

function runLinter(files) {
  let linterFailed = false;

  files.forEach((file) => {
    if (isLintable(file)) {
      try {
        execSync(`npx eslint ${file} --max-warnings=0`, { stdio: 'inherit' });
      } catch (_error) {
        linterFailed = true;
      }
    }
  });

  return linterFailed;
}

/**
 * Restage files after linting fixes
 * @param {string[]} files - Array of file paths to restage
 */
function restageFiles(files) {
  files.forEach((file) => {
    execSync(`git add ${file}`);
  });
}

/**
 * Attempt to fix linting errors automatically
 * @param {string[]} files - Array of file paths to fix
 * @returns {boolean} True if fixing failed, false otherwise
 */
function tryFixingLinterErrors(files) {
  let linterFailed = false;
  files.forEach((file) => {
    if (isLintable(file)) {
      try {
        execSync(`npx eslint ${file} --fix`, { stdio: 'inherit' });
      } catch (_error) {
        console.error(`Error: Unable to fix linting errors in ${file}`);
        linterFailed = true;
      } finally {
        restageFiles([file]);
      }
    }
  });

  return linterFailed;
}

function main() {
  console.log('Running pre-commit checks...');
  const stagedFiles = getStagedFiles();

  if (checkRelativeImports(stagedFiles)) {
    console.error('Please use absolute imports instead.');
    process.exit(1);
  }

  if (runLinter(stagedFiles)) {
    if (tryFixingLinterErrors(stagedFiles)) {
      console.error('Linting failed. Aborting commit.');
      process.exit(1);
    }
  }

  console.log('Pre-commit checks passed.');
  process.exit(0);
}

main();
