/**
 * lastIndexOf.ts (String.prototype.lastIndexOf)
 *
 * Mental model:
 * - Returns the index of the LAST occurrence of a substring
 * - If not found => -1
 * - Case-sensitive
 *
 * Signature:
 *   str.lastIndexOf(searchValue, fromIndex?) => number
 *
 * Notes:
 * - fromIndex is the index to start searching BACKWARDS from
 *
 * Use when:
 * - you need the last occurrence (file extension, last separator, etc.)
 *
 * Avoid when:
 * - you only need boolean (use includes)
 * - you need first occurrence (use indexOf)
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

log("s.lastIndexOf('o')", s.lastIndexOf('o')); // 7
log("s.lastIndexOf('world')", s.lastIndexOf('world')); // 6
log("s.lastIndexOf('WORLD')", s.lastIndexOf('WORLD')); // -1

/** 2) fromIndex parameter (search backwards from index) */
section('fromIndex parameter');

log("s.lastIndexOf('o', 7)", s.lastIndexOf('o', 7)); // 7
log("s.lastIndexOf('o', 6)", s.lastIndexOf('o', 6)); // 4
log("s.lastIndexOf('o', 3)", s.lastIndexOf('o', 3)); // -1

/** 3) Common pattern: file extension */
section('Pattern: file extension');

const filename = 'report.final.v2.pdf';
const dot = filename.lastIndexOf('.');

const ext = dot === -1 ? '' : filename.slice(dot + 1);
const base = dot === -1 ? filename : filename.slice(0, dot);

log('filename', filename);
log('dot idx', dot);
log('base', base);
log('ext', ext);

/** 4) Common pattern: last path segment */
section('Pattern: last path segment');

const path = '/users/carlos/documents/notes.txt';
const slash = path.lastIndexOf('/');

const lastSegment = slash === -1 ? path : path.slice(slash + 1);

log('path', path);
log('lastSegment', lastSegment);

/** 5) Trigger: lastIndexOf vs indexOf */
section('Trigger');

log('trigger', 'indexOf -> first occurrence');
log('trigger', 'lastIndexOf -> last occurrence');

section('Done');
