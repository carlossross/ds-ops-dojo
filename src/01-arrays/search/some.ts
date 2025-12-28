/**
 * some.ts
 * Array.prototype.some
 *
 * Mental model:
 * - Returns true if AT LEAST ONE element matches the predicate
 * - Returns false if NONE match
 * - Short-circuits (stops early when it finds a match)
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.some((value, index, array) => boolean) => boolean
 *
 * Use when:
 * - you need "any?" checks: is there at least one match?
 *
 * Avoid when:
 * - you need the element itself (use find)
 * - you need all matches (use filter)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic: any even number? */
section('Basic: any even number?');

const nums = [1, 3, 5, 8, 9];
const hasEven = nums.some((n) => n % 2 === 0);

log('nums', nums);
log('hasEven', hasEven);

/** 2) Any active user? (objects) */
section('Objects: any active user?');

type User = { id: string; name: string; active: boolean };

const users: User[] = [
  { id: 'u1', name: 'Ada', active: false },
  { id: 'u2', name: 'Bob', active: false },
  { id: 'u3', name: 'Cara', active: true },
];

const anyActive = users.some((u) => u.active);
log('anyActive', anyActive);

/** 3) Search by substring (common in UI filtering) */
section('Search by substring: any name includes query?');

const q = 'bo';
const anyMatch = users.some((u) => u.name.toLowerCase().includes(q));
log('query', q);
log('anyMatch', anyMatch);

/** 4) Short-circuit demo (stops early) */
section('Short-circuit behavior (stops early)');

let checks = 0;
const found = users.some((u) => {
  checks++;
  return u.active; // true at u3, so iteration stops there
});

log('found', found);
log('checks executed', checks);

/**
 * Why it matters:
 * - some() can be faster than filter().length > 0
 * - because filter() scans all and builds a new array
 */

/** 5) Common alternative: includes for exact value match */
section('Exact match? (some vs includes)');

const tags = ['js', 'ts', 'angular'];
const hasTS_some = tags.some((t) => t === 'ts');
const hasTS_includes = tags.includes('ts');

log('hasTS_some', hasTS_some);
log('hasTS_includes', hasTS_includes);

/** 6) Empty array behavior */
section('Empty array behavior');

const empty: number[] = [];
log(
  'empty.some(...) -> false',
  empty.some(() => true),
);

section('Done');
