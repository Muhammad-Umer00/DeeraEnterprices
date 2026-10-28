/**
 * Verifies the project follows the mandated stack: React + JavaScript (JSX)
 * with Vite, and an optional Node.js/Express backend in JavaScript.
 * Fails if TypeScript files/config or disallowed frameworks are present.
 *
 * Usage: npm run lint:stack
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['node_modules', 'dist', '.git']);
const BAD_EXT = /\.(ts|tsx|mts|cts|vue|svelte|astro|py|php|java|cs)$/i;
const BAD_FILES = /^(tsconfig.*\.json|next\.config\.[cm]?js|nuxt\.config\..*|angular\.json|svelte\.config\..*|astro\.config\..*)$/i;
const BAD_DEPS = [
  'typescript', 'ts-node', 'tsx', 'next', 'nuxt', 'vue', '@angular/core', 'svelte', 'astro', 'preact', 'solid-js',
];

const problems = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (BAD_EXT.test(entry.name) || BAD_FILES.test(entry.name)) problems.push(`Disallowed file: ${path.relative(root, full)}`);
  }
}
walk(root);

for (const pkgPath of ['package.json', 'server/package.json']) {
  const full = path.join(root, pkgPath);
  if (!fs.existsSync(full)) continue;
  const pkg = JSON.parse(fs.readFileSync(full, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const name of Object.keys(deps)) {
    if (BAD_DEPS.includes(name) || name.startsWith('@types/')) problems.push(`Disallowed dependency in ${pkgPath}: ${name}`);
  }
}

if (problems.length) {
  console.error('Stack check FAILED:\n  ' + problems.join('\n  '));
  process.exit(1);
}
console.log('Stack check passed: React + JavaScript (Vite) frontend, Node.js/Express (JavaScript) backend. No TypeScript or other frameworks found.');
