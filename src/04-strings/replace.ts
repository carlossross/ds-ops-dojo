/**
 * replace.ts (String.prototype.replace)
 *
 * Mental model:
 * - Returns a NEW string with a replacement applied
 * - Strings are immutable (does not mutate original)
 *
 * Signature:
 *   str.replace(searchValue, replaceValue) => string
 *
 * searchValue can be:
 * - string (replaces FIRST occurrence only)
 * - RegExp (behavior depends on flags: without /g replaces first, with /g replaces all)
 *
 * replaceValue can be:
 * - string
 * - function (match, ...groups, offset, original) => string
 *
 * Use when:
 * - you need to replace one occurrence, or use regex for pattern-based replacement
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic: string search replaces FIRST occurrence only');

const s = 'foo bar foo';
log('original', s);
log("replace('foo','baz')", s.replace('foo', 'baz')); // "baz bar foo"
log('original unchanged', s);

section('Regex replace: first vs global');

const r1 = s.replace(/foo/, 'baz'); // first only
const r2 = s.replace(/foo/g, 'baz'); // all
log("replace(/foo/,'baz')", r1);
log("replace(/foo/g,'baz')", r2);

section('Case-insensitive replace');

const t = 'Hello hello HELLO';
log("replace(/hello/i,'hi')", t.replace(/hello/i, 'hi')); // first, case-insensitive
log("replace(/hello/gi,'hi')", t.replace(/hello/gi, 'hi')); // all, case-insensitive

section('Replace using capture groups');

const date = '2025-12-27';
const swapped = date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1');
log('date', date);
log('swapped (DD/MM/YYYY)', swapped);

section('Replace using a function (power move)');

const input = 'price: 15 USD, discount: 5 USD';

// Replace each number with number*2 (demo)
const doubled = input.replace(/\d+/g, (match) => String(Number(match) * 2));
log('input', input);
log('doubled numbers', doubled);

section('Common pitfall: replace does not mutate');

let u = '  hello  ';
u.replace(' ', ''); // does nothing to u because return is ignored
log('u after ignored replace', u);

u = u.replace(/\s+/g, ' ').trim();
log('u after assign', u);

section('Trigger');

log('trigger', 'replace: 1 replacement (string) or pattern replace (regex)');
log('trigger', 'replaceAll: all occurrences (string) without regex');

section('Done');
