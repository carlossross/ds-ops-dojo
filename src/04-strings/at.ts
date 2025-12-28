/**
 * at.ts (String.prototype.at)
 *
 * Mental model:
 * - Read a character by index (supports negative indexes)
 * - Returns a string (character) OR undefined
 *
 * Signature:
 *   str.at(index) => string | undefined
 *
 * Notes:
 * - index >= 0 => from start
 * - index < 0  => from end (-1 is last char)
 * - Out of bounds => undefined
 *
 * Use when:
 * - you want last/previous char without doing length math
 * - you want symmetry with Array.prototype.at
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic reading');

const s = 'hello';

log('s', s);
log('s.at(0)', s.at(0)); // "h"
log('s.at(1)', s.at(1)); // "e"
log('s.at(4)', s.at(4)); // "o"

section('Negative indexes');

log('s.at(-1) (last)', s.at(-1)); // "o"
log('s.at(-2)', s.at(-2)); // "l"

section('Out of bounds');

log('s.at(999)', s.at(999)); // undefined
log('s.at(-999)', s.at(-999)); // undefined

section('Guard pattern (avoid undefined)');

const last = s.at(-1);
if (last != null) {
  log('last exists', last);
} else {
  log('last missing', last);
}

section('Compare with length math');

const lastViaLength = s[s.length - 1];
log('lastViaLength', lastViaLength);
log('same?', lastViaLength === s.at(-1));

section('Done');
