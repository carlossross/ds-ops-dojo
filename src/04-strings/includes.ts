/**
 * includes.ts (String.prototype.includes)
 *
 * Mental model:
 * - Returns true if substring exists inside the string
 * - Case-sensitive
 *
 * Signature:
 *   str.includes(searchString, position?) => boolean
 *
 * Notes:
 * - position = starting index to search from
 *
 * Use when:
 * - you only need true/false: "does it contain this?"
 *
 * Avoid when:
 * - you need the index (use indexOf/lastIndexOf)
 * - you need pattern matching (use regex + match)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic substring check */
section('Basic substring check');

const s = 'hello world';

log("s.includes('world')", s.includes('world')); // true
log("s.includes('WORLD')", s.includes('WORLD')); // false (case-sensitive)
log("s.includes('')", s.includes('')); // true (empty string is always included)

/** 2) position parameter */
section('position parameter');

log("s.includes('o', 0)", s.includes('o', 0)); // true (search from start)
log("s.includes('o', 5)", s.includes('o', 5)); // true (search from index 5)
log("s.includes('hello', 1)", s.includes('hello', 1)); // false (can't match starting at 1)

/** 3) Case-insensitive search (common pattern) */
section('Case-insensitive search pattern');

const query = 'WORLD';
const caseInsensitive = s.toLowerCase().includes(query.toLowerCase());

log('query', query);
log('caseInsensitive', caseInsensitive);

/** 4) Common trigger: includes vs indexOf */
section('Trigger: includes vs indexOf');

log('trigger', 'includes -> boolean contains?');
log('trigger', 'indexOf  -> where is it? (index)');

/** 5) Edge cases: whitespace & trimming */
section('Whitespace edges');

const messy = '   hello world   ';
log("messy.includes('hello')", messy.includes('hello')); // true
log("trim().includes('hello')", messy.trim().includes('hello')); // true

/** 6) Beware: includes is substring, not word match */
section('Substring vs word match');

const text = 'cartoon';
log("text.includes('art') (substring)", text.includes('art')); // true

// If you need word boundaries, use regex later:
const wordText = 'art is fun';
log("wordText.includes('art')", wordText.includes('art')); // true (substring)
log('word boundary regex /\\bart\\b/', /\bart\b/.test(wordText)); // true

section('Done');
