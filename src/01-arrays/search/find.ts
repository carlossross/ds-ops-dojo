/**
 * find.ts
 * Array.prototype.find
 *
 * Mental model:
 * - Return the FIRST element that matches predicate
 * - If none found => undefined
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.find((value, index, array) => boolean) => value | undefined
 *
 * Use when:
 * - you need the first matching element (object, number, etc.)
 *
 * Avoid when:
 * - you need ALL matches (use filter)
 * - you need index (use findIndex)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Find a number */
section('Find a number');

const nums = [5, 8, 12, 3, 9];
const firstGt10 = nums.find((n) => n > 10);

log('nums', nums);
log('first > 10', firstGt10);

/** 2) Find an object by id */
section('Find object by id');

type User = { id: string; name: string; active: boolean };

const users: User[] = [
  { id: 'u1', name: 'Ada', active: true },
  { id: 'u2', name: 'Bob', active: false },
  { id: 'u3', name: 'Cara', active: true },
];

const targetId = 'u2';
const found = users.find((u) => u.id === targetId);

log('targetId', targetId);
log('found', found);

/** 3) Handle undefined safely */
section('Handle not found (undefined)');

const missing = users.find((u) => u.id === 'u999');
log('missing', missing);

const label = missing?.name ?? 'Unknown user';
log('label (safe)', label);

/** 4) Common pitfall: find is by reference for objects if you compare objects */
section('Pitfall: reference equality with objects');

const needle = { id: 'u1', name: 'Ada', active: true };
const wrong = users.find((u) => u === needle); // always undefined (different ref)
const right = users.find((u) => u.id === needle.id);

log('wrong (u === needle)', wrong);
log('right (u.id match)', right);

section('Done');
