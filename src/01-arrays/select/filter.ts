/**
 * filter.ts
 * Array.prototype.filter
 *
 * Mental model:
 * - Select some elements -> new array (length <= original)
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.filter((value, index, array) => boolean) => newArray
 *
 * Use when:
 * - you want to keep only items that match a condition (predicate)
 *
 * Avoid when:
 * - you need to transform every element (use map)
 * - you need a single result (use reduce)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic: keep only even numbers */
section('Basic: keep even numbers');

const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter((n) => n % 2 === 0);

log('nums', nums);
log('evens', evens);

/** 2) Filter objects by condition */
section('Filter objects: by property');

type User = { id: string; name: string; active: boolean };

const users: User[] = [
  { id: 'u1', name: 'Ada', active: true },
  { id: 'u2', name: 'Bob', active: false },
  { id: 'u3', name: 'Cara', active: true },
];

const activeUsers = users.filter((u) => u.active);
log('activeUsers', activeUsers);

/** 3) Filter by search (string includes) */
section('Filter by search query');

const q = 'a';
const matches = users.filter((u) => u.name.toLowerCase().includes(q));
log('matches', matches);

/** 4) Filter truthy values (common cleanup) */
section('Filter truthy values');

const messy: Array<string | null | undefined | ''> = [
  'hi',
  '',
  null,
  'ok',
  undefined,
  '',
];
const truthy = messy.filter(Boolean);
log('messy', messy);
log('truthy (Boolean predicate)', truthy);

/**
 * Note (TS):
 * - `filter(Boolean)` is common but TS may not always narrow perfectly depending on types.
 * - If you need strong narrowing, use a custom type guard.
 */

/** 5) Type guard filtering (TS narrowing) */
section('Filter with type guard (TS narrowing)');

type MaybeNumber = number | null | undefined;

const maybeNums: MaybeNumber[] = [1, null, 2, undefined, 3];

function isNumber(x: MaybeNumber): x is number {
  return typeof x === 'number';
}

const onlyNumbers = maybeNums.filter(isNumber);
log('onlyNumbers', onlyNumbers);
// onlyNumbers is number[] thanks to the type guard

/** 6) Filter using index (remove duplicates naive example) */
section('Filter using index (index-based condition)');

const dupes = ['a', 'b', 'a', 'c', 'b'];
const uniqueNaive = dupes.filter((v, i, arr) => arr.indexOf(v) === i);

log('dupes', dupes);
log('uniqueNaive (O(n^2))', uniqueNaive);

/**
 * For large data, prefer Set-based patterns (later modules),
 * but this teaches you filter + index usage.
 */

/** 7) Avoid filter for side effects */
section('Avoid filter for side effects');

const side: number[] = [];
const filtered = nums.filter((n) => {
  // ❌ side effect inside filter: not recommended
  if (n % 2 === 0) side.push(n);
  return n > 3;
});

log('side (side effects)', side);
log('filtered (predicate result)', filtered);

section('Done');
