/**
 * concat.ts
 * Array.prototype.concat
 *
 * Mental model:
 * - Combine arrays (and/or values) into a NEW array
 * - Does NOT mutate original arrays
 *
 * Signature:
 *   arr.concat(...items) => newArray
 * where items can be values or arrays
 *
 * Notes:
 * - Shallow operation: elements are copied by reference
 * - If you concat arrays, it flattens ONLY one level (the arrays you pass)
 *
 * Use when:
 * - you want immutable combining without spread (older/explicit style)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic: combine two arrays */
section('Combine two arrays');

const a = [1, 2];
const b = [3, 4];

const combined = a.concat(b);

log('a', a);
log('b', b);
log('combined', combined);
log('a unchanged?', a);
log('b unchanged?', b);

/** 2) Concat values too */
section('Concat values (not only arrays)');

const withValues = a.concat(99, 100);
log('withValues', withValues);

/** 3) Multiple arrays at once */
section('Concat multiple arrays');

const c = [5, 6];
const all = a.concat(b, c);
log('all', all);

/** 4) Concat vs spread */
section('Concat vs spread');

const spreadAll = [...a, ...b, ...c];
log('spreadAll', spreadAll);
log('same as concat?', JSON.stringify(all) === JSON.stringify(spreadAll));

/** 5) Shallow behavior (references) */
section('Shallow behavior (references)');

const o1 = { id: 1 };
const o2 = { id: 2 };

const arr1 = [o1];
const arr2 = [o2];

const mergedObjs = arr1.concat(arr2);
log('mergedObjs', mergedObjs);
log('same element ref?', mergedObjs[0] === o1); // true

mergedObjs[0]!.id = 999;
log('arr1 affected (shared ref)', arr1);

/** 6) One-level flatten when concatenating arrays */
section('One-level flatten when concatenating arrays');

const nested = [1, [2, 3]] as (number | number[])[];
const res = [].concat(nested as any); // shows behavior, but not recommended typing
log('nested', nested);
log('concat result', res);

/**
 * In practice:
 * - concat does not deep flatten arbitrary nesting
 * - use flat(depth) or reduce/flatMap patterns when you need flattening logic
 */

/** 7) Practical pattern: immutable append/prepend */
section('Practical: immutable append/prepend');

const base = [10, 20, 30];

const append = base.concat(40);
const prepend = [0].concat(base);

log('base', base);
log('append', append);
log('prepend', prepend);

section('Done');
