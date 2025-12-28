/**
 * slice.ts
 * Array.prototype.slice
 *
 * Mental model:
 * - Returns a SHALLOW COPY of a portion of an array
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.slice(start?, end?) => newArray
 *
 * Notes:
 * - start is inclusive
 * - end is exclusive
 * - negative indexes count from the end
 *
 * Use when:
 * - you need copy / subarray
 * - you need immutable remove/insert patterns (combined with concat/spread)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Copy whole array (shallow) */
section('Copy whole array (shallow)');

const nums = [1, 2, 3, 4, 5];
const copy = nums.slice();

log('nums', nums);
log('copy', copy);
log('same reference?', nums === copy); // false

/** 2) Basic slicing: start/end */
section('Basic slicing: start/end');

log('slice(0, 2)', nums.slice(0, 2)); // [1,2]
log('slice(2)', nums.slice(2)); // [3,4,5]
log('slice(1, 4)', nums.slice(1, 4)); // [2,3,4]

/** 3) end is exclusive */
section('end is exclusive');

log('slice(0, nums.length)', nums.slice(0, nums.length)); // full copy

/** 4) Negative indexes */
section('Negative indexes');

log('slice(-2)', nums.slice(-2)); // last 2 => [4,5]
log('slice(-3, -1)', nums.slice(-3, -1)); // [3,4]

/** 5) Common algorithm patterns */
section('Pattern: take first N / last N');

const N = 3;
log('take first N', nums.slice(0, N));
log('take last N', nums.slice(-N));

/** 6) Immutable remove by index (slice + spread) */
section('Immutable remove by index');

function removeAt<T>(arr: T[], idx: number): T[] {
  if (idx < 0 || idx >= arr.length) return arr;
  return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
}

log('removeAt(nums, 2)', removeAt(nums, 2)); // remove value 3
log('original unchanged', nums);

/** 7) Immutable replace at index (slice + spread) */
section('Immutable replace at index');

function replaceAt<T>(arr: T[], idx: number, value: T): T[] {
  if (idx < 0 || idx >= arr.length) return arr;
  return [...arr.slice(0, idx), value, ...arr.slice(idx + 1)];
}

log('replaceAt(nums, 1, 999)', replaceAt(nums, 1, 999));
log('original unchanged', nums);

/** 8) SHALLOW copy reminder (nested references are shared) */
section('Shallow copy reminder');

const nested = [{ x: 1 }, { x: 2 }];
const nestedCopy = nested.slice();

log('same array ref?', nested === nestedCopy); // false
log('same element ref?', nested[0] === nestedCopy[0]); // true (shallow)

nestedCopy[0]!.x = 999;
log('nested after modifying copy element', nested);

section('Done');
