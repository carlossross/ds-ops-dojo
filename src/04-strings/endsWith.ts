/**
 * endsWith.ts (String.prototype.endsWith)
 *
 * Mental model:
 * - Returns true if string ends with the given substring (suffix check)
 * - Case-sensitive
 *
 * Signature:
 *   str.endsWith(searchString, length?) => boolean
 *
 * Notes:
 * - length = treat the string as if it were only length characters long
 *   (useful to ignore trailing parts without slicing)
 *
 * Use when:
 * - file extensions, suffix tokens, trailing markers
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic suffix check */
section('Basic suffix check');

const file = 'report.pdf';

log("file.endsWith('.pdf')", file.endsWith('.pdf')); // true
log("file.endsWith('.PDF')", file.endsWith('.PDF')); // false (case-sensitive)

/** 2) Common pattern: case-insensitive suffix */
section('Case-insensitive suffix');

const ext = '.PDF';
const hasPdf = file.toLowerCase().endsWith(ext.toLowerCase());
log('hasPdf', hasPdf);

/** 3) length parameter */
section('length parameter');

const s = 'hello world';

// Treat as "hello" (length 5), does it end with "lo"?
log("s.endsWith('lo', 5)", s.endsWith('lo', 5)); // true

// Treat as "hello wor" (length 9), endsWith "wor"?
log("s.endsWith('wor', 9)", s.endsWith('wor', 9)); // true

/** 4) Pattern: remove trailing whitespace before suffix check */
section('Ignore trailing whitespace');

const line = 'done   ';
log("line.endsWith('done')", line.endsWith('done')); // false
log("line.trimEnd().endsWith('done')", line.trimEnd().endsWith('done')); // true

/** 5) Trigger */
section('Trigger');

log('trigger', 'endsWith(suffix) is clearer than lastIndexOf/substring hacks');

section('Done');
