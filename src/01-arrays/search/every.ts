/**
 * every.ts
 * Array.prototype.every
 *
 * Mental model:
 * - Returns true if ALL elements match the predicate
 * - Returns false if ANY element fails
 * - Short-circuits (stops early on first failure)
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.every((value, index, array) => boolean) => boolean
 *
 * Use when:
 * - you need "all?" checks: are all items valid / satisfy a rule?
 *
 * Avoid when:
 * - you need the failing item (use find or findIndex)
 * - you need to transform (map) or select some (filter)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic: are all numbers positive? */
section('Basic: are all numbers positive?');

const nums1 = [1, 2, 3];
const nums2 = [1, -2, 3];

log(
  'nums1 all > 0',
  nums1.every((n) => n > 0),
);
log(
  'nums2 all > 0',
  nums2.every((n) => n > 0),
);

/** 2) Objects: are all users active? */
section('Objects: are all users active?');

type User = { id: string; active: boolean };

const usersA: User[] = [
  { id: 'u1', active: true },
  { id: 'u2', active: true },
];

const usersB: User[] = [
  { id: 'u1', active: true },
  { id: 'u2', active: false },
];

log(
  'usersA all active',
  usersA.every((u) => u.active),
);
log(
  'usersB all active',
  usersB.every((u) => u.active),
);

/** 3) Validation pattern: all strings are non-empty after trim */
section('Validation: all strings non-empty after trim');

const inputs1 = ['a', '  b  ', 'c'];
const inputs2 = ['a', '   ', 'c'];

const allNonEmpty1 = inputs1.every((s) => s.trim().length > 0);
const allNonEmpty2 = inputs2.every((s) => s.trim().length > 0);

log('inputs1 allNonEmpty', allNonEmpty1);
log('inputs2 allNonEmpty', allNonEmpty2);

/** 4) Short-circuit demo (stops early) */
section('Short-circuit behavior (stops early)');

let checks = 0;
const big = [2, 4, 6, 8, 9, 10, 12];

const allEven = big.every((n) => {
  checks++;
  return n % 2 === 0; // fails at 9; stops there
});

log('allEven', allEven);
log('checks executed', checks);

/** 5) Empty array behavior (important!) */
section('Empty array behavior (vacuous truth)');

const empty: number[] = [];
log(
  'empty.every(...) -> true',
  empty.every(() => false),
);

/**
 * Why?
 * - "All elements satisfy condition" is true if there are no elements.
 * Practical implication:
 * - When validating, you might want: arr.length > 0 && arr.every(...)
 */
const validateNonEmptyAllPositive =
  empty.length > 0 && empty.every((n) => n > 0);

log('non-empty + all positive (recommended)', validateNonEmptyAllPositive);

section('Done');
