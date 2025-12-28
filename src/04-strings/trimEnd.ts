/**
 * trimEnd.ts (String.prototype.trimEnd)
 *
 * Mental model:
 * - Remove whitespace from the END (right) only
 * - Returns a NEW string
 *
 * Signature:
 *   str.trimEnd() => string
 *
 * Use when:
 * - you want to keep leading spaces (indentation) but ignore trailing whitespace
 * - safe suffix checks (endsWith) when input may have extra spaces/newlines
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic trimEnd');

const s = '   hello world   ';
log('original', JSON.stringify(s));
log('trimEnd()', JSON.stringify(s.trimEnd()));

section('Keep leading spaces (intentional)');

const t = '   keep-start   ';
log('trimEnd()', JSON.stringify(t.trimEnd())); // start still has spaces

section('Common pattern: safe endsWith checks');

const filename = 'report.pdf   \n';
log('raw filename', JSON.stringify(filename));

log("endsWith('.pdf') raw", filename.endsWith('.pdf')); // false
log("endsWith('.pdf') trimmed", filename.trimEnd().endsWith('.pdf')); // true

section('Done');
