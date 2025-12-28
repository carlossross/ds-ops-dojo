/**
 * indexOf.ts
 * Array.prototype.indexOf
 *
 * Mental model:
 * - Find the FIRST index where value exists (exact match, ===)
 * - If not found => -1
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.indexOf(valueToFind, fromIndex?) => number
 *
 * Use when:
 * - you need the index of a primitive value (or a reference)
 *
 * Avoid when:
 * - you need a predicate (use findIndex)
 * - you only need true/false (use includes)
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

log('nums.indexOf(2)', nums.indexOf(2)); // 1
log('nums.indexOf(9)', nums.indexOf(9)); // -1

/** 2) fromIndex parameter */
section('fromIndex parameter');

log('indexOf(2, fromIndex=2)', nums.indexOf(2, 2)); // 3
log('indexOf(2, fromIndex=4)', nums.indexOf(2, 4)); // -1

// Negative fromIndex counts from the end (converted to start index)
log('indexOf(2, fromIndex=-3)', nums.indexOf(2, -3)); // starts at length-3 => index 2

/** 3) NaN gotcha */
section('NaN gotcha');

const weird = [1, NaN, 3];

log('weird.indexOf(NaN)', weird.indexOf(NaN)); // -1 (uses ===)
log('weird.includes(NaN)', weird.includes(NaN)); // true (SameValueZero)

/** 4) Objects: reference equality */
section('Objects: reference equality');

const a = { id: 1 };
const b = { id: 1 };

const arr = [a];
log('arr.indexOf(a)', arr.indexOf(a)); // 0
log('arr.indexOf(b)', arr.indexOf(b)); // -1 (different ref)

/** 5) Use case: remove first occurrence (immutable) */
section('Use case: remove first occurrence (immutable)');

const removeValue = 2;
const idx = nums.indexOf(removeValue);

const withoutFirst =
  idx === -1 ? nums : [...nums.slice(0, idx), ...nums.slice(idx + 1)];

log('idx', idx);
log('withoutFirst', withoutFirst);
log('original unchanged', nums);

section('Done');
