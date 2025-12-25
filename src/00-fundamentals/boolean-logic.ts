/**
 * boolean-logic.ts
 * Fundamentals: boolean logic in JS/TS
 *
 * Covers:
 * - &&, ||, !
 * - short-circuit behavior (very important)
 * - truthy/falsy values
 * - nullish coalescing ?? (vs ||)
 * - optional chaining ?. (safe access)
 * - common guard patterns
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Truthy / falsy quick tour */
section('Truthy / falsy');

const samples: unknown[] = [
  false,
  true,
  0,
  1,
  -1,
  '',
  'hi',
  null,
  undefined,
  NaN,
  [],
  {},
  '0',
];

for (const v of samples) {
  log(`Boolean(${String(v)})`, Boolean(v));
}

/**
 * Remember (falsy):
 * - false
 * - 0, -0
 * - "" (empty string)
 * - null
 * - undefined
 * - NaN
 * Everything else is truthy (including [] and {}).
 */

/** 2) NOT (!) */
section('NOT (!)');

log('!true', !true);
log('!false', !false);
log('!0', !0);
log("!!'hi' (double NOT to coerce)", !!'hi');

/** 3) AND (&&): short-circuit + returns last evaluated operand */
section('AND (&&): short-circuit + return value');

function sideEffect(label: string): boolean {
  console.log(`(sideEffect) executed: ${label}`);
  return true;
}

log("true && 'ok'", true && 'ok'); // returns "ok"
log("false && 'ok'", false && 'ok'); // returns false (short-circuit)
log('0 && 123', 0 && 123); // returns 0 (short-circuit because 0 is falsy)

log('short-circuit demo', true && sideEffect('A')); // A runs
log('short-circuit demo', false && sideEffect('B')); // B does NOT run

/**
 * Common pattern:
 * condition && doSomething()
 * Useful but sometimes less readable than an explicit if.
 */

/** 4) OR (||): short-circuit + returns first truthy operand */
section('OR (||): short-circuit + return value');

log("'' || 'fallback'", '' || 'fallback'); // "fallback"
log("'hi' || 'fallback'", 'hi' || 'fallback'); // "hi"
log('0 || 999', 0 || 999); // 999 (because 0 is falsy)

log('short-circuit demo', true || sideEffect('C')); // C does NOT run
log('short-circuit demo', false || sideEffect('D')); // D runs

/**
 * Common pattern:
 * const x = input || defaultValue
 * BUT this treats 0 and "" as "missing" even if they are valid.
 * For that, use ??.
 */

/** 5) Nullish coalescing (??): only null/undefined trigger fallback */
section('Nullish coalescing (??) vs OR (||)');

const empty = '';
const zero = 0;
const missing = undefined;
const absent = null;

log("'' || 'fallback'", empty || 'fallback'); // "fallback"
log("'' ?? 'fallback'", empty ?? 'fallback'); // "" (keeps empty string)

log('0 || 999', zero || 999); // 999
log('0 ?? 999', zero ?? 999); // 0 (keeps zero)

log("undefined ?? 'fallback'", missing ?? 'fallback'); // "fallback"
log("null ?? 'fallback'", absent ?? 'fallback'); // "fallback"

/**
 * Rule of thumb:
 * - Use ?? when 0/"" are valid values.
 * - Use || when any falsy should fallback (rare for data, sometimes for booleans).
 */

/** 6) Optional chaining (?.): safe access */
section('Optional chaining (?.)');

type Profile = { name: string; address?: { city?: string } };

const p1: Profile = { name: 'Ada', address: { city: 'Monterrey' } };
const p2: Profile = { name: 'Bob' };

log('p1.address?.city', p1.address?.city); // "Monterrey"
log('p2.address?.city', p2.address?.city); // undefined
