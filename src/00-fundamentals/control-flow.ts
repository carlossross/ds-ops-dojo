/**
 * control-flow.ts
 * Fundamentals: control flow in JS/TS
 *
 * Covers:
 * - if / else
 * - guard clauses + early return
 * - switch
 * - ternary
 * - break / continue
 * - return (and why early return simplifies logic)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) if / else: branching */
section('if / else: branching');
const score = 82;

if (score >= 90) {
  log('grade', 'A');
} else if (score >= 80) {
  log('grade', 'B');
} else if (score >= 70) {
  log('grade', 'C');
} else {
  log('grade', 'D');
}

/**
 * 2) Guard clauses + early return
 * The goal: avoid deep nesting. Validate preconditions up front.
 */
section('Guard clauses + early return');

function parsePositiveInt(input: string): number | null {
  // Guard 1: empty / whitespace
  if (input.trim().length === 0) return null;

  // Guard 2: must be an integer string
  if (!/^\d+$/.test(input)) return null;

  const n = Number(input);

  // Guard 3: must be positive (business rule)
  if (n <= 0) return null;

  return n;
}

log("parsePositiveInt('42')", parsePositiveInt('42'));
log("parsePositiveInt('  ')", parsePositiveInt('  '));
log("parsePositiveInt('4.2')", parsePositiveInt('4.2'));
log("parsePositiveInt('-1')", parsePositiveInt('-1'));

/**
 * 3) switch: multi-branch by exact value
 * Good for: known finite set of cases (status, role, command).
 */
section('switch: finite set of cases');

type Status = 'idle' | 'loading' | 'success' | 'error';

function statusMessage(status: Status): string {
  switch (status) {
    case 'idle':
      return 'Nothing happening yet.';
    case 'loading':
      return 'Loading...';
    case 'success':
      return 'Done!';
    case 'error':
      return 'Something went wrong.';
    default: {
      // In TS, this should be unreachable if Status is exhaustive.
      // But keeping default helps when status is wider at runtime.
      const _exhaustive: never = status;
      return _exhaustive;
    }
  }
}

log("statusMessage('loading')", statusMessage('loading'));

/**
 * 4) ternary: expression-level conditional
 * Use for simple, single-expression decisions.
 * Avoid nested ternaries for readability.
 */
section('ternary: simple conditional expression');

const isMember = true;
const price = isMember ? 80 : 100;
log('price', price);

/**
 * 5) break / continue: loop control
 * break: stops the loop completely
 * continue: skips to next iteration
 */
section('break / continue: controlling loops');

const items = [10, -2, 5, 0, 12, -1];

// Example: sum only positive values, stop if we see a 0 (sentinel)
let sum = 0;

for (const x of items) {
  if (x < 0) continue; // skip negatives
  if (x === 0) break; // stop on sentinel
  sum += x;
}

log('sum positives until 0', sum);

/**
 * 6) return: early return in loops (inside a function)
 * Pattern: find something and return immediately.
 */
section('return early: find and return');

function firstEven(nums: number[]): number | null {
  for (const n of nums) {
    if (n % 2 === 0) return n; // early return ends function
  }
  return null;
}

log('firstEven([1,3,7,10,11])', firstEven([1, 3, 7, 10, 11]));
log('firstEven([1,3,5])', firstEven([1, 3, 5]));

/**
 * 7) Combining guard clauses + loop control (common real-world pattern)
 * Validate input, then process.
 */
section('guard + loop control: robust processing');

function sumValidNumbers(inputs: string[]): number {
  let total = 0;

  for (const raw of inputs) {
    const s = raw.trim();

    // guard: ignore empty
    if (s.length === 0) continue;

    // guard: ignore invalid numbers
    const n = Number(s);
    if (Number.isNaN(n)) continue;

    total += n;
  }

  return total;
}

log('sumValidNumbers', sumValidNumbers([' 1 ', 'x', '', '2.5', ' 3 ']));

/**
 * 8) switch vs if/else quick guideline
 * - switch: exact match, finite cases
 * - if/else: ranges, complex boolean conditions
 */
section('Done');
