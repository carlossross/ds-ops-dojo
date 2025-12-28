/**
 * slice.ts (String.prototype.slice)
 *
 * Mental model:
 * - Extract a substring WITHOUT mutating the original string
 * - start is inclusive, end is exclusive
 * - Supports negative indexes (count from end)
 *
 * Signature:
 *   str.slice(start?, end?) => string
 *
 * Use when:
 * - you need flexible slicing, especially from the end (negative)
 * - you want consistency with Array.slice
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

const s = 'hello world';

section('Basic slicing');

log('s', s);
log('slice(0, 5)', s.slice(0, 5)); // "hello"
log('slice(6)', s.slice(6)); // "world"
log('slice(3, 8)', s.slice(3, 8)); // "lo wo"

section('End is exclusive');

log('slice(0, s.length)', s.slice(0, s.length)); // full copy

section('Negative indexes');

log('slice(-5)', s.slice(-5)); // "world"
log('slice(-5, -1)', s.slice(-5, -1)); // "worl"
log('slice(0, -6)', s.slice(0, -6)); // "hello"

section('Out of bounds behavior');

log('slice(999)', s.slice(999)); // ""
log('slice(-999, 2)', s.slice(-999, 2)); // "he" (start clamped)

section('Common pattern: file extension (with lastIndexOf)');

const filename = 'report.final.v2.pdf';
const dot = filename.lastIndexOf('.');
const ext = dot === -1 ? '' : filename.slice(dot + 1);
const base = dot === -1 ? filename : filename.slice(0, dot);

log('filename', filename);
log('base', base);
log('ext', ext);

section('Trigger');

log(
  'trigger',
  'Need negative indexes? use slice (substring does not support negatives well)',
);

section('Done');
