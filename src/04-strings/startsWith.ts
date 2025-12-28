/**
 * startsWith.ts (String.prototype.startsWith)
 *
 * Mental model:
 * - Returns true if string starts with the given substring (prefix check)
 * - Case-sensitive
 *
 * Signature:
 *   str.startsWith(searchString, position?) => boolean
 *
 * Notes:
 * - position = index to start checking from (treats that index as "start")
 *
 * Use when:
 * - prefix checks: protocol, command, token, namespace, etc.
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic prefix check */
section('Basic prefix check');

const url = 'https://example.com';

log("url.startsWith('https://')", url.startsWith('https://')); // true
log("url.startsWith('http://')", url.startsWith('http://')); // false

/** 2) Case-sensitive */
section('Case-sensitive');

const s = 'Hello';
log("s.startsWith('He')", s.startsWith('He')); // true
log("s.startsWith('he')", s.startsWith('he')); // false

/** 3) position parameter */
section('position parameter');

const t = 'abcabc';
log("t.startsWith('abc')", t.startsWith('abc')); // true
log("t.startsWith('abc', 3)", t.startsWith('abc', 3)); // true (treat index 3 as start)
log("t.startsWith('ab', 1)", t.startsWith('ab', 1)); // false

/** 4) Common pattern: ignore leading whitespace (use trimStart) */
section('Common pattern: ignore leading whitespace');

const line = '   # comment';
const isComment = line.trimStart().startsWith('#');
log('line', line);
log('isComment', isComment);

/** 5) Trigger vs indexOf */
section('Trigger');

log('trigger', 'startsWith(prefix) is clearer than indexOf(prefix) === 0');

section('Done');
