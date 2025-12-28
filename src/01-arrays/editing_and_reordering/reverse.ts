/**
 * reverse.ts
 * Array.prototype.reverse
 *
 * Mental model:
 * - Reverses the array IN PLACE (MUTATES)
 * - Returns the same array reference (after mutation)
 *
 * Signature:
 *   arr.reverse() => arr (same reference)
 *
 * Use when:
 * - you intentionally want to reverse a local array in-place
 *
 * Avoid when:
 * - you need immutability (frontend state). Prefer [...arr].reverse() or toReversed().
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic (mutates) */
section('Basic: reverse mutates');

const a = [1, 2, 3, 4];
log('before', a);

const ret = a.reverse();
log('after', a);
log('return value', ret);
log('same reference?', a === ret); // true

/** 2) Immutability-safe: copy then reverse */
section('Safe: copy then reverse');

const b = [10, 20, 30];
const reversedCopy = [...b].reverse();

log('b (unchanged)', b);
log('reversedCopy', reversedCopy);

/** 3) Modern non-mutate (if available): toReversed */
section('Modern non-mutate: toReversed (if available)');

const hasToReversed = typeof (b as any).toReversed === 'function';
log('toReversed available?', hasToReversed);

if (hasToReversed) {
  const out = (b as any).toReversed();
  log('b unchanged', b);
  log('out', out);
}

/** 4) Common algorithm pattern: reverse string via array */
section('Pattern: reverse a string');

const s = 'hello';
const reversedStr = s.split('').reverse().join('');
log('original', s);
log('reversed', reversedStr);

section('Done');
