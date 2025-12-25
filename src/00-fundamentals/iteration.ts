/**
 * iteration.ts
 * Fundamentals: iteration patterns in JS/TS
 *
 * Covers:
 * - for (index control)
 * - for..of (values)
 * - forEach (callback, no break/continue)
 * - while (pointer/scanner)
 * - do..while (run-at-least-once)
 * - Object iteration (entries/keys + for..in w/ hasOwn)
 * - Map/Set iteration
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Classic for: index-driven iteration */
section('Array iteration: classic for (index)');
const nums = [10, 20, 30];
for (let i = 0; i < nums.length; i++) {
  log(`i=${i}`, nums[i]);
}

/** 2) for..of: value-driven iteration */
section('Array iteration: for..of (values)');
for (const n of nums) {
  log('value', n);
}

/** 3) forEach: callback iteration (no break/continue) */
section('Array iteration: forEach (no break/continue)');
nums.forEach((n, i) => {
  log(`i=${i}`, n);
});

/** 4) while: pointer/scanner (common in algorithms) */
section('while: pointer/scanner over array');
let p = 0;
while (p < nums.length) {
  log(`p=${p}`, nums[p]);
  p++;
}

/**
 * while: "two pointers" style (concept demo)
 * You often use this pattern for:
 * - palindromes
 * - merging
 * - sliding window
 */
section('while: two pointers concept (indexes moving)');
const letters = ['a', 'b', 'c', 'd'];
let left = 0;
let right = letters.length - 1;

while (left < right) {
  log('pair', `${letters[left]}-${letters[right]}`);
  left++;
  right--;
}

/**
 * while: consume from a queue efficiently (array + head index)
 * This is a real-world queue pattern in JS (avoid shift()).
 */
section('while: queue consumption with head index (avoid shift)');
const queue = ['task1', 'task2', 'task3'];
let head = 0;

while (head < queue.length) {
  const item = queue[head]!;
  log('dequeue', item);
  head++;
}

/** 5) do..while: runs at least once */
section('do..while: runs at least once (menu/retry style)');
let attempts = 0;
let ok = false;

/**
 * Example: retry loop where you must attempt at least once.
 * In real code, the condition might be "response is valid" or "user input is valid".
 */
do {
  attempts++;
  // Simulate success on 3rd try
  ok = attempts >= 3;
  log('attempt', { attempts, ok });
} while (!ok && attempts < 5);

/**
 * Another do..while: input sanitation loop (concept)
 * Here we keep trimming until it stops changing (usually 1 iteration, but illustrates pattern).
 */
section('do..while: repeat until stable (sanitization concept)');
let raw = '   hello world   ';
let prev: string;

do {
  prev = raw;
  raw = raw.trim();
  log('current', raw);
} while (raw !== prev);

/** 6) Strings are iterable */
section('String iteration: for..of');
const word = 'Hi!';
for (const ch of word) {
  log('char', ch);
}

/** 7) Objects: prefer Object.keys / Object.entries */
section('Object iteration: Object.keys / Object.entries');
const user = { id: 1, name: 'Ada', active: true };

for (const key of Object.keys(user)) {
  const value = (user as Record<string, unknown>)[key];
  log(key, value);
}

for (const [k, v] of Object.entries(user)) {
  log(`${k}`, v);
}

/**
 * 8) for..in: iterates enumerable properties (including inherited).
 * Use only with Object.hasOwn(...) guard.
 */
section('Object iteration: for..in (with hasOwn guard)');
for (const k in user) {
  if (Object.hasOwn(user, k)) {
    log(`own:${k}`, (user as Record<string, unknown>)[k]);
  }
}

/** 9) Map iteration */
section('Map iteration: for..of over entries');
const m = new Map<string, number>([
  ['a', 1],
  ['b', 2],
]);

for (const [k, v] of m) {
  log(`${k}`, v);
}

section('Map iteration: keys() / values() / entries()');
log('keys', [...m.keys()]);
log('values', [...m.values()]);
log('entries', [...m.entries()]);

/** 10) Set iteration */
section('Set iteration: for..of');
const s = new Set([1, 2, 2, 3]);
for (const v of s) {
  log('value', v);
}

/** 11) Breaking early: why for/for..of matters */
section('Breaking early: for..of supports break');
for (const n of nums) {
  if (n === 20) {
    log('found', n);
    break;
  }
}

section('Done');
