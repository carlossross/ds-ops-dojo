/**
 * reduce.ts
 * Array.prototype.reduce
 *
 * Mental model:
 * - Turn an array into a SINGLE result (any type)
 * - You carry an "accumulator" that you update for each element
 * - Does NOT mutate the original array (but you can mutate the accumulator if you choose)
 *
 * Signature:
 *   arr.reduce((acc, value, index, array) => nextAcc, initialAcc?) => finalAcc
 *
 * Golden rules:
 * 1) Always know what acc is (type + shape).
 * 2) Prefer providing initialAcc (avoids edge cases on empty arrays).
 * 3) Accumulator can be: number, string, object, Map, Set, array, etc.
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Sum numbers (classic accumulate) */
section('Sum numbers');

const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, n) => acc + n, 0);
log('nums', nums);
log('sum', sum);

/** 2) Product / concatenation */
section('Product + string join (concept)');

const product = nums.reduce((acc, n) => acc * n, 1);
log('product', product);

const words = ['hello', 'reduce', 'world'];
const sentence = words.reduce((acc, w) => (acc.length ? `${acc} ${w}` : w), '');
log('sentence', sentence);

/** 3) Max / Min (with initial) */
section('Max value');

const max = nums.reduce(
  (acc, n) => (n > acc ? n : acc),
  Number.NEGATIVE_INFINITY,
);
log('max', max);

/** 4) CountBy (frequency map as object) */
section('countBy: frequency');

const letters = ['a', 'b', 'a', 'c', 'b', 'a'];

type CountMap = Record<string, number>;

const counts = letters.reduce<CountMap>((acc, ch) => {
  acc[ch] = (acc[ch] ?? 0) + 1;
  return acc;
}, {});

log('letters', letters);
log('counts', counts);

/** 5) GroupBy (object -> arrays) */
section('groupBy: bucket items');

type User = { id: string; role: 'admin' | 'user' };

const users: User[] = [
  { id: 'u1', role: 'admin' },
  { id: 'u2', role: 'user' },
  { id: 'u3', role: 'user' },
];

type Groups = Record<User['role'], User[]>;

const grouped = users.reduce<Groups>(
  (acc, u) => {
    acc[u.role].push(u);
    return acc;
  },
  { admin: [], user: [] },
);

log('grouped', grouped);

/** 6) IndexBy (object dictionary by id) */
section('indexBy: lookup table');

type ById = Record<string, User>;

const byId = users.reduce<ById>((acc, u) => {
  acc[u.id] = u;
  return acc;
}, {});

log('byId', byId);
log("byId['u2']", byId['u2']);

/**
 * This is extremely common in apps:
 * - transform list from API into dictionary for O(1) access by id.
 */

/** 7) Flatten 1-level (accumulator is array) */
section('flatten 1-level');

const nested = [[1, 2], [3], [4, 5]];
const flat1 = nested.reduce<number[]>((acc, arr) => {
  acc.push(...arr);
  return acc;
}, []);

log('nested', nested);
log('flat1', flat1);

/**
 * Note: for real code, prefer arr.flat(1) when available:
 *   nested.flat(1)
 * But this teaches the reduce mental model.
 */

/** 8) Unique (accumulator as Set OR array) */
section('unique');

const withDupes = [1, 2, 2, 3, 1, 4];

// Option A: accumulator = Set (fast membership)
const uniqueSet = withDupes.reduce<Set<number>>((acc, n) => {
  acc.add(n);
  return acc;
}, new Set<number>());

log('uniqueSet -> array', [...uniqueSet]);

// Option B: accumulator = array (shows membership check pattern, slower)
const uniqueArray = withDupes.reduce<number[]>((acc, n) => {
  if (!acc.includes(n)) acc.push(n);
  return acc;
}, []);

log('uniqueArray', uniqueArray);

/** 9) Reduce vs map/filter mental trigger */
section('Triggers');

log('trigger', 'map: 1-to-1 transform (same length)');
log('trigger', 'filter: select some (length shrinks)');
log('trigger', 'reduce: produce one result (any type)');

/** 10) Edge cases: empty arrays */
section('Empty array edge case');

const empty: number[] = [];

const sumEmptySafe = empty.reduce((acc, n) => acc + n, 0);
log('sumEmptySafe', sumEmptySafe);

// Avoid reduce without initial value on potentially empty arrays.
// empty.reduce((acc, n) => acc + n) would throw.

section('Done');
