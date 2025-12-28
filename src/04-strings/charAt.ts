/**
 * charAt.ts (String.prototype.charAt)
 *
 * Mental model:
 * - Read a character at a given index (0..length-1)
 * - Returns a string (1 char) OR "" (empty string if out of bounds)
 *
 * Signature:
 *   str.charAt(index) => string
 *
 * Notes:
 * - Does NOT support negative indexes (negative becomes 0 in practice)
 * - Out of bounds => "" (empty string), not undefined
 *
 * Use when:
 * - you want a guaranteed string return (no undefined)
 * - legacy codebases / explicit empty-string behavior
 *
 * Compare with:
 * - str.at(i) => string | undefined (supports negative)
 * - str[i]    => string | undefined (no negative)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic reading');

const s = 'hello';

log('s.charAt(0)', s.charAt(0)); // "h"
log('s.charAt(4)', s.charAt(4)); // "o"

section('Out of bounds => empty string');

log('s.charAt(999)', s.charAt(999)); // ""
log('s.charAt(-1)', s.charAt(-1)); // "" (negative treated like 0-ish)
log('s.charAt(NaN)', s.charAt(Number.NaN)); // "" -> index becomes 0

section('Compare: bracket vs at vs charAt');

log('s[999]', s[999]); // undefined
log('s.at(999)', s.at(999)); // undefined
log('s.charAt(999)', s.charAt(999)); // ""

section('Negative index behavior');

log('s.at(-1) (last)', s.at(-1)); // "o"
log('s.charAt(-1)', s.charAt(-1)); // "" (NOT last)
log('s[-1] (bracket)', (s as any)[-1]); // undefined (property "-1", not index)

section('Guard pattern example');

const ch = s.charAt(10);
if (ch === '') {
  log('missing char', 'out of bounds');
} else {
  log('char exists', ch);
}

section('Done');
