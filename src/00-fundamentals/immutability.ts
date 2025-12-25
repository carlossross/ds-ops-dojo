/**
 * immutability.ts
 * Fundamentals: practical immutability (especially useful in frontend)
 *
 * Covers:
 * - mutation vs immutability
 * - shallow cloning (objects/arrays)
 * - immutable updates: add/remove/update
 * - nested updates (shallow copies at each level)
 * - pitfalls: shared references
 * - which Array methods mutate vs don't (quick mental map)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Mutation vs immutability */
section('Mutation vs immutability');

const original = { count: 0 };
const mutated = original; // same reference
mutated.count += 1;

log('original (changed)', original);
log('mutated', mutated);
log('same reference?', original === mutated);

/**
 * Why immutability matters (frontend & algorithms):
 * - predictable state changes
 * - easier debugging (time travel / diff)
 * - avoids accidental side effects
 */

/** 2) Shallow clone (object) */
section('Shallow clone: object spread');

const state1 = { count: 0, meta: { tag: 'A' } };
const state2 = { ...state1, count: 1 }; // new object, but nested shared

log('state1', state1);
log('state2', state2);
log('state1 === state2', state1 === state2);
log('meta shared?', state1.meta === state2.meta); // true (shallow)

/** 3) Immutable updates: arrays */
section('Immutable updates: arrays');

const arr1 = [1, 2, 3];

// Add (end)
const arrAddEnd = [...arr1, 4];

// Add (start)
const arrAddStart = [0, ...arr1];

// Remove by index (without mutating)
const removeAt = (arr: number[], idx: number) => [
  ...arr.slice(0, idx),
  ...arr.slice(idx + 1),
];

const arrRemoved = removeAt(arr1, 1); // remove "2"

// Update by index
const updateAt = (arr: number[], idx: number, value: number) =>
  arr.map((x, i) => (i === idx ? value : x));

const arrUpdated = updateAt(arr1, 2, 999);

log('arr1', arr1);
log('arrAddEnd', arrAddEnd);
log('arrAddStart', arrAddStart);
log('arrRemoved (remove idx=1)', arrRemoved);
log('arrUpdated (update idx=2)', arrUpdated);

/** 4) Immutable updates: objects */
section('Immutable updates: objects');

const obj1 = { a: 1, b: 2 };

// Add/update key
const obj2 = { ...obj1, b: 999, c: 3 };

// Remove key (destructuring rest)
const { b, ...objWithoutB } = obj1;

log('obj1', obj1);
log('obj2 (updated/added)', obj2);
log('objWithoutB (removed b)', objWithoutB);

/** 5) Nested immutable update: copy each level you touch */
section('Nested immutable update');

type AppState = {
  user: { id: string; profile: { name: string; city: string } };
  settings: { theme: 'light' | 'dark' };
};

const s1: AppState = {
  user: { id: '1', profile: { name: 'Ada', city: 'Monterrey' } },
  settings: { theme: 'light' },
};

// Update nested: user.profile.city
const s2: AppState = {
  ...s1,
  user: {
    ...s1.user,
    profile: {
      ...s1.user.profile,
      city: 'CDMX',
    },
  },
};

log('s1.user.profile.city', s1.user.profile.city);
log('s2.user.profile.city', s2.user.profile.city);
log('same root ref?', s1 === s2);
log('same user ref?', s1.user === s2.user);
log('same profile ref?', s1.user.profile === s2.user.profile);
log('settings ref unchanged?', s1.settings === s2.settings);

/**
 * Mental rule:
 * - Copy every object/array along the path you're changing.
 * - Keep untouched branches as the same reference (cheap & intentional).
 */

/** 6) Avoiding mutation when using Array methods */
section('Array methods: mutate vs non-mutate (quick)');

const base = [3, 1, 2];

const nonMutateSorted = [...base].sort((a, b) => a - b); // copy then mutate copy
log('base', base);
log('nonMutateSorted', nonMutateSorted);

// Mutating methods (danger in state):
// - sort, reverse, splice, push, pop, shift, unshift, fill, copyWithin
// Non-mutating methods (safe):
// - map, filter, reduce, slice, concat, flat, flatMap
log(
  'note',
  'sort/reverse/splice mutate; map/filter/reduce/slice/concat do not',
);

/** 7) Deep copy note (concept) */
section('Deep copy note');

/**
 * structuredClone is the modern deep clone for many built-in types.
 * It won't clone functions, and some environments may not support it.
 * We show it conditionally (so the script won't crash).
 */
const complex = { d: new Date(), nested: { x: 1 } };

const deep =
  typeof structuredClone === 'function' ? structuredClone(complex) : null;

log('structuredClone available?', typeof structuredClone === 'function');
if (deep) {
  log('deep.d instanceof Date', deep.d instanceof Date);
  log('nested ref shared?', complex.nested === deep.nested);
}

/** 8) In algorithms: sometimes mutation is fine (local variables) */
section('When mutation is fine');

/**
 * It's totally fine to mutate LOCAL data structures inside a function
 * if you don't leak them outside, e.g. building a result array.
 */
function buildSquares(n: number): number[] {
  const out: number[] = [];
  for (let i = 1; i <= n; i++) out.push(i * i);
  return out;
}

log('buildSquares(5)', buildSquares(5));

section('Done');
