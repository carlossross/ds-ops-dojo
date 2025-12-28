/**
 * split.ts (String.prototype.split)
 *
 * Mental model:
 * - Split a string into an array of substrings (tokens)
 * - Does NOT mutate original string (strings are immutable)
 *
 * Signature:
 *   str.split(separator?, limit?) => string[]
 *
 * separator:
 * - string or RegExp
 * - if omitted => [str] (whole string as single element)
 *
 * limit:
 * - max number of items in the resulting array
 *
 * Use when:
 * - tokenization, parsing, line splitting, word splitting
 *
 * Watch-outs:
 * - split("") splits into characters (surrogate pair caveats)
 * - regex splitting is powerful (whitespace, multiple separators)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

const s = 'hello world';

section('Basic split by space');

log("s.split(' ')", s.split(' ')); // ["hello", "world"]

section('Separator not found => single element');

log("s.split(',')", s.split(',')); // ["hello world"]

section('Split into characters');

log("'abc'.split('')", 'abc'.split('')); // ["a","b","c"]
log("''.split('')", ''.split('')); // []

/**
 * Note:
 * - split('') works for many cases, but emojis/complex unicode can be tricky.
 */

section('Limit parameter');

log("'a,b,c'.split(',', 2)", 'a,b,c'.split(',', 2)); // ["a","b"]
log("'a,b,c'.split(',', 10)", 'a,b,c'.split(',', 10)); // ["a","b","c"]

section('Split with multiple spaces (regex)');

const messy = '  split   me   please  ';
log("messy.split(' ')", messy.split(' ')); // lots of empty strings
log('messy.trim().split(/\\s+/)', messy.trim().split(/\s+/)); // clean tokens

section('Split lines');

const multi = 'line1\nline2\nline3';
log("multi.split('\\n')", multi.split('\n'));

section('CSV-ish split (simple)');

const csv = 'id,name,age';
const headers = csv.split(',');
log('headers', headers);

/**
 * For real CSV with quoted commas etc., you need a CSV parser.
 */

section('Trigger');

log('trigger', 'split -> string => string[] tokens');
log('trigger', 'join  -> string[] => string');

section('Done');
