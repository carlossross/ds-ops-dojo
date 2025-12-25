/**
 * reference-equality.ts
 * Fundamentals: reference equality vs value equality
 *
 * Covers:
 * - primitives compare by value
 * - objects/arrays compare by reference
 * - shared references & mutation side-effects
 * - shallow vs deep copy (concept)
 * - quick shallow equality patterns
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Primitives: value equality */
section('Primitives: compare by value');

log('1 === 1', 1 === 1);
log("'a' === 'a'", 'a' === 'a');
log('true === true', true === true);

// Even if created differently, primitives compare by value
log("Number('5') === 5", Number('5') === 5);

/** 2) Objects/Arrays: reference equality */
section('Objects/Arrays: compare by reference');

const o1 = { x: 1 };
const o2 = { x: 1 };
const o3 = o1;

log('o1 === o2 (different refs)', o1 === o2);
log('o1 === o3 (same ref)', o1 === o3);

const a1 = [1, 2, 3];
const a2 = [1, 2, 3];
const a3 = a1;

log('a1 === a2 (different refs)', a1 === a2);
log('a1 === a3 (same ref)', a1 === a3);

/**
 * Key mental model:
 * - `===` for objects/arrays checks: "is it the same instance?"
 * - Not: "do they contain the same values?"
 */

/** 3) Shared reference + mutation side effects */
section('Shared reference + mutation side effects');

const shared = { count: 0 };
const alias = shared; // points to the same object

alias.count += 1;

log('shared.count (changed)', shared.count);
log('alias.count', alias.count);
log('same ref?', shared === alias);

/** 4) Copying to avoid sharing: shallow copy */
section('Shallow copy: spread (objects) and slice/spread (arrays)');

const baseObj = { a: 1, nested: { b: 2 } };
const copyObj = { ...baseObj };

log('baseObj === copyObj', baseObj === copyObj);
log('nested ref shared?', baseObj.nested === copyObj.nested); // YES (shallow)

const baseArr = [1, 2, 3];
const copyArr1 = [...baseArr];
const copyArr2 = baseArr.slice();

log('baseArr === copyArr1', baseArr === copyArr1);
log('baseArr === copyArr2', baseArr === copyArr2);

/** 5) Shallow copy pitfall: nested objects still shared */
section('Shallow copy pitfall: nested objects still shared');

copyObj.nested.b = 999;
log('baseObj.nested.b (changed!)', baseObj.nested.b);
log('copyObj.nested.b', copyObj.nested.b);

/**
 * Deep copy is not built-in "cleanly" for all cases.
 * - structuredClone(obj) exists in modern runtimes (handles many types).
 * - JSON.parse(JSON.stringify(obj)) works only for JSON-safe shapes (no Dates, Maps, functions, etc).
 */

/** 6) Value equality strategies (practical) */
section('Value equality strategies');

/**
 * Strategy A: compare stable keys / ids instead of whole objects
 * Example: compare by id
 */
type User = { id: string; name: string };

const u1: User = { id: '1', name: 'Ada' };
const u2: User = { id: '1', name: 'Ada (copy)' };

log('u1 === u2 (ref)', u1 === u2);
log('u1.id === u2.id (value key compare)', u1.id === u2.id);

/**
 * Strategy B: shallow equality for flat objects
 */
function shallowEqualRecord(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): boolean {
  if (a === b) return true;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (const k of aKeys) {
    if (!Object.hasOwn(b, k)) return false;
    if (a[k] !== b[k]) return false; // reference equality for nested objects
  }
  return true;
}

const flat1 = { a: 1, b: 2 };
const flat2 = { a: 1, b: 2 };
const flat3 = { a: 1, b: 3 };

log('shallowEqual flat1 vs flat2', shallowEqualRecord(flat1, flat2));
log('shallowEqual flat1 vs flat3', shallowEqualRecord(flat1, flat3));

/**
 * Strategy C: arrays value compare (shallow)
 */
function shallowArrayEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

log('shallowArrayEqual([1,2],[1,2])', shallowArrayEqual([1, 2], [1, 2]));
log('shallowArrayEqual([1,2],[2,1])', shallowArrayEqual([1, 2], [2, 1]));

/** 7) When reference equality is exactly what you want */
section('When reference equality is useful');

/**
 * - Memoization caches (Map key uses reference)
 * - Identity checks (is this the same object instance?)
 * - Performance: avoid deep compare by tracking identity changes (common in UI)
 */
const cache = new Map<object, string>();
const keyObj = { k: 1 };
cache.set(keyObj, 'cached');

log('cache.get(keyObj)', cache.get(keyObj));
log('cache.get({k:1}) (different ref)', cache.get({ k: 1 })); // undefined

section('Done');
