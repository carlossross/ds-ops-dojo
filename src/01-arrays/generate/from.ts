/**
 * array-from.ts
 * Array.from
 *
 * Mental model:
 * - Create arrays from:
 *   - array-like objects (e.g., arguments, NodeList)
 *   - iterables (Set, Map keys, string)
 * - Optionally map while creating (mapFn)
 *
 * Signature:
 *   Array.from(arrayLikeOrIterable, mapFn?, thisArg?) => newArray
 *
 * Use when:
 * - you need to generate arrays of a certain length
 * - you need to convert iterables to arrays
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) From string (iterable) */
section('From string');

const chars = Array.from('hello');
log('chars', chars);

/** 2) From Set (iterable) */
section('From Set');

const s = new Set([1, 2, 2, 3]);
const arr = Array.from(s);
log('set', s);
log('Array.from(set)', arr);

/** 3) Generate array of length N */
section('Generate length N');

const N = 5;
const zeros = Array.from({ length: N }, () => 0);
log('zeros', zeros);

/** 4) Generate range [0..N-1] */
section('Generate range');

const range = Array.from({ length: N }, (_, i) => i);
log('range 0..N-1', range);

/** 5) Generate range [1..N] */
section('Generate range 1..N');

const range1 = Array.from({ length: N }, (_, i) => i + 1);
log('range 1..N', range1);

section('Done');
