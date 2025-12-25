/**
 * errors.ts
 * Fundamentals: errors & exceptions in JS/TS
 *
 * Covers:
 * - throw Error
 * - try/catch/finally
 * - distinguishing expected vs unexpected errors
 * - custom error classes
 * - wrapping errors with "cause"
 * - safe patterns: guard + throw, parse + return null vs throw
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Throwing an Error */
section('throw new Error(...)');

function mustBePositive(n: number): number {
  if (n <= 0) {
    throw new Error(`Expected positive number, got ${n}`);
  }
  return n;
}

try {
  log('mustBePositive(3)', mustBePositive(3));
  log('mustBePositive(-1)', mustBePositive(-1)); // throws
} catch (err) {
  log('caught', err instanceof Error ? err.message : err);
}

/** 2) try/catch/finally: cleanup always runs */
section('try/catch/finally (cleanup)');

function demoFinally(shouldThrow: boolean) {
  try {
    log('start', 'doing work...');
    if (shouldThrow) throw new Error('Boom');
    log('success', 'work done');
  } catch (err) {
    log('catch', err instanceof Error ? err.message : err);
  } finally {
    log('finally', 'cleanup always runs');
  }
}

demoFinally(false);
demoFinally(true);

/** 3) Expected error vs unexpected error (design choice) */
section('Expected vs unexpected errors');

/**
 * For many algorithm utilities:
 * - "invalid input" can be handled either:
 *   A) return null / undefined / Result type
 *   B) throw error
 *
 * Rule of thumb:
 * - throw for programmer mistakes / invariant violations (unexpected)
 * - return null/Result for expected "not found" or "invalid user input"
 */

function parseIntOrNull(s: string): number | null {
  const trimmed = s.trim();
  if (!/^-?\d+$/.test(trimmed)) return null;
  const n = Number(trimmed);
  return Number.isNaN(n) ? null : n;
}

log("parseIntOrNull(' 42 ')", parseIntOrNull(' 42 '));
log("parseIntOrNull('4.2')", parseIntOrNull('4.2'));
log("parseIntOrNull('x')", parseIntOrNull('x'));

/** 4) Custom error classes (useful for distinguishing error types) */
section('Custom Error class');

class ValidationError extends Error {
  override name = 'ValidationError';
  constructor(message: string) {
    super(message);
  }
}

function requireNonEmpty(s: string): string {
  if (s.trim().length === 0)
    throw new ValidationError('String must be non-empty');
  return s;
}

try {
  requireNonEmpty('   ');
} catch (err) {
  if (err instanceof ValidationError) {
    log('caught ValidationError', err.message);
  } else if (err instanceof Error) {
    log('caught other Error', err.message);
  } else {
    log('caught unknown', err);
  }
}

/** 5) Rethrowing / wrapping errors (with cause) */
section('Wrapping errors (cause)');

function lowLevelOperation(): string {
  // simulate a low-level failure
  throw new Error('Low-level failure: disk read');
}

function highLevelOperation(): string {
  try {
    return lowLevelOperation();
  } catch (err) {
    // Wrap with additional context
    // `cause` is supported in modern JS runtimes
    throw new Error('High-level operation failed', { cause: err });
  }
}

try {
  highLevelOperation();
} catch (err) {
  if (err instanceof Error) {
    log('wrapped message', err.message);
    // `cause` is not in older runtimes; in modern ones it exists.
    log('cause', (err as any).cause);
  }
}

/** 6) Handling "unknown" in catch (TypeScript strict best practice) */
section('TypeScript: catch unknown');

function safeMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Unknown error';
}

try {
  throw 'string error'; // people do this; not recommended, but it happens
} catch (err) {
  log('safeMessage', safeMessage(err));
}

/** 7) Pattern: validate -> throw (guard clauses) */
section('Pattern: validate -> throw (guards)');

type User = { id: number; name: string };

function assertValidUser(u: unknown): asserts u is User {
  if (!u || typeof u !== 'object')
    throw new ValidationError('User must be an object');

  const obj = u as Record<string, unknown>;
  if (typeof obj.id !== 'number')
    throw new ValidationError('User.id must be a number');
  if (typeof obj.name !== 'string')
    throw new ValidationError('User.name must be a string');
}

const input: unknown = { id: 1, name: 'Ada' };
try {
  assertValidUser(input);
  // after assert, TS knows input is User
  log('validated user', input.name);
} catch (err) {
  log('validation failed', safeMessage(err));
}

section('Done');
