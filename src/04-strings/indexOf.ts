/**
 * indexOf.ts (String.prototype.indexOf)
 *
 * Mental model:
 * - Returns the index of the FIRST occurrence of a substring
 * - If not found => -1
 * - Case-sensitive
 *
 * Signature:
 *   str.indexOf(searchValue, fromIndex?) => number
 *
 * Use when:
 * - you need the position (index) of a substring
 * - you want to cut around it (slice/substring)
 *
 * Avoid when:
 * - you only need boolean (use includes)
 * - you need last occurrence (use lastIndexOf)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic usage */
section('Basic usage');

const s = 'hello world';

log("s.indexOf('world')", s.indexOf('world')); // 6
log("s.indexOf('WORLD')", s.indexOf('WORLD')); // -1
log("s.indexOf('o')", s.indexOf('o')); // 4 (first 'o')

/** 2) fromIndex parameter */
section('fromIndex parameter');

log("s.indexOf('o', 0)", s.indexOf('o', 0)); // 4
log("s.indexOf('o', 5)", s.indexOf('o', 5)); // 7 (next 'o')
log("s.indexOf('o', 8)", s.indexOf('o', 8)); // -1

/** 3) Typical pattern: check presence */
section('Presence check pattern');

const idx = s.indexOf('world');
log('idx', idx);
log('exists?', idx !== -1);

/** 4) Typical pattern: split around first occurrence */
section('Split around first occurrence (using slice)');

const sep = ' ';
const sepIdx = s.indexOf(sep);

if (sepIdx === -1) {
  log('no separator found', s);
} else {
  const left = s.slice(0, sepIdx);
  const right = s.slice(sepIdx + sep.length);
  log('left', left);
  log('right', right);
}

/** 5) Case-insensitive indexOf */
section('Case-insensitive search');

const query = 'WORLD';
const idxCI = s.toLowerCase().indexOf(query.toLowerCase());
log('idxCI', idxCI);

/** 6) Multi-char substring */
section('Multi-char substring');

const t = 'abababa';
log("t.indexOf('aba')", t.indexOf('aba')); // 0
log("t.indexOf('aba', 1)", t.indexOf('aba', 1)); // 2

section('Done');
