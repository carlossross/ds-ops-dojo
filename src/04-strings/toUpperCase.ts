/**
 * toUpperCase.ts (String.prototype.toUpperCase)
 *
 * Mental model:
 * - Returns a NEW string in upper case
 * - Strings are immutable
 *
 * Signature:
 *   str.toUpperCase() => string
 *
 * Use when:
 * - normalization for comparison (less common than lower)
 * - generating labels/headers/codes
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic');

const s = 'Hello world';
log('original', s);
log('toUpperCase()', s.toUpperCase());

section('Normalize codes / tags');

const code = 'ab-12';
log('code', code);
log('code.toUpperCase()', code.toUpperCase());

section('Case-insensitive equality via upper');

const a = 'Admin';
const b = 'ADMIN';
log('equal ignoring case?', a.toUpperCase() === b.toUpperCase());

section('Done');
