/**
 * comparisons.ts
 * Fundamentals: comparisons in JS/TS
 *
 * Covers:
 * - strict vs loose equality (=== vs ==)
 * - relational operators (<, >, <=, >=)
 * - comparing strings (localeCompare)
 * - comparing objects/arrays (reference equality)
 * - writing sort comparators (numbers, strings, multi-field)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Strict equality (===) vs loose equality (==) */
section('Equality: === vs ==');

log('1 === 1', 1 === 1);
log('1 == 1', 1 == 1);

// Loose equality coerces types (generally avoid in modern code)
log('0 == false', 0 == false);
log('0 === false', 0 === false);

log("'1' == 1", '1' == 1);
log("'1' === 1", '1' === 1);

log('null == undefined', null == undefined);
log('null === undefined', null === undefined);

/**
 * Rule of thumb:
 * - Use === / !== always.
 * - Know == only to understand legacy code / interview pitfalls.
 */

/** 2) Relational comparisons */
section('Relational: < > <= >=');

log('3 < 5', 3 < 5);
log('5 <= 5', 5 <= 5);
log('10 > 2', 10 > 2);

// Note: relational comparisons may coerce if types differ.
log("'10' < 2  (coercion happens)", ('10' as any) < 2);
log("Number('10') < 2", Number('10') < 2);

/** 3) NaN comparison gotcha */
section('NaN gotcha');

const bad = Number('not-a-number');
log('bad value', bad);
log('bad === NaN', bad === NaN); // always false
log('Number.isNaN(bad)', Number.isNaN(bad)); // correct check

/** 4) Strings comparison */
section('Strings: lexicographic vs localeCompare');

log("'a' < 'b'", 'a' < 'b');
log("'Z' < 'a'", 'Z' < 'a'); // uppercase vs lowercase affects code points

// Prefer localeCompare for sorting user-visible strings
log("'a'.localeCompare('b')", 'a'.localeCompare('b'));
log("'b'.localeCompare('a')", 'b'.localeCompare('a'));
log("'a'.localeCompare('a')", 'a'.localeCompare('a'));

/** 5) Reference equality: objects and arrays */
section('Reference equality: objects/arrays');

const obj1 = { x: 1 };
const obj2 = { x: 1 };
const obj3 = obj1;

log('obj1 === obj2 (same shape, different ref)', obj1 === obj2);
log('obj1 === obj3 (same ref)', obj1 === obj3);

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = arr1;

log('arr1 === arr2', arr1 === arr2);
log('arr1 === arr3', arr1 === arr3);

/**
 * If you need "value equality" for arrays/objects, you must implement comparison
 * (e.g., shallow compare / deep compare), or compare normalized keys.
 */

/** 6) Comparators for sort */
section('Sort comparators: numbers');

const nums = [10, 2, 30, 4];

// Default sort is string-based (danger for numbers)
log('default sort (string-based)', [...nums].sort());

// Correct numeric sort: ascending
log(
  'numeric asc',
  [...nums].sort((a, b) => a - b),
);

// Descending
log(
  'numeric desc',
  [...nums].sort((a, b) => b - a),
);

section('Sort comparators: strings (localeCompare)');

const names = ['Zoë', 'Álvaro', 'ana', 'Bob', 'ábaco'];
log('default sort', [...names].sort());
log(
  'localeCompare sort',
  [...names].sort((a, b) => a.localeCompare(b)),
);

section('Sort comparators: multi-field');

type User = { last: string; first: string; age: number };

const users: User[] = [
  { last: 'Zeta', first: 'Ana', age: 30 },
  { last: 'Zeta', first: 'Bob', age: 25 },
  { last: 'Alpha', first: 'Cara', age: 40 },
];

// Sort by last name, then first name
const byLastThenFirst = [...users].sort(
  (a, b) => a.last.localeCompare(b.last) || a.first.localeCompare(b.first),
);

log('byLastThenFirst', byLastThenFirst);

// Sort by last name, then age descending
const byLastThenAgeDesc = [...users].sort(
  (a, b) => a.last.localeCompare(b.last) || b.age - a.age,
);

log('byLastThenAgeDesc', byLastThenAgeDesc);

section('Done');
