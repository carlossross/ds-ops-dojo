/**
 * forEach.ts
 * Array.prototype.forEach
 *
 * Mental model:
 * - Iterate for SIDE EFFECTS (does not build a new array)
 * - Returns void (undefined)
 * - Does NOT mutate by itself, but your callback can mutate things
 *
 * Signature:
 *   arr.forEach((value, index, array) => void) => void
 *
 * Use when:
 * - logging, pushing into external structures, calling functions
 * - you explicitly want side effects
 *
 * Avoid when:
 * - you want a transformed array (use map)
 * - you want a filtered array (use filter)
 * - you want a single accumulated result (use reduce)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic side effect: print items */
section('Basic: side effect (print)');

const nums = [1, 2, 3];

nums.forEach((n, i) => {
  console.log(`item #${i}:`, n);
});

/** 2) Build a new array via side effects (works, but map is cleaner) */
section('Build array via side effects (vs map)');

const squaresA: number[] = [];
nums.forEach((n) => squaresA.push(n * n));
log('squaresA (forEach + push)', squaresA);

const squaresB = nums.map((n) => n * n);
log('squaresB (map)', squaresB);

/** 3) Mutating objects inside array (side effect) */
section('Mutating elements (be careful)');

const objs = [{ x: 1 }, { x: 2 }];

objs.forEach((o) => {
  o.x *= 10; // mutates objects
});

log('objs mutated', objs);

/**
 * If you're doing frontend state, prefer creating new objects:
 * const newObjs = objs.map(o => ({...o, x: o.x * 10}))
 */

/** 4) Early-exit limitation */
section('No break/return early in forEach');

let found = false;

nums.forEach((n) => {
  if (n === 2) {
    found = true;
    return; // returns from callback only, NOT from the outer function, and does not stop loop
  }
  // still continues for n=3
});

log('found', found);

/**
 * If you need early exit:
 * - use for..of + break
 * - or use some/find
 */

/** 5) Async pitfall: forEach ignores await */
section('Async pitfall: forEach does not await');

async function fakeFetch(n: number): Promise<string> {
  return `data:${n}`;
}

(async () => {
  const results: string[] = [];

  // ❌ This won't await each fakeFetch; outer function continues
  nums.forEach(async (n) => {
    const r = await fakeFetch(n);
    results.push(r);
  });

  // results is likely still empty here
  log('results immediately after forEach', results);

  // ✅ Correct patterns:
  const all = await Promise.all(nums.map((n) => fakeFetch(n)));
  log('Promise.all(map(...))', all);

  // ✅ Or sequential:
  const seq: string[] = [];
  for (const n of nums) {
    seq.push(await fakeFetch(n));
  }
  log('sequential for..of await', seq);
})();

section('Done');
