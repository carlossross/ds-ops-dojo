/**
 * assignment.ts
 * Fundamentals: assignment & updating values in JS/TS
 *
 * Covers:
 * - =, +=, -=, *=, /=, **=
 * - ++ / -- (prefix vs postfix)
 * - logical assignment: ||=, &&=, ??=
 * - destructuring assignment (incl. defaults)
 * - reference assignment (objects/arrays) vs copying
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic assignment (=) */
section('Basic assignment (=)');

let x = 10;
log('x', x);

x = 42;
log('x reassigned', x);

/** 2) Compound assignment (+=, -=, *=, /=, **=) */
section('Compound assignment (+=, -=, *=, /=, **=)');

let n = 5;
n += 3; // n = n + 3
log('n += 3', n);

n -= 2; // n = n - 2
log('n -= 2', n);

n *= 4; // n = n * 4
log('n *= 4', n);

n /= 3; // n = n / 3
log('n /= 3', n);

n **= 2; // n = n ** 2
log('n **= 2', n);

/** 3) Increment / Decrement (++/--) gotchas */
section('++ / -- (prefix vs postfix)');

let a = 10;

log('a (start)', a);

// Postfix: returns old value, then updates
const post = a++;
log('post = a++ (returns old)', post);
log('a after a++', a);

// Prefix: updates first, returns new value
const pre = ++a;
log('pre = ++a (returns new)', pre);
log('a after ++a', a);

/**
 * Rule of thumb:
 * - Prefer `a += 1` in most code (clearer).
 * - Use ++ in tight loops if you want.
 */

/** 4) Logical assignment operators: ||=, &&=, ??= */
section('Logical assignment: ||=, &&=, ??=');

/**
 * ||= assigns if left side is falsy
 * (so it WILL replace 0, '' if those are valid values)
 */
let title = '';
title ||= 'Untitled';
log("title ||= 'Untitled' (empty string replaced)", title);

/**
 * &&= assigns if left side is truthy
 * Useful for conditional update
 */
let token: string | null = 'abc';
token &&= token.toUpperCase();
log('token &&= token.toUpperCase()', token);

token = null;
token &&= 'SHOULD_NOT_ASSIGN';
log('token null &&= ... (no change)', token);

/**
 * ??= assigns only if left side is null or undefined
 * This is often what you want for defaults (keeps 0 and '')
 */
let retries: number | undefined = undefined;
retries ??= 3;
log('retries ??= 3', retries);

let timeoutMs = 0;
timeoutMs ??= 5000; // keeps 0
log('timeoutMs ??= 5000 (keeps 0)', timeoutMs);

/** 5) Destructuring assignment */
section('Destructuring assignment: arrays');

const pair = [100, 200] as const;
const [first, second] = pair;
log('first', first);
log('second', second);

// Skip items + rest
const coords = [10, 20, 30, 40];
const [x1, , z1, ...rest] = coords;
log('x1', x1);
log('z1', z1);
log('rest', rest);

section('Destructuring assignment: objects');

const user = { id: 1, name: 'Ada', role: 'admin' as const };
const { id, name } = user;
log('id', id);
log('name', name);

// Rename + default values
const { role: userRole, missing = 'default' } = user as {
  id: number;
  name: string;
  role?: string;
  missing?: string;
};
log('userRole (renamed)', userRole);
log('missing (default)', missing);

/** 6) Destructuring assignment as update (mutation vs immutability) */
section('Destructuring as update: shallow copy with spread');

const original = { a: 1, b: 2, nested: { c: 3 } };
const updated = { ...original, b: 999 };

log('original', original);
log('updated', updated);

/**
 * Important: spread is shallow copy.
 * nested is still the SAME reference.
 */
log('same nested reference?', original.nested === updated.nested);

/** 7) Reference assignment: objects/arrays are references */
section('Reference assignment (objects/arrays)');

const obj1 = { k: 1 };
const obj2 = obj1; // same reference
obj2.k = 999;

log('obj1 (changed because shared ref)', obj1);
log('obj2', obj2);
log('obj1 === obj2', obj1 === obj2);

// Copy to avoid sharing
const obj3 = { ...obj1 };
obj3.k = 123;
log('obj1 after obj3 change (no change)', obj1);
log('obj3', obj3);

section('Done');
