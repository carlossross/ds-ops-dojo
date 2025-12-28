/**
 * sort.ts
 * Array.prototype.sort
 *
 * Mental model:
 * - Sorts the array IN PLACE (MUTATES)
 * - Default sort compares as strings (lexicographic) -> dangerous for numbers
 *
 * Signature:
 *   arr.sort(compareFn?) => arr (same reference)
 *
 * compareFn:
 * - returns < 0  => a comes before b
 * - returns 0    => keep order (not guaranteed stable historically; modern engines mostly stable)
 * - returns > 0  => a comes after b
 *
 * Use when:
 * - you need ordering
 *
 * Avoid when:
 * - you need immutability: prefer [...arr].sort(...) or toSorted()
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Default sort is string-based */
section('Default sort (string-based)');

const nums = [10, 2, 30, 4];
log('before', nums);

const defaultSorted = [...nums].sort();
log('defaultSorted', defaultSorted); // ["10","2","30","4"] style ordering

/** 2) Numeric sort (ascending/descending) */
section('Numeric sort (correct)');

const asc = [...nums].sort((a, b) => a - b);
const desc = [...nums].sort((a, b) => b - a);

log('asc', asc);
log('desc', desc);

/** 3) Mutation demo */
section('Mutation demo');

const a = [3, 1, 2];
log('before a', a);

const ret = a.sort((x, y) => x - y);
log('after a', a);
log('ret', ret);
log('same reference?', a === ret); // true

/** 4) String sort: prefer localeCompare */
section('String sort: localeCompare');

const names = ['Zoë', 'Álvaro', 'ana', 'Bob', 'ábaco'];
const byLocale = [...names].sort((x, y) => x.localeCompare(y));

log('names', names);
log('byLocale', byLocale);

/** 5) Sort objects by field(s) */
section('Sort objects by field(s)');

type User = { id: string; name: string; age: number };

const users: User[] = [
  { id: 'u1', name: 'Zeta', age: 30 },
  { id: 'u2', name: 'Alpha', age: 40 },
  { id: 'u3', name: 'Alpha', age: 25 },
];

// name asc, then age desc
const byNameThenAgeDesc = [...users].sort(
  (a, b) => a.name.localeCompare(b.name) || b.age - a.age,
);

log('byNameThenAgeDesc', byNameThenAgeDesc);

/** 6) Modern non-mutate (if available): toSorted */
section('Modern non-mutate: toSorted (if available)');

const hasToSorted = typeof (nums as any).toSorted === 'function';
log('toSorted available?', hasToSorted);

if (hasToSorted) {
  const out = (nums as any).toSorted((a: number, b: number) => a - b);
  log('nums unchanged', nums);
  log('out', out);
}

/** 7) Practical pattern: keep original unchanged */
section('Safe pattern: copy then sort');

const original = [5, 1, 5, 2];
const sortedCopy = [...original].sort((a, b) => a - b);

log('original', original);
log('sortedCopy', sortedCopy);

section('Done');
