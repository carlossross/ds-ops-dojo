/**
 * substring.ts (String.prototype.substring)
 *
 * Mental model:
 * - Extract substring WITHOUT mutating original string
 * - start is inclusive, end is exclusive
 *
 * Key differences vs slice:
 * - Negative values are treated as 0
 * - If start > end, substring swaps them (start/end)
 *
 * Signature:
 *   str.substring(start, end?) => string
 *
 * Use when:
 * - you want auto-swap behavior
 * - you don't need negative indexing
 *
 * Prefer slice when:
 * - you want negative indexes or consistency with Array.slice
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

const s = 'hello world';

section('Basic usage');

log('s', s);
log('substring(0, 5)', s.substring(0, 5)); // "hello"
log('substring(6)', s.substring(6)); // "world"

section('Difference: start > end swaps');

log('substring(8, 3)', s.substring(8, 3)); // same as substring(3, 8) => "lo wo"
log('slice(8, 3)', s.slice(8, 3)); // "" (slice does NOT swap)

section('Difference: negative becomes 0');

log('substring(-5)', s.substring(-5)); // "hello world" (same as 0)
log('slice(-5)', s.slice(-5)); // "world"

log('substring(-5, 5)', s.substring(-5, 5)); // "hello" (treated as 0..5)
log('slice(-5, 5)', s.slice(-5, 5)); // "" (start from end, end=5)

section('Out of bounds clamping');

log('substring(999)', s.substring(999)); // ""
log('substring(0, 999)', s.substring(0, 999)); // whole string

section('Trigger');

log('trigger', 'Need negative indexing? -> slice');
log('trigger', 'Want start/end auto-swap? -> substring');

section('Done');
