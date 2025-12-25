/**
 * type-checks.ts
 * Fundamentals: type checks + narrowing patterns in JS/TS
 *
 * Covers:
 * - typeof
 * - Array.isArray
 * - instanceof
 * - null/undefined checks
 * - "in" operator + Object.hasOwn
 * - Number.isNaN
 * - custom type guards: (x is T)
 * - assertion functions: asserts x is T
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) typeof */
section('typeof');

const values: unknown[] = [
  'hi',
  123,
  true,
  undefined,
  null,
  Symbol('s'),
  BigInt(10),
  () => {},
  { a: 1 },
];

for (const v of values) {
  // Note: typeof null === 'object' (classic JS gotcha)
  log(`typeof ${String(v)}`, typeof v);
}

log('typeof null (gotcha)', typeof null);

/**
 * typeof is best for primitives:
 * - 'string', 'number', 'boolean', 'undefined', 'function', 'bigint', 'symbol'
 * For objects, use more specific checks.
 */

/** 2) Array.isArray */
section('Array.isArray');

log('Array.isArray([])', Array.isArray([]));
log('Array.isArray({})', Array.isArray({}));
log("Array.isArray('x')", Array.isArray('x'));

/** 3) instanceof */
section('instanceof');

class Person {
  constructor(public name: string) {}
}

const p = new Person('Ada');

log('p instanceof Person', p instanceof Person);
log('new Date() instanceof Date', new Date() instanceof Date);
log('new Map() instanceof Map', new Map() instanceof Map);
log('new Set() instanceof Set', new Set() instanceof Set);
log('[] instanceof Array', [] instanceof Array);

/**
 * Note: instanceof depends on prototype chain.
 * In some cross-realm cases (iframes), instanceof can be tricky.
 * For arrays, prefer Array.isArray.
 */

/** 4) null / undefined checks */
section('null / undefined checks');

const maybe: string | null | undefined = Math.random() > 0.5 ? 'ok' : null;

if (maybe == null) {
  // true when null OR undefined (intentional)
  log('maybe is nullish (null or undefined)', maybe);
} else {
  // narrowed to string
  log('maybe is string', maybe.toUpperCase());
}

/** 5) NaN checks */
section('NaN checks');

const bad = Number('not-a-number');
log('bad', bad);
log('bad === NaN (always false)', bad === NaN);
log('Number.isNaN(bad) (correct)', Number.isNaN(bad));

/** 6) "in" operator vs Object.hasOwn */
section('"in" vs Object.hasOwn');

type WithId = { id: number };

const obj: unknown = { id: 123, name: 'Ada' };

if (obj && typeof obj === 'object' && 'id' in obj) {
  // "id" in obj checks prototype chain too
  const id = (obj as any).id;
  log('"id" in obj → id', id);
}

const plain = Object.create({ inherited: true });
plain.own = 'yes';

log('"inherited" in plain', 'inherited' in plain); // true (inherited)
log("Object.hasOwn(plain, 'inherited')", Object.hasOwn(plain, 'inherited')); // false
log("Object.hasOwn(plain, 'own')", Object.hasOwn(plain, 'own')); // true

/**
 * Rule of thumb:
 * - Object.hasOwn(obj, key) when you want own properties only.
 * - "key" in obj when prototype is acceptable (rare for data objects).
 */

/** 7) Custom type guard (x is T) */
section('Custom type guard: x is T');

type User = { id: number; name: string; email?: string };

function isUser(x: unknown): x is User {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return typeof o.id === 'number' && typeof o.name === 'string';
}

const maybeUser: unknown = { id: 1, name: 'Ada' };

if (isUser(maybeUser)) {
  // narrowed to User
  log('User.name', maybeUser.name.toUpperCase());
} else {
  log('Not a user', maybeUser);
}

/** 8) Assertion function (asserts x is T) */
section('Assertion function: asserts x is T');

class ValidationError extends Error {
  override name = 'ValidationError';
}

function assertUser(x: unknown): asserts x is User {
  if (!isUser(x)) throw new ValidationError('Invalid User shape');
}

try {
  const x: unknown = { id: 2, name: 'Bob' };
  assertUser(x);
  // From here on, TS knows x is User
  log('asserted user id', x.id);
} catch (err) {
  log('assertUser failed', err instanceof Error ? err.message : err);
}

/** 9) Narrowing unions (common in TS) */
section('Narrowing unions');

type ApiResult =
  | { ok: true; data: { value: number } }
  | { ok: false; error: string };

function handleResult(r: ApiResult) {
  if (!r.ok) {
    // narrowed to error branch
    log('error', r.error);
    return;
  }
  // narrowed to success branch
  log('value', r.data.value);
}

handleResult({ ok: true, data: { value: 123 } });
handleResult({ ok: false, error: 'Bad request' });

section('Done');
