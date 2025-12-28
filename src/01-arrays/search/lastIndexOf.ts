/**
 * lastIndexOf.ts
 * Array.prototype.lastIndexOf
 *
 * Mental model:
 * - Find the LAST index where value exists (exact match, ===)
 * - If not found => -1
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.lastIndexOf(valueToFind, fromIndex?) => number
 *
 * Use when:
 * - you need the last occurrence index
 *
 * Avoid when:
 * - you need a predicate (use findLastIndex if available, or manual scan)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic usage */
section('Basic usage');

const nums = [1, 2, 3, 2, 1];

log('nums.lastIndexOf(2)', nums.lastIndexOf(2)); // 3
log('nums.lastIndexOf(9)', nums.lastIndexOf(9)); // -1

/** 2) fromIndex parameter (search backwards starting at fromIndex) */
section('fromIndex parameter');

log('lastIndexOf(2, fromIndex=2)', nums.lastIndexOf(2, 2)); // 1 (search backwards from index 2)
log('lastIndexOf(2, fromIndex=0)', nums.lastIndexOf(2, 0)); // -1

// Negative fromIndex counts from the end (start searching from that resolved index)
log('lastIndexOf(2, fromIndex=-2)', nums.lastIndexOf(2, -2)); // from index length-2 => 3

/** 3) NaN gotcha */
section('NaN gotcha');

const weird = [1, NaN, 3, NaN];
log('weird.lastIndexOf(NaN)', weird.lastIndexOf(NaN)); // -1
log('weird.includes(NaN)', weird.includes(NaN)); // true

/** 4) Use case: replace last occurrence (immutable) */
section('Use case: replace last occurrence (immutable)');

const valueToReplace = 2;
const idx = nums.lastIndexOf(valueToReplace);

const replaced =
  idx === -1 ? nums : [...nums.slice(0, idx), 999, ...nums.slice(idx + 1)];

log('idx', idx);
log('replaced', replaced);
log('original unchanged', nums);

section('Done');
