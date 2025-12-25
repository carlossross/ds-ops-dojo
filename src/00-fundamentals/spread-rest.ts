/**
 * spread-rest.ts
 * Fundamentals: spread (...) vs rest (...), where each applies
 *
 * Spread:
 * - expands an iterable or object into another structure
 * - used in array/object literals and function calls
 *
 * Rest:
 * - collects remaining items into an array/object
 * - used in destructuring and function parameters
 *
 * Key: spread "EXPANDS", rest "COLLECTS".
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Spread in arrays: combine/clone */
section('Spread in arrays: clone + combine');

const a = [1, 2, 3];
const cloneA = [...a];
log('cloneA', cloneA);
log('same reference?', a === cloneA);

const b = [4, 5];
const combined = [...a, ...b];
log('combined', combined);

/** 2) Spread in objects: shallow clone + merge */
section('Spread in objects: shallow clone + merge');

const obj = { id: 1, name: 'Ada', meta: { active: true } };
const cloneObj = { ...obj };
log('cloneObj', cloneObj);
log('same reference?', obj === cloneObj);
log('nested shared reference?', obj.meta === cloneObj.meta); // shallow copy!

const merged = { ...obj, name: 'Bob', extra: 123 };
log('merged (name overridden, extra added)', merged);

/** 3) Spread in function calls */
section('Spread in function calls');

function sum3(x: number, y: number, z: number) {
  return x + y + z;
}

const args = [10, 20, 30] as const;
log('sum3(...args)', sum3(...args));

/** 4) Rest in function parameters */
section('Rest in function parameters');

function sumAll(...nums: number[]) {
  let total = 0;
  for (const n of nums) total += n;
  return total;
}

log('sumAll(1,2,3)', sumAll(1, 2, 3));
log('sumAll()', sumAll());

/** 5) Rest in array destructuring */
section('Rest in array destructuring');

const [head, ...tail] = [9, 8, 7, 6];
log('head', head);
log('tail', tail);

/** 6) Rest in object destructuring */
section('Rest in object destructuring');

const user = { id: 1, name: 'Ada', role: 'admin', active: true };
const { active, ...rest } = user;
log('active', active);
log('rest', rest);

/** 7) Spread vs Rest mental model */
section('Mental model: spread EXPANDS, rest COLLECTS');

log('spread expands arrays', [...[1, 2], 3]);
log('rest collects args', 'sumAll(...nums) collects into nums[]');

section('Done');
