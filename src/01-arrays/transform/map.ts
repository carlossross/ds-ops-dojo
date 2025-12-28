/**
 * map.ts
 * Array.prototype.map
 *
 * Mental model:
 * - Transform each element -> new array (same length)
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.map((value, index, array) => newValue) => newArray
 *
 * Use when:
 * - you want a 1:1 transformation (every input element produces exactly 1 output element)
 *
 * Avoid when:
 * - you need filtering (use filter)
 * - you need accumulation into a single value (use reduce)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic: number -> number */
section('Basic: number -> number');
const nums = [1, 2, 3, 4];
const squared = nums.map((n) => n * n);

log('nums', nums);
log('squared', squared);
log('same reference?', nums === squared); // false (new array)
log('same length?', nums.length === squared.length); // true

/** 2) Transform type: number -> string */
section('Transform type: number -> string');
const labels = nums.map((n) => `#${n}`);
log('labels', labels);

/** 3) Map with index (index-aware transformation) */
section('Map with index');
const withIndex = nums.map((n, i) => ({ i, n, tag: `${i}:${n}` }));
log('withIndex', withIndex);

/**
 * Pattern: stable keys for UI
 * - If you don't have an ID, sometimes index is used (not ideal if list reorders).
 */
section('Map for UI shape (id + label)');
type ApiUser = { id: string; full_name: string };
const apiUsers: ApiUser[] = [
  { id: 'u1', full_name: 'Ada Lovelace' },
  { id: 'u2', full_name: 'Alan Turing' },
];

const uiUsers = apiUsers.map((u) => ({
  id: u.id,
  label: u.full_name,
}));
log('uiUsers', uiUsers);

/** 4) Mapping to a constant / boolean flags */
section('Map to flags (booleans)');
const flags = nums.map((n) => n % 2 === 0);
log('flags (isEven)', flags);

/**
 * NOTE:
 * If your mapping creates booleans and later you want only the true ones,
 * that's usually filter (or map + filter, but prefer direct filter).
 */

/** 5) Mapping with condition (but still returns same length) */
section('Map with condition (still same length)');
const maybeZero = nums.map((n) => (n > 2 ? n : 0));
log('maybeZero', maybeZero);

/**
 * If you see yourself returning null/undefined for some items,
 * consider whether you actually want filter + map or flatMap.
 */

/** 6) Mapping + parsing (string -> number), handle failures carefully */
section('Map with parsing (string -> number)');

const raw = ['10', ' 20 ', 'x', '30'];
const parsed = raw.map((s) => Number(s.trim()));
log('raw', raw);
log('parsed (Number)', parsed);
log(
  'NaN positions',
  parsed.map((n) => Number.isNaN(n)),
); // shows where parse failed

/** 7) PITFALL: map does not skip missing elements? (sparse arrays) */
section('Sparse arrays behavior (FYI)');

const sparse = new Array<number>(3); // [empty x 3]
log('sparse', sparse);
log('sparse.length', sparse.length);

const mappedSparse = sparse.map((x) => (x ?? 0) + 1);
log('mappedSparse', mappedSparse);
/**
 * Sparse arrays keep "holes". map won't call callback for missing indexes.
 * For algorithms, avoid sparse arrays; prefer dense arrays.
 */

/** 8) PITFALL: async callbacks do not await (map is not async-aware) */
section('Async pitfall (map returns promises if callback is async)');

async function fakeFetch(n: number): Promise<string> {
  return `data:${n}`;
}

const promises = nums.map(async (n) => fakeFetch(n));
log('promises (array of Promise)', promises);

(async () => {
  const results = await Promise.all(promises);
  log('await Promise.all(results)', results);
})();

/** 9) When NOT to use map: side effects */
section('Avoid map for side effects (use forEach instead)');

const sideEffects: number[] = [];
nums.forEach((n) => {
  // side effect: pushing into external array
  sideEffects.push(n * 10);
});
log('sideEffects via forEach', sideEffects);

section('Done');
