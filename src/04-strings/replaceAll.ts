/**
 * replaceAll.ts (String.prototype.replaceAll)
 *
 * Mental model:
 * - Returns a NEW string with ALL occurrences replaced
 * - Strings are immutable
 *
 * Signature:
 *   str.replaceAll(searchValue, replaceValue) => string
 *
 * searchValue:
 * - string (replaces all occurrences)
 * - RegExp MUST be global (/g) or it throws
 *
 * Use when:
 * - you want to replace all literal occurrences (no regex needed)
 * - you want readability vs replace(/pattern/g)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic: replaceAll with string');

const s = 'foo bar foo foo';
log('original', s);
log("replaceAll('foo','baz')", s.replaceAll('foo', 'baz')); // "baz bar baz baz"
log('original unchanged', s);

section('Compare: replace vs replaceAll');

log("replace('foo','baz')", s.replace('foo', 'baz')); // only first
log("replaceAll('foo','baz')", s.replaceAll('foo', 'baz')); // all

section('Common use: normalize separators');

const path = 'users//carlos///notes.txt';
const normalized = path.replaceAll('//', '/'); // might need repeated normalization if many
log('path', path);
log('normalized (single pass)', normalized);

// Better normalization using regex:
const normalizedRegex = path.replace(/\/+/g, '/');
log('normalizedRegex (collapse many)', normalizedRegex);

section('RegExp rules: must be global');

const text = 'a-a-a';

// ✅ global regex works
log("replaceAll(/a/g,'x')", text.replaceAll(/a/g, 'x'));

// ❌ non-global regex would throw at runtime; shown safely:
try {
  // @ts-expect-error: demo runtime behavior
  const bad = (text as any).replaceAll(/a/, 'x'); // no /g
  log('bad', bad);
} catch (err) {
  log("replaceAll(/a/,'x') throws", (err as Error).message);
}

section('ReplaceValue function works too');

const doubled = '1-2-3'.replaceAll(/\d/g, (m) => String(Number(m) * 2));
log('doubled digits', doubled); // "2-4-6"

section('Done');
