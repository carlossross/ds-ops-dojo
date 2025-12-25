/**
 * functions.ts
 * Fundamentals: functions in JS/TS
 *
 * Covers:
 * - function declaration vs function expression vs arrow
 * - parameters & defaults
 * - callbacks
 * - higher-order functions (HOF)
 * - closures (concept + practical examples)
 * - this: quick note (arrow vs function)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Function declaration */
section('Function declaration');

function add(a: number, b: number): number {
  return a + b;
}
log('add(2,3)', add(2, 3));

/** 2) Function expression */
section('Function expression');

const mul = function (a: number, b: number): number {
  return a * b;
};
log('mul(2,3)', mul(2, 3));

/** 3) Arrow function (expression) */
section('Arrow function');

const sub = (a: number, b: number): number => a - b;
log('sub(10,4)', sub(10, 4));

/** 4) Default parameters */
section('Default parameters');

function greet(name: string = 'Anonymous'): string {
  return `Hello, ${name}`;
}
log('greet()', greet());
log("greet('Ada')", greet('Ada'));

/** 5) Callbacks: functions passed as values */
section('Callbacks');

function repeat(times: number, fn: (i: number) => void): void {
  for (let i = 0; i < times; i++) fn(i);
}

repeat(3, (i) => log('callback i', i));

/**
 * Callback mental model:
 * - you pass behavior (what to do)
 * - the function controls timing/iteration (when to do it)
 */

/** 6) Higher-order functions (HOF): takes and/or returns a function */
section('Higher-order functions (HOF)');

function makeAdder(base: number): (n: number) => number {
  return (n) => base + n;
}

const add10 = makeAdder(10);
log('add10(5)', add10(5));
log('add10(100)', add10(100));

/** 7) Closures: function remembers variables from its creation scope */
section('Closures: remembers captured variables');

function makeCounter(start = 0) {
  let count = start; // captured by the returned function (closure)
  return {
    inc() {
      count += 1;
      return count;
    },
    dec() {
      count -= 1;
      return count;
    },
    value() {
      return count;
    },
  };
}

const c1 = makeCounter(0);
log('c1.inc()', c1.inc());
log('c1.inc()', c1.inc());
log('c1.value()', c1.value());

const c2 = makeCounter(100);
log('c2.dec()', c2.dec());
log('c2.value()', c2.value());

/**
 * Why closures matter for DS/algorithms:
 * - memoization (cache values)
 * - factories (build specialized functions)
 * - encapsulation (private state without classes)
 */

/** 8) Memoization demo (closure + Map cache) */
section('Closures + Map: memoization concept');

function memoizeUnary<A, R>(fn: (a: A) => R): (a: A) => R {
  const cache = new Map<A, R>();
  return (a: A) => {
    if (cache.has(a)) return cache.get(a)!;
    const res = fn(a);
    cache.set(a, res);
    return res;
  };
}

const slowSquare = (n: number) => {
  // pretend expensive
  let x = 0;
  for (let i = 0; i < 1_000_00; i++) x += i;
  return n * n;
};

const fastSquare = memoizeUnary(slowSquare);

log('fastSquare(12) first', fastSquare(12));
log('fastSquare(12) cached', fastSquare(12));

/** 9) HOFs you already use: map/filter/reduce as "array controls iteration" */
section('map/filter/reduce mental model (no katas)');

const nums = [1, 2, 3, 4];

const doubled = nums.map((n) => n * 2); // transform
const evens = nums.filter((n) => n % 2 === 0); // select
const sum = nums.reduce((acc, n) => acc + n, 0); // accumulate

log('doubled', doubled);
log('evens', evens);
log('sum', sum);

/**
 * Each of these is:
 * - A function (map/filter/reduce)
 * - that takes a callback (your logic)
 * - and controls iteration for you
 */

/** 10) Quick note about `this`: arrow vs function */
section('this note: arrow vs function (quick)');

const obj = {
  value: 42,
  normalFn() {
    return this.value; // this refers to obj when called as obj.normalFn()
  },
  arrowFn: () => {
    // arrow has lexical this (not bound to obj)
    // In modules/strict mode, `this` is usually undefined here.
    // We'll return a string explanation instead of relying on runtime this.
    return 'Arrow functions do NOT have their own `this`.';
  },
};

log('obj.normalFn()', obj.normalFn());
log('obj.arrowFn()', obj.arrowFn());

section('Done');
