/**
 * join.ts (Array.prototype.join) — used heavily with strings
 *
 * Mental model:
 * - Join an array of strings (or values) into one string
 * - Does NOT mutate the array
 *
 * Signature:
 *   arr.join(separator?) => string
 *
 * Notes:
 * - Default separator is "," if omitted
 * - Non-strings are stringified (String(value))
 * - null/undefined become empty string
 *
 * Use when:
 * - rebuild strings after split/map/filter
 * - format output: CSV, paths, sentences
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic join');

const words = ['hello', 'world'];
log("words.join(' ')", words.join(' ')); // "hello world"
log("words.join('-')", words.join('-')); // "hello-world"

section('Default separator is comma');

log('words.join()', words.join()); // "hello,world"

section('Joining characters');

const chars = ['h', 'e', 'l', 'l', 'o'];
log("chars.join('')", chars.join('')); // "hello"

section('Non-strings are stringified');

const mixed = [1, true, null, undefined, 'x'];
log("mixed.join('|')", mixed.join('|')); // "1|true|||x"

section('Common patterns');

log('CSV', ['id', 'name', 'age'].join(','));
log('path', ['users', 'carlos', 'notes.txt'].join('/'));

section('Round-trip: split + join');

const s = 'a  b   c';
const normalized = s.trim().split(/\s+/).join(' ');
log('original', s);
log('normalized', normalized); // "a b c"

section('Done');
