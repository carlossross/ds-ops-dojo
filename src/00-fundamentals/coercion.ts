/**
 * coercion.ts
 * Fundamentals: type coercion (explicit vs implicit)
 *
 * Covers:
 * - explicit conversion: String(), Number(), Boolean()
 * - parseInt / parseFloat differences
 * - implicit coercion pitfalls (+, ==)
 * - NaN, Infinity, Number.isNaN
 * - best practices: prefer explicit conversions
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Explicit conversion */
section('Explicit conversion: String / Number / Boolean');

log('String(123)', String(123));
log('String(true)', String(true));
log('String(null)', String(null));
log('String(undefined)', String(undefined));

log("Number('42')", Number('42'));
log("Number('  42  ')", Number('  42  '));
log("Number('')", Number('')); // 0 (surprising)
log("Number('x')", Number('x')); // NaN
log('Number(true)', Number(true)); // 1
log('Number(false)', Number(false)); // 0
log('Number(null)', Number(null)); // 0
log('Number(undefined)', Number(undefined)); // NaN

log("Boolean('')", Boolean('')); // false
log("Boolean('0')", Boolean('0')); // true
log('Boolean(0)', Boolean(0)); // false
log('Boolean([])', Boolean([])); // true
log('Boolean({})', Boolean({})); // true

/** 2) parseInt / parseFloat */
section('parseInt / parseFloat');

log("parseInt('42')", parseInt('42', 10));
log("parseInt('42px')", parseInt('42px', 10)); // 42
log("parseInt('  42  ')", parseInt('  42  ', 10)); // 42
log("parseInt('08', 10)", parseInt('08', 10)); // always pass radix

log("parseFloat('3.14')", parseFloat('3.14'));
log("parseFloat('3.14px')", parseFloat('3.14px')); // 3.14
log("parseFloat('  3.14  ')", parseFloat('  3.14  '));

/**
 * Key difference:
 * - Number('42px') => NaN (strict)
 * - parseInt('42px') => 42 (parses prefix)
 * Use based on intent.
 */

/** 3) NaN checks */
section('NaN checks');

const a = Number('x');
log('a', a);
log('a === NaN (always false)', a === NaN);
log('Number.isNaN(a) (correct)', Number.isNaN(a));

/** 4) Infinity */
section('Infinity');

log('1/0', 1 / 0);
log('-1/0', -1 / 0);
log('Number.isFinite(1/0)', Number.isFinite(1 / 0));
log('Number.isFinite(123)', Number.isFinite(123));

/** 5) Implicit coercion with + */
section('Implicit coercion: + operator');

log("'1' + 2", '1' + 2); // "12"
log("1 + '2'", 1 + '2'); // "12"
log("1 + 2 + '3'", 1 + 2 + '3'); // "33" (because (1+2)=3, then '3' => "33")
log("'1' + 2 + 3", '1' + 2 + 3); // "123" (string from start)

/**
 * Best practice:
 * - If you mean numeric addition, ensure numbers: Number(x) + Number(y)
 * - If you mean string concat, ensure strings: String(x) + String(y)
 */

/** 6) Implicit coercion with == (avoid, but know pitfalls) */
section('Loose equality == pitfalls (know, avoid)');

log('0 == false', 0 == false);
log('0 === false', 0 === false);

log("'' == false", '' == false);
log("'' === false", '' === false);

log("'0' == 0", '0' == 0);
log("'0' === 0", '0' === 0);

log('null == undefined', null == undefined);
log('null === undefined', null === undefined);

/**
 * Rule of thumb:
 * - Always use === / !==
 * - Prefer explicit conversion when you need it
 */

/** 7) Practical parsing pattern: safe number parse */
section('Practical pattern: safe parse');

function toNumberOrNull(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed.length === 0) return null;
  const n = Number(trimmed);
  return Number.isNaN(n) ? null : n;
}

log("toNumberOrNull(' 12 ')", toNumberOrNull(' 12 '));
log("toNumberOrNull('')", toNumberOrNull(''));
log("toNumberOrNull('12px')", toNumberOrNull('12px'));

section('Done');
