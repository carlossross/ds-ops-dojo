/**
 * toLowerCase.ts (String.prototype.toLowerCase)
 *
 * Mental model:
 * - Returns a NEW string in lower case
 * - Strings are immutable
 *
 * Signature:
 *   str.toLowerCase() => string
 *
 * Use when:
 * - case-insensitive comparisons and searches
 * - normalizing user input
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic');

const s = 'Hello WORLD';
log('original', s);
log('toLowerCase()', s.toLowerCase());

section('Case-insensitive comparison pattern');

const input = '  YeS  ';
const normalized = input.trim().toLowerCase();

log('input', JSON.stringify(input));
log('normalized', normalized);
log('isYes?', normalized === 'yes');

section('Case-insensitive includes pattern');

const text = 'JavaScript is Great';
const query = 'script';

const has = text.toLowerCase().includes(query.toLowerCase());
log('text', text);
log('query', query);
log('has?', has);

section('Done');
