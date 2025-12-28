/**
 * flatMap.ts
 * Array.prototype.flatMap
 *
 * Mental model:
 * - Like map, but then flattens ONE level (depth = 1)
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.flatMap((value, index, array) => newValueOrArray) => newArray
 *
 * Use when:
 * - 1 input element may produce 0..N output elements
 * - you want "map + flat(1)" in one step
 * - you want "filter + map" as one pass (return [] to drop items)
 *
 * Avoid when:
 * - you need deep flattening (use flat(depth) or other approach)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic: expand each element to two elements */
section('Expand: 1 item -> many items');

const nums = [1, 2, 3];
const doubledPairs = nums.flatMap((n) => [n, n * 2]);

log('nums', nums);
log('doubledPairs', doubledPairs);

/** 2) Equivalent to map + flat(1) */
section('Equivalent: map + flat(1)');

const mappedThenFlat = nums.map((n) => [n, n * 2]).flat(1);
log('map(...).flat(1)', mappedThenFlat);
log(
  'same as flatMap?',
  JSON.stringify(mappedThenFlat) === JSON.stringify(doubledPairs),
);

/** 3) Filter + map in one pass (return [] to drop items) */
section('Filter + map in one pass');

const raw = ['10', ' 20 ', 'x', '', '30'];

const parsedValid = raw.flatMap((s) => {
  const t = s.trim();
  if (t.length === 0) return []; // drop empty
  const n = Number(t);
  if (Number.isNaN(n)) return []; // drop invalid
  return [n]; // keep valid as single-item array
});

log('raw', raw);
log('parsedValid', parsedValid);

/**
 * Compare with: raw.map(...).filter(...)
 * flatMap can be cleaner when you want 0-or-1 outputs per input.
 */

/** 4) Tokenization: string -> words (then flatten) */
section('Tokenization: split each line into words');

const lines = ['hello world', '  split  me ', '', 'one'];
const words = lines.flatMap((line) =>
  line.trim().length ? line.trim().split(/\s+/) : [],
);

log('lines', lines);
log('words', words);

/** 5) Flattening is only 1-level */
section('Only flattens 1 level');

const deep = [1, [2, [3]]] as unknown[];
const flatOnce = deep.flatMap((x) => x); // returns [1, 2, [3]] effectively (1 level)
log('deep', deep);
log('flatOnce (1 level)', flatOnce);

// For deeper flatten:
const flatDeep = (deep as any).flat?.(Infinity);
log(
  'flat(Infinity) (if available)',
  flatDeep ?? 'flat(Infinity) not available',
);

/** 6) Common pitfall: returning non-array sometimes */
section('Pitfall: be consistent with returns');

const mixed = nums.flatMap((n) => (n % 2 === 0 ? [n] : []));
log('keep only evens via flatMap', mixed);

/**
 * If you return:
 * - [] to drop
 * - [x] to keep
 * this stays consistent and readable.
 */

section('Done');
