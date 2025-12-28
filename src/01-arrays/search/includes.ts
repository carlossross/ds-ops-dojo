/**
 * includes.ts
 * Array.prototype.includes
 *
 * Mental model:
 * - Exact membership check: "is this value present?"
 * - Returns boolean
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.includes(valueToFind, fromIndex?) => boolean
 *
 * Notes:
 * - Uses SameValueZero comparison:
 *   - like === for most cases
 *   - BUT NaN is considered equal to NaN (unlike ===)
 * - For objects/arrays: checks by reference (identity)
 *
 * Use when:
 * - you need a simple "contains?" check for primitives
 *
 * Avoid when:
 * - you need a predicate (use some/find)
 * - you need the index (use indexOf/findIndex)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic: primitives */
section('Basic: primitives');

const tags = ['js', 'ts', 'angular'];

log("tags.includes('ts')", tags.includes('ts'));
log("tags.includes('react')", tags.includes('react'));

/** 2) fromIndex parameter */
section('fromIndex parameter');

const nums = [1, 2, 3, 2, 1];

log('includes(2)', nums.includes(2));
log('includes(2, fromIndex=2)', nums.includes(2, 2)); // searches from index 2
log('includes(2, fromIndex=3)', nums.includes(2, 3)); // index 3 has 2
log('includes(2, fromIndex=4)', nums.includes(2, 4)); // false

// Negative fromIndex counts from the end
log('includes(2, fromIndex=-2)', nums.includes(2, -2)); // last 2 elements

/** 3) NaN gotcha: includes can find NaN */
section('NaN: includes vs === / indexOf');

const weird = [1, NaN, 3];

log('weird.includes(NaN)', weird.includes(NaN)); // true
log('NaN === NaN', NaN === NaN); // false
log('weird.indexOf(NaN)', weird.indexOf(NaN)); // -1 (because indexOf uses ===)

/** 4) Objects: reference equality */
section('Objects: reference equality');

const objA = { id: 1 };
const objB = { id: 1 };
const arr = [objA];

log('arr.includes(objA)', arr.includes(objA)); // true (same ref)
log('arr.includes(objB)', arr.includes(objB)); // false (different ref, same shape)

/**
 * If you need "contains by property", use some/find:
 */
const containsId1 = arr.some((o) => o.id === 1);
log('contains id=1 (via some)', containsId1);

/** 5) Compare with some/find mental trigger */
section('Trigger: includes vs some/find');

log('trigger', 'includes: exact value membership (primitives/ref)');
log('trigger', 'some/find: membership by predicate (property/condition)');

section('Done');
